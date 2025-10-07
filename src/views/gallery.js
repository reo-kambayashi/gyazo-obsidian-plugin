const { ItemView, Menu, Notice, MarkdownView } = require("obsidian");
const { getTranslation } = require("../i18n");
const {
  buildMarkdown,
  resolveCopyLabel,
  resolveErrorMessage
} = require("../utils");
const { VIEW_TYPE_GALLERY } = require("../constants");

class GyazoGalleryView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.images = [];
    this.loading = false;
    this.statusEl = null;
    this.gridEl = null;
    this.dropHintEl = null;
    this.toolbarRefreshButton = null;
    this.selectedImageId = null;
  }

  getViewType() {
    return VIEW_TYPE_GALLERY;
  }

  getDisplayText() {
    return getTranslation(this.plugin.settings).galleryTitle;
  }

  getIcon() {
    return "image";
  }

  async onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("gyazo-view-container");
    this.renderLayout();
    this.registerDropEvents();
    await this.loadImages();
  }

  async onClose() {
    this.images = [];
  }

  renderLayout() {
    const t = getTranslation(this.plugin.settings);
    const header = this.contentEl.createDiv({ cls: "gyazo-header" });
    this.toolbarRefreshButton = header.createEl("button", {
      cls: "gyazo-refresh-button",
      text: t.refreshButton
    });
    this.toolbarRefreshButton.addEventListener("click", () => {
      this.loadImages(true);
    });

    this.dropHintEl = this.contentEl.createDiv({
      cls: "gyazo-upload-hint",
      text: t.dropHint
    });

    this.statusEl = this.contentEl.createDiv({ cls: "gyazo-status" });
    this.gridEl = this.contentEl.createDiv({ cls: "gyazo-grid" });
  }

  registerDropEvents() {
    this.registerDomEvent(this.contentEl, "dragover", (event) => {
      event.preventDefault();
      this.contentEl.addClass("gyazo-drop-target");
    });
    this.registerDomEvent(this.contentEl, "dragleave", (event) => {
      if (event.target === this.contentEl) {
        this.contentEl.removeClass("gyazo-drop-target");
      }
    });
    this.registerDomEvent(this.contentEl, "drop", async (event) => {
      event.preventDefault();
      this.contentEl.removeClass("gyazo-drop-target");
      const files = Array.from(event.dataTransfer?.files || []).filter((file) =>
        file.type.startsWith("image/")
      );
      if (!files.length) {
        return;
      }
      await this.handleUpload(files);
    });
  }

  async handleUpload(files) {
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
        files.map((file) => this.plugin.api.uploadImage(file))
      );
      const succeeded = [];
      const failed = [];
      results.forEach((outcome, index) => {
        if (outcome.status === "fulfilled") {
          succeeded.push(outcome.value);
          return;
        }
        console.error("Gyazo upload failed", outcome.reason);
        failed.push({ file: files[index], error: outcome.reason });
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

  async loadImages(force = false) {
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
      this.images = await this.plugin.api.fetchImages();
      if (!Array.isArray(this.images) || !this.images.length) {
        this.renderGrid([]);
        this.setStatus(t.noImages);
      } else {
        this.renderGrid(this.images);
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

  renderGrid(images) {
    if (!this.gridEl) {
      return;
    }
    this.gridEl.empty();
    const t = getTranslation(this.plugin.settings);
    images.forEach((image) => {
      const card = this.gridEl.createDiv({
        cls: "gyazo-card",
        attr: { "data-image-id": image.image_id || "" }
      });

      card.addEventListener("click", async () => {
        await this.selectImage(image);
      });
      card.addEventListener("contextmenu", (event) => {
        this.showContextMenu(image, event);
      });

      const thumb = card.createDiv({
        cls: "gyazo-thumbnail"
      });
      thumb.style.backgroundImage = `url(${image.thumb_url})`;
      thumb.setAttribute("draggable", "true");
      thumb.addEventListener("dragstart", (event) => {
        if (!event.dataTransfer) {
          return;
        }
        const markdown = buildMarkdown(image, this.plugin.settings);
        event.dataTransfer.setData("text/plain", markdown);
      });

      const type = String(image.type || "").toLowerCase();
      if (type && type !== "png") {
        thumb.createDiv({
          cls: "gyazo-type-badge",
          text: type.toUpperCase()
        });
      }

      const overlay = card.createDiv({ cls: "gyazo-hover-overlay" });
      const copyButton = overlay.createDiv({ cls: "gyazo-copy-button" });
      copyButton.setText("⧉");
      copyButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.copyMarkdown(image);
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

  async selectImage(image) {
    this.selectedImageId = image.image_id;
    this.highlightSelection();
    await this.plugin.ensureDetailView();
    this.plugin.notifyImageSelected(image);
  }

  highlightSelection() {
    const cards = this.gridEl?.querySelectorAll(".gyazo-card");
    if (!cards) {
      return;
    }
    cards.forEach((element) => {
      const card = element;
      if (card.getAttribute("data-image-id") === this.selectedImageId) {
        card.addClass("clicked");
      } else {
        card.removeClass("clicked");
      }
    });
  }

  async copyMarkdown(image) {
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

  showContextMenu(image, event) {
    event.preventDefault();
    const t = getTranslation(this.plugin.settings);
    const menu = new Menu(this.app);
    const markdown = buildMarkdown(image, this.plugin.settings);
    const copyLabel = resolveCopyLabel(image.type, t);

    menu.addItem((item) => {
      item.setTitle(copyLabel)
        .setIcon("clipboard-copy")
        .onClick(async () => {
          await this.copyMarkdown(image);
        });
    });

    menu.addItem((item) => {
      item.setTitle(t.imageCopiedToEditor)
        .setIcon("pencil")
        .onClick(() => {
          const markdownView = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
          if (!markdownView) {
            new Notice(markdown);
            return;
          }
          const editor = markdownView.editor;
          editor.replaceSelection(markdown);
          new Notice(t.imageCopiedToEditor);
        });
    });

    menu.addItem((item) => {
      item.setTitle(t.openInBrowser)
        .setIcon("link")
        .onClick(() => {
          window.open(image.permalink_url || image.url, "_blank");
          new Notice(t.imageOpenedInBrowser);
        });
    });

    menu.showAtMouseEvent(event);
  }

  setStatus(text) {
    if (!this.statusEl) {
      return;
    }
    this.statusEl.empty();
    if (text) {
      this.statusEl.setText(text);
    }
  }

  refreshStrings() {
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

module.exports = {
  GyazoGalleryView
};
