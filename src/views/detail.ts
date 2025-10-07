import { ItemView, type WorkspaceLeaf } from "obsidian";
import type GyazoPlugin from "../main";
import { getTranslation } from "../i18n";
import { formatDate } from "../utils";
import { VIEW_TYPE_DETAIL } from "../constants";
import type { GyazoImage } from "../types";

export class GyazoDetailView extends ItemView {
  private image: GyazoImage | null = null;
  private unregister?: () => void;

  constructor(leaf: WorkspaceLeaf, private readonly plugin: GyazoPlugin) {
    super(leaf);
  }

  override getViewType(): string {
    return VIEW_TYPE_DETAIL;
  }

  override getDisplayText(): string {
    return getTranslation(this.plugin.settings).detailViewTitle;
  }

  override getIcon(): string {
    return "file-image";
  }

  override async onOpen(): Promise<void> {
    this.contentEl.empty();
    this.contentEl.addClass("gyazo-detail-view-container");
    this.renderContent();
    this.unregister = this.plugin.registerImageListener((image) => {
      this.image = image;
      this.renderContent();
    });
  }

  override async onClose(): Promise<void> {
    this.image = null;
    if (this.unregister) {
      this.unregister();
      this.unregister = undefined;
    }
  }

  private renderContent(): void {
    const t = getTranslation(this.plugin.settings);
    this.contentEl.empty();
    this.contentEl.addClass("gyazo-detail-view-container");
    if (!this.image) {
      this.contentEl.createDiv({
        cls: "gyazo-detail-empty",
        text: t.selectImageToView
      });
      return;
    }

    const container = this.contentEl.createDiv({ cls: "gyazo-detail-view" });
    const header = container.createDiv({ cls: "gyazo-detail-header" });
    header.createEl("h2", {
      cls: "gyazo-detail-title",
      text: t.detailViewTitle
    });

    const imageWrapper = container.createDiv({ cls: "gyazo-detail-image-container" });
    imageWrapper.createEl("img", {
      cls: "gyazo-detail-image",
      attr: { src: this.image.url, alt: this.image.alt_text || "" }
    });

    if (this.image.desc || this.image.title) {
      const titleDesc = container.createDiv({ cls: "gyazo-title-desc-container" });
      if (this.image.title) {
        titleDesc.createEl("h3", {
          cls: "gyazo-image-title",
          text: this.image.title
        });
      }
      if (this.image.desc) {
        titleDesc.createDiv({
          cls: "gyazo-image-desc",
          text: this.image.desc
        });
      }
    }

    const metadata = container.createDiv({ cls: "gyazo-metadata" });
    const addMeta = (label: string, rawValue: string | undefined | null) => {
      const value = rawValue && rawValue.trim() ? rawValue : "-";
      const item = metadata.createDiv({ cls: "gyazo-metadata-item" });
      item.createDiv({ cls: "gyazo-metadata-label", text: label });
      item.createDiv({ cls: "gyazo-metadata-value", text: value });
    };

    addMeta(t.uploadDate, formatDate(this.image.created_at, this.plugin.settings.language));
    addMeta(t.description, this.image.desc);
    addMeta(t.title, this.image.title);
    addMeta(t.source, this.image.referer_url);
    addMeta(t.app, this.image.application);
    addMeta(t.ocr, this.image.ocr);

    container.createDiv({ cls: "gyazo-detail-actions" });
  }

  refreshStrings(): void {
    this.renderContent();
  }
}
