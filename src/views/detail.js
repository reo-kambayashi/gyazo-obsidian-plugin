const { ItemView } = require("obsidian");
const { getTranslation } = require("../i18n");
const { formatDate } = require("../utils");
const { VIEW_TYPE_DETAIL } = require("../constants");

class GyazoDetailView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.image = null;
    this.unregister = null;
  }

  getViewType() {
    return VIEW_TYPE_DETAIL;
  }

  getDisplayText() {
    return getTranslation(this.plugin.settings).detailViewTitle;
  }

  getIcon() {
    return "file-image";
  }

  async onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("gyazo-detail-view-container");
    this.renderContent();
    this.unregister = this.plugin.registerImageListener((image) => {
      this.image = image;
      this.renderContent();
    });
  }

  async onClose() {
    this.image = null;
    if (this.unregister) {
      this.unregister();
      this.unregister = null;
    }
  }

  renderContent() {
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

    const addMeta = (label, value) => {
      if (!value) {
        return;
      }
      const item = metadata.createDiv({ cls: "gyazo-metadata-item" });
      item.createDiv({ cls: "gyazo-metadata-label", text: label });
      item.createDiv({ cls: "gyazo-metadata-value", text: value });
    };

    addMeta(t.uploadDate, formatDate(this.image.created_at, this.plugin.settings.language));
    addMeta(t.description, this.image.desc || "-");
    addMeta(t.title, this.image.title || "-");
    addMeta(t.source, this.image.referer_url || "-");
    addMeta(t.app, this.image.application || "-");
    addMeta(t.ocr, this.image.ocr || "-");

    container.createDiv({ cls: "gyazo-detail-actions" });
  }

  refreshStrings() {
    this.renderContent();
  }
}

module.exports = {
  GyazoDetailView
};
