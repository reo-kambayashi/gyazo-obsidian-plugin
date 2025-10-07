"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => GyazoPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian5 = require("obsidian");

// src/api.ts
var import_obsidian = require("obsidian");

// src/constants.ts
var GYAZO_API_BASE = "https://api.gyazo.com";
var GYAZO_UPLOAD_ENDPOINT = "https://upload.gyazo.com/api/upload";
var VIEW_TYPE_GALLERY = "gyazo-view";
var VIEW_TYPE_DETAIL = "gyazo-detail-view";
var GYAZO_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M87.5 42.8921H64.3236C56.629 42.8921 50.3838 36.8068 50.3838 29.3333V12.5H26.5391C18.7861 12.5 12.5 18.7671 12.5 26.4967V73.5033C12.5 81.2329 18.7861 87.5 26.5391 87.5H73.4609C81.2139 87.5 87.5 81.2329 87.5 73.5033V42.8921ZM71.8796 32.264C67.5296 27.98 61.4009 25.1247 54.5837 25.1247H33.8877L50.2805 8.81996V8.79675H54.4601C68.6288 8.79675 80.0903 20.132 80.0903 33.9697V41.7175H71.8796V32.264Z" fill="currentColor" />
  <path d="M51.7423 60.4235L43.9357 52.7285L48.0317 48.6809L51.7423 52.3614L59.4994 44.7207L63.5954 48.7683L51.7423 60.4235Z" fill="currentColor" />
</svg>`;
var DEFAULT_SETTINGS = {
  accessToken: "",
  language: "en",
  includePermalinkLinks: true,
  enableImageWidth: false,
  imageWidth: 250
};
var translations = {
  en: {
    ribbonTooltip: "Gyazo viewer",
    galleryTitle: "Gyazo Viewer",
    detailViewTitle: "Image details",
    selectImageToView: "Select an image to view details",
    loadingImages: "Loading captures...",
    noImages: "No captures found",
    errorLoadingImages: "Error loading captures",
    refreshButton: "Refresh",
    dropHint: "Drag & drop images here to upload to Gyazo",
    uploading: "Uploading images to Gyazo...",
    uploaded: "Upload completed",
    uploadFailed: "Upload failed",
    noAccessToken: "Please log in or sign up to start using Gyazo",
    accessTokenLabel: "Access token",
    accessTokenDesc: "Enter your Gyazo API access token",
    showAccessToken: "Show access token",
    hideAccessToken: "Hide access token",
    openApiDashboard: "Open API dashboard",
    openApiDashboardDesc: "Open Gyazo API dashboard to create a new application",
    languageLabel: "Language",
    languageDesc: "Select your preferred language",
    includePermalinkLinksLabel: "Image with link",
    includePermalinkLinksDesc: "Add links to Gyazo pages when embedding images",
    imageWidthLabel: "Image width",
    imageWidthDesc: "Set default width for embedded images",
    save: "Save",
    copyMarkdown: "Copy markdown",
    copyMarkdownGif: "Copy GIF markdown",
    copyMarkdownMp4: "Copy MP4 markdown",
    imageCopiedToClipboard: "Image copied to clipboard",
    imageCopiedToEditor: "Image inserted into editor",
    imageOpenedInBrowser: "Image opened in browser",
    openInBrowser: "Open in browser",
    copyUrl: "Copy URL",
    uploadDate: "Uploaded at",
    description: "Description",
    title: "Title",
    source: "Source",
    app: "App",
    ocr: "OCR"
  },
  ja: {
    ribbonTooltip: "Gyazo\u30D3\u30E5\u30FC\u30A2",
    galleryTitle: "Gyazo\u30D3\u30E5\u30FC\u30A2",
    detailViewTitle: "\u753B\u50CF\u306E\u8A73\u7D30",
    selectImageToView: "\u8A73\u7D30\u3092\u8868\u793A\u3059\u308B\u753B\u50CF\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044",
    loadingImages: "\u30AD\u30E3\u30D7\u30C1\u30E3\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D...",
    noImages: "\u30AD\u30E3\u30D7\u30C1\u30E3\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093",
    errorLoadingImages: "\u30AD\u30E3\u30D7\u30C1\u30E3\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    refreshButton: "\u518D\u8AAD\u307F\u8FBC\u307F",
    dropHint: "Gyazo\u3078\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3059\u308B\u306B\u306F\u3053\u3053\u306B\u753B\u50CF\u3092\u30C9\u30E9\u30C3\u30B0\uFF06\u30C9\u30ED\u30C3\u30D7",
    uploading: "Gyazo\u3078\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...",
    uploaded: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F",
    uploadFailed: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    noAccessToken: "Gyazo\u3092\u5229\u7528\u3059\u308B\u306B\u306F\u30ED\u30B0\u30A4\u30F3\u307E\u305F\u306F\u65B0\u898F\u767B\u9332\u304C\u5FC5\u8981\u3067\u3059",
    accessTokenLabel: "\u30A2\u30AF\u30BB\u30B9 \u30C8\u30FC\u30AF\u30F3",
    accessTokenDesc: "Gyazo API\u306E\u30A2\u30AF\u30BB\u30B9 \u30C8\u30FC\u30AF\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    showAccessToken: "\u30A2\u30AF\u30BB\u30B9\u30C8\u30FC\u30AF\u30F3\u3092\u8868\u793A",
    hideAccessToken: "\u30A2\u30AF\u30BB\u30B9\u30C8\u30FC\u30AF\u30F3\u3092\u96A0\u3059",
    openApiDashboard: "API\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9\u3092\u958B\u304F",
    openApiDashboardDesc: "Gyazo API\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9\u3092\u958B\u3044\u3066\u65B0\u3057\u3044\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u3092\u4F5C\u6210",
    languageLabel: "\u8A00\u8A9E",
    languageDesc: "\u8868\u793A\u8A00\u8A9E\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044",
    includePermalinkLinksLabel: "\u30EA\u30F3\u30AF\u4ED8\u304D\u753B\u50CF",
    includePermalinkLinksDesc: "\u753B\u50CF\u57CB\u3081\u8FBC\u307F\u6642\u306BGyazo\u30DA\u30FC\u30B8\u3078\u306E\u30EA\u30F3\u30AF\u3092\u8FFD\u52A0\u3057\u307E\u3059",
    imageWidthLabel: "\u753B\u50CF\u306E\u5E45",
    imageWidthDesc: "\u57CB\u3081\u8FBC\u307F\u753B\u50CF\u306E\u30C7\u30D5\u30A9\u30EB\u30C8\u5E45\u3092\u8A2D\u5B9A\u3057\u307E\u3059",
    save: "\u4FDD\u5B58",
    copyMarkdown: "\u30DE\u30FC\u30AF\u30C0\u30A6\u30F3\u3092\u30B3\u30D4\u30FC",
    copyMarkdownGif: "GIF\u5F62\u5F0F\u3067\u30B3\u30D4\u30FC",
    copyMarkdownMp4: "MP4\u5F62\u5F0F\u3067\u30B3\u30D4\u30FC",
    imageCopiedToClipboard: "\u753B\u50CF\u3092\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u3078\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F",
    imageCopiedToEditor: "\u753B\u50CF\u3092\u30A8\u30C7\u30A3\u30BF\u3078\u633F\u5165\u3057\u307E\u3057\u305F",
    imageOpenedInBrowser: "\u30D6\u30E9\u30A6\u30B6\u3067\u753B\u50CF\u3092\u958B\u304D\u307E\u3057\u305F",
    openInBrowser: "\u30D6\u30E9\u30A6\u30B6\u3067\u958B\u304F",
    copyUrl: "URL\u3092\u30B3\u30D4\u30FC",
    uploadDate: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u65E5\u6642",
    description: "\u8AAC\u660E",
    title: "\u30BF\u30A4\u30C8\u30EB",
    source: "\u30AD\u30E3\u30D7\u30C1\u30E3\u5143",
    app: "\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3",
    ocr: "OCR"
  }
};
var TRANSLATIONS = translations;
var MEDIA_SUFFIX_TO_COPY_KEY = {
  gif: "copyMarkdownGif",
  mp4: "copyMarkdownMp4"
};

// src/multipart.ts
var MultipartFormDataBuilder = class {
  constructor(boundaryPrefix = "----GyazoUpload") {
    this.encoder = new TextEncoder();
    this.parts = [];
    this.boundary = `${boundaryPrefix}${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
  }
  appendField(name, value) {
    if (value === void 0 || value === null || value === "") {
      return;
    }
    const chunk = this.encoder.encode(
      `--${this.boundary}\r
Content-Disposition: form-data; name="${name}"\r
\r
${value}\r
`
    );
    this.parts.push(chunk);
  }
  async appendFile(name, file) {
    if (!file) {
      return;
    }
    const originalName = typeof file.name === "string" && file.name.trim() ? file.name : "upload";
    const safeName = originalName.replace(/[\r\n"]/g, "");
    const contentType = file.type || "application/octet-stream";
    const header = this.encoder.encode(
      `--${this.boundary}\r
Content-Disposition: form-data; name="${name}"; filename="${safeName}"\r
Content-Type: ${contentType}\r
\r
`
    );
    const buffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(buffer);
    const footer = this.encoder.encode(`\r
`);
    this.parts.push(header, fileBuffer, footer);
  }
  build() {
    const closing = this.encoder.encode(`--${this.boundary}--\r
`);
    const chunks = [...this.parts, closing];
    const payload = new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0));
    let offset = 0;
    for (const chunk of chunks) {
      payload.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return payload;
  }
  getContentType() {
    return `multipart/form-data; boundary=${this.boundary}`;
  }
};

// src/api.ts
var GyazoApiClient = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.accessToken = plugin.settings.accessToken;
  }
  setAccessToken(token) {
    this.accessToken = token;
  }
  ensureToken() {
    if (!this.accessToken) {
      throw new Error("missing-token");
    }
  }
  async fetchImages(limit = 100) {
    this.ensureToken();
    const url = new URL("/api/images", GYAZO_API_BASE);
    url.searchParams.append("access_token", this.accessToken);
    url.searchParams.append("per_page", String(limit));
    const response = await (0, import_obsidian.requestUrl)({ url: url.toString(), method: "GET" });
    const images = response.json;
    if (!Array.isArray(images)) {
      return [];
    }
    return images;
  }
  async uploadImage(file, options = {}) {
    this.ensureToken();
    const builder = new MultipartFormDataBuilder();
    builder.appendField("access_token", this.accessToken);
    builder.appendField("title", options.title);
    builder.appendField("desc", options.description);
    builder.appendField("access_policy", options.accessPolicy);
    builder.appendField("referer_url", options.refererUrl);
    await builder.appendFile("imagedata", file);
    const payload = builder.build();
    const body = payload.slice().buffer;
    const request = {
      url: GYAZO_UPLOAD_ENDPOINT,
      method: "POST",
      headers: {
        "Content-Type": builder.getContentType(),
        Accept: "application/json"
      },
      body,
      throw: false
    };
    const response = await (0, import_obsidian.requestUrl)(request);
    if (response.status < 200 || response.status >= 300) {
      const responseBody = response.text || (response.json ? JSON.stringify(response.json) : "");
      throw new Error(`Gyazo upload failed (${response.status}): ${responseBody}`);
    }
    return response.json;
  }
};

// src/i18n.ts
function getTranslation(settings) {
  const lang = settings.language && settings.language in TRANSLATIONS ? settings.language : "en";
  return TRANSLATIONS[lang];
}

// src/settings.ts
var import_obsidian2 = require("obsidian");
var GyazoSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    const settings = this.plugin.settings;
    const t = getTranslation(settings);
    containerEl.empty();
    new import_obsidian2.Setting(containerEl).setHeading().setName("Gyazo");
    let tokenInput = null;
    const tokenSetting = new import_obsidian2.Setting(containerEl).setName(t.accessTokenLabel).setDesc(t.accessTokenDesc);
    tokenSetting.addText((text) => {
      tokenInput = text;
      text.setPlaceholder("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      text.setValue(settings.accessToken);
      text.inputEl.type = "password";
      text.inputEl.autocomplete = "off";
      text.inputEl.setAttribute("autocorrect", "off");
      text.inputEl.setAttribute("autocapitalize", "none");
      text.inputEl.spellcheck = false;
      text.onChange(async (value) => {
        const trimmed = value.trim();
        await this.updateSettings((draft) => {
          draft.accessToken = trimmed;
        });
        this.plugin.api?.setAccessToken(trimmed);
      });
    });
    let tokenVisible = false;
    tokenSetting.addExtraButton((button) => {
      button.setIcon("eye").setTooltip(t.showAccessToken).onClick(() => {
        tokenVisible = !tokenVisible;
        if (!tokenInput) {
          return;
        }
        tokenInput.inputEl.type = tokenVisible ? "text" : "password";
        button.setIcon(tokenVisible ? "eye-off" : "eye");
        button.setTooltip(tokenVisible ? t.hideAccessToken : t.showAccessToken);
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t.openApiDashboard).setDesc(t.openApiDashboardDesc).addButton(
      (button) => button.setButtonText(t.openApiDashboard).onClick(
        () => window.open("https://gyazo.com/oauth/applications", "_blank", "noopener noreferrer")
      )
    );
    new import_obsidian2.Setting(containerEl).setName(t.languageLabel).setDesc(t.languageDesc).addDropdown((dropdown) => {
      dropdown.addOption("en", "English");
      dropdown.addOption("ja", "\u65E5\u672C\u8A9E");
      dropdown.setValue(settings.language || "en");
      dropdown.onChange(async (value) => {
        await this.updateSettings((draft) => {
          draft.language = value;
        });
        this.plugin.refreshViews();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t.includePermalinkLinksLabel).setDesc(t.includePermalinkLinksDesc).addToggle((toggle) => {
      toggle.setValue(settings.includePermalinkLinks);
      toggle.onChange(async (value) => {
        await this.updateSettings((draft) => {
          draft.includePermalinkLinks = value;
        });
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t.imageWidthLabel).setDesc(t.imageWidthDesc).addToggle((toggle) => {
      toggle.setValue(settings.enableImageWidth);
      toggle.onChange(async (value) => {
        await this.updateSettings((draft) => {
          draft.enableImageWidth = value;
        });
      });
    });
    new import_obsidian2.Setting(containerEl).setName(`${t.imageWidthLabel} (px)`).addSlider((slider) => {
      slider.setLimits(100, 800, 10);
      slider.setValue(settings.imageWidth);
      slider.setDynamicTooltip();
      slider.onChange(async (value) => {
        await this.updateSettings((draft) => {
          draft.imageWidth = value;
        });
      });
    });
  }
  async updateSettings(mutator) {
    const nextSettings = { ...this.plugin.settings };
    mutator(nextSettings);
    this.plugin.settings = nextSettings;
    await this.plugin.saveSettings();
  }
};

// src/views/gallery.ts
var import_obsidian3 = require("obsidian");

// src/utils.ts
function buildMarkdown(image, settings) {
  const altParts = [];
  if (image.alt_text) {
    altParts.push(image.alt_text);
  }
  if (settings.enableImageWidth && settings.imageWidth > 0) {
    altParts.push(String(settings.imageWidth));
  }
  const alt = altParts.join("|");
  const markdown = `![${alt}](${image.url})`;
  if (!settings.includePermalinkLinks) {
    return markdown;
  }
  return `[${markdown}](${image.permalink_url ?? image.url})`;
}
function formatDate(isoText, locale) {
  if (!isoText) {
    return "-";
  }
  try {
    const date = new Date(isoText);
    if (Number.isNaN(date.getTime())) {
      return isoText;
    }
    return date.toLocaleString(locale || "en-US");
  } catch (error) {
    console.error("failed to format date", error);
    return isoText;
  }
}
function resolveErrorMessage(error) {
  if (!error) {
    return "";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }
  return "";
}
function resolveCopyLabel(imageType, translation) {
  const suffix = (imageType ?? "").toLowerCase();
  const copyKey = MEDIA_SUFFIX_TO_COPY_KEY[suffix];
  if (copyKey && copyKey in translation) {
    return translation[copyKey];
  }
  return translation.copyMarkdown;
}

// src/views/gallery.ts
var GyazoGalleryView = class extends import_obsidian3.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.images = [];
    this.loading = false;
    this.statusEl = null;
    this.gridEl = null;
    this.dropOverlayEl = null;
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
  registerDropEvents() {
    const showOverlay = () => {
      if (this.dropOverlayEl) return;
      this.dropOverlayEl = this.contentEl.createDiv();
      this.dropOverlayEl.style.position = "absolute";
      this.dropOverlayEl.style.top = "0";
      this.dropOverlayEl.style.left = "0";
      this.dropOverlayEl.style.width = "100%";
      this.dropOverlayEl.style.height = "100%";
      this.dropOverlayEl.style.border = "2px dashed var(--interactive-accent)";
      this.dropOverlayEl.style.borderRadius = "6px";
      this.dropOverlayEl.style.zIndex = "100";
      this.dropOverlayEl.style.pointerEvents = "none";
    };
    const hideOverlay = () => {
      if (this.dropOverlayEl) {
        this.dropOverlayEl.remove();
        this.dropOverlayEl = null;
      }
    };
    this.registerDomEvent(this.contentEl, "dragover", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showOverlay();
    });
    this.registerDomEvent(this.contentEl, "dragleave", () => {
      hideOverlay();
    });
    this.registerDomEvent(this.contentEl, "drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      hideOverlay();
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
  async handleUpload(files) {
    const t = getTranslation(this.plugin.settings);
    if (!this.plugin.api) {
      return;
    }
    if (!this.plugin.settings.accessToken) {
      new import_obsidian3.Notice(t.noAccessToken);
      return;
    }
    const uploadingNotice = new import_obsidian3.Notice(t.uploading, 0);
    try {
      const results = await Promise.allSettled(
        files.map(async (file) => this.plugin.api.uploadImage(file))
      );
      const succeeded = [];
      const failed = [];
      results.forEach((outcome, index) => {
        if (outcome.status === "fulfilled") {
          succeeded.push(outcome.value);
        } else {
          console.error("Gyazo upload failed", outcome.reason);
          failed.push({ file: files[index], error: outcome.reason });
        }
      });
      if (succeeded.length) {
        new import_obsidian3.Notice(
          files.length > 1 ? `${t.uploaded} (${succeeded.length}/${files.length})` : t.uploaded
        );
        await this.loadImages(true);
      }
      if (failed.length) {
        const message = resolveErrorMessage(failed[0]?.error);
        new import_obsidian3.Notice(message ? `${t.uploadFailed}: ${message}` : t.uploadFailed, 6e3);
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
      const images = await this.plugin.api?.fetchImages() ?? [];
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
  renderGrid(images) {
    if (!this.gridEl) {
      return;
    }
    const t = getTranslation(this.plugin.settings);
    this.gridEl.empty();
    images.forEach((image) => {
      const card = this.gridEl.createDiv({
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
      copyButton.setText("\u29C9");
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
    cards.forEach((card) => {
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
        new import_obsidian3.Notice(t.imageCopiedToClipboard);
      } else {
        throw new Error("clipboard-not-available");
      }
    } catch (error) {
      console.warn("Clipboard API unavailable, falling back to notice", error);
      new import_obsidian3.Notice(markdown, 4e3);
    }
  }
  showContextMenu(image, event) {
    event.preventDefault();
    const t = getTranslation(this.plugin.settings);
    const menu = new import_obsidian3.Menu();
    const markdown = buildMarkdown(image, this.plugin.settings);
    const copyLabel = resolveCopyLabel(image.type, t);
    menu.addItem((item) => {
      item.setTitle(copyLabel).setIcon("clipboard-copy").onClick(() => {
        void this.copyMarkdown(image);
      });
    });
    menu.addItem((item) => {
      item.setTitle(t.imageCopiedToEditor).setIcon("pencil").onClick(() => {
        const markdownView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian3.MarkdownView);
        if (!markdownView) {
          new import_obsidian3.Notice(markdown);
          return;
        }
        markdownView.editor.replaceSelection(markdown);
        new import_obsidian3.Notice(t.imageCopiedToEditor);
      });
    });
    menu.addItem((item) => {
      item.setTitle(t.copyUrl).setIcon("link").onClick(async () => {
        const url = image.permalink_url || image.url;
        try {
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(url);
            new import_obsidian3.Notice(t.imageCopiedToClipboard);
          } else {
            throw new Error("clipboard-not-available");
          }
        } catch (error) {
          console.warn("Clipboard API unavailable, falling back to notice", error);
          new import_obsidian3.Notice(url, 4e3);
        }
      });
    });
    menu.addItem((item) => {
      item.setTitle(t.openInBrowser).setIcon("external-link").onClick(() => {
        window.open(image.permalink_url || image.url, "_blank", "noopener noreferrer");
        new import_obsidian3.Notice(t.imageOpenedInBrowser);
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
};

// src/views/detail.ts
var import_obsidian4 = require("obsidian");
var GyazoDetailView = class extends import_obsidian4.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.image = null;
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
      this.unregister = void 0;
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
    const addMeta = (label, rawValue) => {
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
  refreshStrings() {
    this.renderContent();
  }
};

// src/main.ts
var GyazoPlugin = class extends import_obsidian5.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
    this.api = null;
    this.imageListeners = /* @__PURE__ */ new Set();
  }
  async onload() {
    await this.loadSettings();
    this.api = new GyazoApiClient(this);
    this.api.setAccessToken(this.settings.accessToken);
    (0, import_obsidian5.addIcon)("gyazo", GYAZO_ICON);
    this.registerView(VIEW_TYPE_GALLERY, (leaf) => new GyazoGalleryView(leaf, this));
    this.registerView(VIEW_TYPE_DETAIL, (leaf) => new GyazoDetailView(leaf, this));
    this.addRibbonIcon("gyazo", getTranslation(this.settings).ribbonTooltip, () => {
      void this.activateView();
    });
    this.addCommand({
      id: "open-gyazo-gallery",
      name: "Open Gyazo gallery",
      callback: () => {
        void this.activateView();
      }
    });
    this.addSettingTab(new GyazoSettingTab(this.app, this));
  }
  async onunload() {
    this.imageListeners.clear();
  }
  async ensureLeaf(type, options = {}) {
    const { active = true, reveal = false, reconfigureExisting = false } = options;
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(type)[0];
    if (!leaf) {
      leaf = workspace.getRightLeaf(false) ?? workspace.getLeaf(true);
      await leaf.setViewState({ type, active });
    } else if (reconfigureExisting) {
      await leaf.setViewState({ type, active });
    }
    if (reveal) {
      workspace.revealLeaf(leaf);
    }
    return leaf;
  }
  async activateView() {
    await this.ensureLeaf(VIEW_TYPE_GALLERY, {
      active: true,
      reveal: true,
      reconfigureExisting: true
    });
  }
  async ensureDetailView() {
    return this.ensureLeaf(VIEW_TYPE_DETAIL, { active: false });
  }
  registerImageListener(callback) {
    this.imageListeners.add(callback);
    return () => {
      this.imageListeners.delete(callback);
    };
  }
  notifyImageSelected(image) {
    for (const callback of this.imageListeners) {
      try {
        callback(image);
      } catch (error) {
        console.error("Gyazo detail listener failed", error);
      }
    }
  }
  async loadSettings() {
    const data = await this.loadData();
    this.settings = { ...DEFAULT_SETTINGS, ...data ?? {} };
  }
  async saveSettings() {
    await this.saveData(this.settings);
    this.api?.setAccessToken(this.settings.accessToken);
  }
  refreshViews() {
    const galleryLeaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_GALLERY);
    for (const leaf of galleryLeaves) {
      const view = leaf.view;
      if (view instanceof GyazoGalleryView) {
        view.refreshStrings();
      }
    }
    const detailLeaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_DETAIL);
    for (const leaf of detailLeaves) {
      const view = leaf.view;
      if (view instanceof GyazoDetailView) {
        view.refreshStrings();
      }
    }
  }
};
