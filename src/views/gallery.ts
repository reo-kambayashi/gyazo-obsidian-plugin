import { ItemView, MarkdownView, Menu, Notice, type WorkspaceLeaf } from "obsidian";
import type GyazoPlugin from "../main";
import { getTranslation } from "../i18n";
import { buildMarkdown, resolveCopyLabel, resolveErrorMessage } from "../utils";
import { VIEW_TYPE_GALLERY } from "../constants";
import type { GyazoImage } from "../types";

export class GyazoGalleryView extends ItemView {
  private images: GyazoImage[] = [];
  private loading = false;
  private statusEl: HTMLDivElement | null = null;
  private gridEl: HTMLDivElement | null = null;
  private dropHintEl: HTMLDivElement | null = null;
  private toolbarRefreshButton: HTMLButtonElement | null = null;
  private selectedImageId: string | null = null;

  constructor(leaf: WorkspaceLeaf, private readonly plugin: GyazoPlugin) {
    super(leaf);
  }

  override getViewType(): string {
    return VIEW_TYPE_GALLERY;
  }

  override getDisplayText(): string {
    return getTranslation(this.plugin.settings).galleryTitle;
  }

  override getIcon(): string {
    return "image";
  }

  override async onOpen(): Promise<void> {
    this.contentEl.empty();
    this.contentEl.addClass("gyazo-view-container");
    this.renderLayout();
    this.registerDropEvents();
    await this.loadImages();
  }

  override async onClose(): Promise<void> {
    this.images = [];
  }

  private renderLayout(): void {
    const t = getTranslation(this.plugin.settings);
    const header = this.contentEl.createDiv({ cls: "gyazo-header" });
    const refreshButton = header.createEl("button", {
      cls: "gyazo-refresh-button",
      text: t.refreshButton
    });
    this.toolbarRefreshButton = refreshButton;
    this.registerDomEvent(refreshButton, "click", () => {
      void this.loadImages(true);
    });

    this.dropHintEl = this.contentEl.createDiv({
      cls: "gyazo-upload-hint",
      text: t.dropHint
    });

    this.statusEl = this.contentEl.createDiv({ cls: "gyazo-status" });
    this.gridEl = this.contentEl.createDiv({ cls: "gyazo-grid" });
  }

  private registerDropEvents(): void {
    this.registerDomEvent(this.contentEl, "dragover", (event) => {
      event.preventDefault();
      this.contentEl.addClass("gyazo-drop-target");
    });
    this.registerDomEvent(this.contentEl, "dragleave", (event) => {
      if (event.target === this.contentEl) {
        this.contentEl.removeClass("gyazo-drop-target");
      }
    });
    this.registerDomEvent(this.contentEl, "drop", (event) => {
      event.preventDefault();
      this.contentEl.removeClass("gyazo-drop-target");
      const fileList = event.dataTransfer?.files;
      if (!fileList?.length) {
        return;
      }
      const files = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
      if (!files.length) {
        return;
      }
      void this.handleUpload(files);
    });
  }

  private async handleUpload(files: File[]): Promise<void> {
    const t = getTranslation(this.plugin.settings);
    if (!this.plugin.api) {
      return;
    }
    if (!this.plugin.settings.accessToken) {
      new Notice(t.noAccessToken);
      return;
    }
    const uploadingNotice = new Notice(t.uploading, 0);
    try {
      const results = await Promise.allSettled(
        files.map(async (file) => this.plugin.api!.uploadImage(file))
      );
      const succeeded: GyazoImage[] = [];
      const failed: { file: File; error: unknown }[] = [];
      results.forEach((outcome, index) => {
        if (outcome.status === "fulfilled") {
          succeeded.push(outcome.value);
        } else {
          console.error("Gyazo upload failed", outcome.reason);
          failed.push({ file: files[index], error: outcome.reason });
        }
      });
      if (succeeded.length) {
        new Notice(
          files.length > 1 ? `${t.uploaded} (${succeeded.length}/${files.length})` : t.uploaded
        );
        await this.loadImages(true);
      }
      if (failed.length) {
        const message = resolveErrorMessage(failed[0]?.error);
        new Notice(message ? `${t.uploadFailed}: ${message}` : t.uploadFailed, 6000);
      }
    } finally {
      uploadingNotice.hide();
    }
  }

  async loadImages(force = false): Promise<void> {
    if (this.loading && !force) {
      return;
    }
    const t = getTranslation(this.plugin.settings);
    if (!this.plugin.settings.accessToken) {
      this.setStatus(t.noAccessToken);
      this.renderGrid([]);
      return;
    }
    this.loading = true;
    this.setStatus(t.loadingImages);
    try {
      const images = (await this.plugin.api?.fetchImages()) ?? [];
      this.images = images;
      if (!images.length) {
        this.renderGrid([]);
        this.setStatus(t.noImages);
      } else {
        this.renderGrid(images);
        this.setStatus("");
      }
    } catch (error) {
      console.error("Failed to load Gyazo images", error);
      this.renderGrid([]);
      this.setStatus(t.errorLoadingImages);
    } finally {
      this.loading = false;
    }
  }

  private renderGrid(images: GyazoImage[]): void {
    if (!this.gridEl) {
      return;
    }
    const t = getTranslation(this.plugin.settings);
    this.gridEl.empty();
    images.forEach((image) => {
      const card = this.gridEl!.createDiv({
        cls: "gyazo-card",
        attr: { "data-image-id": image.image_id ?? "" }
      });

      this.registerDomEvent(card, "click", () => {
        void this.selectImage(image);
      });
      this.registerDomEvent(card, "contextmenu", (event) => {
        this.showContextMenu(image, event);
      });

      const thumb = card.createDiv({
        cls: "gyazo-thumbnail"
      });
      thumb.style.backgroundImage = `url(${image.thumb_url})`;
      thumb.setAttribute("draggable", "true");
      this.registerDomEvent(thumb, "dragstart", (event) => {
        if (!event.dataTransfer) {
          return;
        }
        const markdown = buildMarkdown(image, this.plugin.settings);
        event.dataTransfer.setData("text/plain", markdown);
      });

      const type = (image.type || "").toLowerCase();
      if (type && type !== "png") {
        thumb.createDiv({
          cls: "gyazo-type-badge",
          text: type.toUpperCase()
        });
      }

      const overlay = card.createDiv({ cls: "gyazo-hover-overlay" });
      const copyButton = overlay.createDiv({ cls: "gyazo-copy-button" });
      copyButton.setText("⧉");
      this.registerDomEvent(copyButton, "click", (event) => {
        event.stopPropagation();
        void this.copyMarkdown(image);
      });

      if (image.image_id === this.selectedImageId) {
        card.addClass("clicked");
      }
    });

    if (!images.length) {
      this.gridEl.createDiv({
        cls: "gyazo-empty",
        text: t.noImages
      });
    }
  }

  private async selectImage(image: GyazoImage): Promise<void> {
    this.selectedImageId = image.image_id;
    this.highlightSelection();
    await this.plugin.ensureDetailView();
    this.plugin.notifyImageSelected(image);
  }

  private highlightSelection(): void {
    const cards = this.gridEl?.querySelectorAll<HTMLElement>(".gyazo-card");
    if (!cards) {
      return;
    }
    cards.forEach((card) => {
      if (card.getAttribute("data-image-id") === this.selectedImageId) {
        card.addClass("clicked");
      } else {
        card.removeClass("clicked");
      }
    });
  }

  private async copyMarkdown(image: GyazoImage): Promise<void> {
    const t = getTranslation(this.plugin.settings);
    const markdown = buildMarkdown(image, this.plugin.settings);
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(markdown);
        new Notice(t.imageCopiedToClipboard);
      } else {
        throw new Error("clipboard-not-available");
      }
    } catch (error) {
      console.warn("Clipboard API unavailable, falling back to notice", error);
      new Notice(markdown, 4000);
    }
  }

  private showContextMenu(image: GyazoImage, event: MouseEvent): void {
    event.preventDefault();
    const t = getTranslation(this.plugin.settings);
    const menu = new Menu();
    const markdown = buildMarkdown(image, this.plugin.settings);
    const copyLabel = resolveCopyLabel(image.type, t);

    menu.addItem((item) => {
      item
        .setTitle(copyLabel)
        .setIcon("clipboard-copy")
        .onClick(() => {
          void this.copyMarkdown(image);
        });
    });

    menu.addItem((item) => {
      item
        .setTitle(t.imageCopiedToEditor)
        .setIcon("pencil")
        .onClick(() => {
          const markdownView = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
          if (!markdownView) {
            new Notice(markdown);
            return;
          }
          markdownView.editor.replaceSelection(markdown);
          new Notice(t.imageCopiedToEditor);
        });
    });

    menu.addItem((item) => {
      item
        .setTitle(t.copyUrl)
        .setIcon("link")
        .onClick(async () => {
          const url = image.permalink_url || image.url;
          try {
            if (navigator.clipboard) {
              await navigator.clipboard.writeText(url);
              new Notice(t.imageCopiedToClipboard);
            } else {
              throw new Error("clipboard-not-available");
            }
          } catch (error) {
            console.warn("Clipboard API unavailable, falling back to notice", error);
            new Notice(url, 4000);
          }
        });
    });

    menu.addItem((item) => {
      item
        .setTitle(t.openInBrowser)
        .setIcon("external-link")
        .onClick(() => {
          window.open(image.permalink_url || image.url, "_blank", "noopener noreferrer");
          new Notice(t.imageOpenedInBrowser);
        });
    });

    menu.showAtMouseEvent(event);
  }

  private setStatus(text: string): void {
    if (!this.statusEl) {
      return;
    }
    this.statusEl.empty();
    if (text) {
      this.statusEl.setText(text);
    }
  }

  refreshStrings(): void {
    const t = getTranslation(this.plugin.settings);
    if (this.toolbarRefreshButton) {
      this.toolbarRefreshButton.setText(t.refreshButton);
    }
    if (this.dropHintEl) {
      this.dropHintEl.setText(t.dropHint);
    }
    this.setStatus("");
    this.renderGrid(this.images);
  }
}
