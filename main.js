// バンドル済みエントリーポイントを生成します。Obsidian 本番環境では main.js のみを読み込むため、src 配下をひとつにまとめます。
(() => {
  const globalRequire = typeof require === "function" ? require : null;
  const modules = {
    "src/constants.js": (module, exports, require) => {
      const GYAZO_API_BASE = "https://api.gyazo.com";
      const GYAZO_UPLOAD_ENDPOINT = "https://upload.gyazo.com/api/upload";
      const VIEW_TYPE_GALLERY = "gyazo-view";
      const VIEW_TYPE_DETAIL = "gyazo-detail-view";
      const GYAZO_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M87.5 42.8921H64.3236C56.629 42.8921 50.3838 36.8068 50.3838 29.3333V12.5H26.5391C18.7861 12.5 12.5 18.7671 12.5 26.4967V73.5033C12.5 81.2329 18.7861 87.5 26.5391 87.5H73.4609C81.2139 87.5 87.5 81.2329 87.5 73.5033V42.8921ZM71.8796 32.264C67.5296 27.98 61.4009 25.1247 54.5837 25.1247H33.8877L50.2805 8.81996V8.79675H54.4601C68.6288 8.79675 80.0903 20.132 80.0903 33.9697V41.7175H71.8796V32.264Z" fill="currentColor" />
        <path d="M51.7423 60.4235L43.9357 52.7285L48.0317 48.6809L51.7423 52.3614L59.4994 44.7207L63.5954 48.7683L51.7423 60.4235Z" fill="currentColor" />
      </svg>`;
      
      const DEFAULT_SETTINGS = {
        accessToken: "",
        language: "en",
        includePermalinkLinks: true,
        enableImageWidth: false,
        imageWidth: 250
      };
      
      const TRANSLATIONS = {
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
          ribbonTooltip: "Gyazoビューア",
          galleryTitle: "Gyazoビューア",
          detailViewTitle: "画像の詳細",
          selectImageToView: "詳細を表示する画像を選択してください",
          loadingImages: "キャプチャを読み込み中...",
          noImages: "キャプチャが見つかりません",
          errorLoadingImages: "キャプチャの読み込みに失敗しました",
          refreshButton: "再読み込み",
          dropHint: "Gyazoへアップロードするにはここに画像をドラッグ＆ドロップ",
          uploading: "Gyazoへアップロード中...",
          uploaded: "アップロードが完了しました",
          uploadFailed: "アップロードに失敗しました",
          noAccessToken: "Gyazoを利用するにはログインまたは新規登録が必要です",
          accessTokenLabel: "アクセス トークン",
          accessTokenDesc: "Gyazo APIのアクセス トークンを入力してください",
          showAccessToken: "アクセストークンを表示",
          hideAccessToken: "アクセストークンを隠す",
          openApiDashboard: "APIダッシュボードを開く",
          openApiDashboardDesc: "Gyazo APIダッシュボードを開いて新しいアプリケーションを作成",
          languageLabel: "言語",
          languageDesc: "表示言語を選択してください",
          includePermalinkLinksLabel: "リンク付き画像",
          includePermalinkLinksDesc: "画像埋め込み時にGyazoページへのリンクを追加します",
          imageWidthLabel: "画像の幅",
          imageWidthDesc: "埋め込み画像のデフォルト幅を設定します",
          save: "保存",
          copyMarkdown: "マークダウンをコピー",
          copyMarkdownGif: "GIF形式でコピー",
          copyMarkdownMp4: "MP4形式でコピー",
          imageCopiedToClipboard: "画像をクリップボードへコピーしました",
          imageCopiedToEditor: "画像をエディタへ挿入しました",
          imageOpenedInBrowser: "ブラウザで画像を開きました",
          openInBrowser: "ブラウザで開く",
          copyUrl: "URLをコピー",
          uploadDate: "アップロード日時",
          description: "説明",
          title: "タイトル",
          source: "キャプチャ元",
          app: "アプリケーション",
          ocr: "OCR"
        }
      };
      
      const MEDIA_SUFFIX_TO_COPY_KEY = {
        gif: "copyMarkdownGif",
        mp4: "copyMarkdownMp4"
      };
      
      module.exports = {
        DEFAULT_SETTINGS,
        GYAZO_API_BASE,
        GYAZO_ICON,
        GYAZO_UPLOAD_ENDPOINT,
        MEDIA_SUFFIX_TO_COPY_KEY,
        TRANSLATIONS,
        VIEW_TYPE_DETAIL,
        VIEW_TYPE_GALLERY
      };
    },
    "src/utils.js": (module, exports, require) => {
      const { MEDIA_SUFFIX_TO_COPY_KEY } = require("./constants");
      
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
        if (settings.includePermalinkLinks === false) {
          return markdown;
        }
        return `[${markdown}](${image.permalink_url})`;
      }
      
      function formatDate(isoText, locale) {
        if (!isoText) {
          return "-";
        }
        try {
          const date = new Date(isoText);
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
        if (error.message) {
          return error.message;
        }
        return "";
      }
      
      function resolveCopyLabel(imageType, translation) {
        const suffix = String(imageType || "").toLowerCase();
        const copyKey = MEDIA_SUFFIX_TO_COPY_KEY[suffix];
        if (copyKey && translation[copyKey]) {
          return translation[copyKey];
        }
        return translation.copyMarkdown;
      }
      
      module.exports = {
        buildMarkdown,
        formatDate,
        resolveCopyLabel,
        resolveErrorMessage
      };
    },
    "src/multipart.js": (module, exports, require) => {
      const { TextEncoder } = require("util");
      
      // Gyazoアップロード用のマルチパートフォームデータを生成するビルダー
      class MultipartFormDataBuilder {
        constructor(boundaryPrefix = "----GyazoUpload") {
          this.encoder = new TextEncoder();
          this.boundary = `${boundaryPrefix}${Date.now().toString(16)}${Math.random()
            .toString(16)
            .slice(2)}`;
          this.parts = [];
        }
      
        appendField(name, value) {
          if (value === undefined || value === null || value === "") {
            return;
          }
          const chunk = this.encoder.encode(
            `--${this.boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`
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
            `--${this.boundary}\r\nContent-Disposition: form-data; name="${name}"; filename="${safeName}"\r\nContent-Type: ${contentType}\r\n\r\n`
          );
          const fileBuffer = new Uint8Array(await file.arrayBuffer());
          const footer = this.encoder.encode(`\r\n`);
          this.parts.push(header, fileBuffer, footer);
        }
      
        build() {
          const closing = this.encoder.encode(`--${this.boundary}--\r\n`);
          const chunks = [...this.parts, closing];
          let totalLength = 0;
          for (const chunk of chunks) {
            totalLength += chunk.byteLength;
          }
          const payload = new Uint8Array(totalLength);
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
      }
      
      module.exports = {
        MultipartFormDataBuilder
      };
    },
    "src/i18n.js": (module, exports, require) => {
      const { TRANSLATIONS } = require("./constants");
      
      function getTranslation(settings) {
        const lang = settings.language && settings.language in TRANSLATIONS ? settings.language : "en";
        return TRANSLATIONS[lang];
      }
      
      module.exports = {
        getTranslation
      };
    },
    "src/api.js": (module, exports, require) => {
      const { requestUrl } = require("obsidian");
      const {
        GYAZO_API_BASE,
        GYAZO_UPLOAD_ENDPOINT
      } = require("./constants");
      const { MultipartFormDataBuilder } = require("./multipart");
      
      class GyazoApiClient {
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
          const url = new URL(`${GYAZO_API_BASE}/api/images`);
          url.searchParams.append("access_token", this.accessToken);
          url.searchParams.append("per_page", String(limit));
          const response = await requestUrl({
            url: url.toString(),
            method: "GET"
          });
          return response.json;
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
      
          const response = await requestUrl({
            url: GYAZO_UPLOAD_ENDPOINT,
            method: "POST",
            headers: {
              "Content-Type": builder.getContentType(),
              Accept: "application/json"
            },
            body: builder.build().buffer,
            throw: false
          });
      
          if (response.status < 200 || response.status >= 300) {
            const responseBody = response.text || (response.json ? JSON.stringify(response.json) : "");
            throw new Error(`Gyazo upload failed (${response.status}): ${responseBody}`);
          }
      
          return response.json;
        }
      }
      
      module.exports = {
        GyazoApiClient
      };
    },
    "src/settings.js": (module, exports, require) => {
      const { PluginSettingTab, Setting } = require("obsidian");
      const { getTranslation } = require("./i18n");
      
      class GyazoSettingTab extends PluginSettingTab {
        constructor(app, plugin) {
          super(app, plugin);
          this.plugin = plugin;
        }
      
        display() {
          const { containerEl } = this;
          const t = getTranslation(this.plugin.settings);
          containerEl.empty();
          containerEl.createEl("h2", { text: "Gyazo" });
      
          const tokenSetting = new Setting(containerEl)
            .setName(t.accessTokenLabel)
            .setDesc(t.accessTokenDesc);
      
          const tokenInput = tokenSetting.addText((text) => {
            text.setPlaceholder("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            text.setValue(this.plugin.settings.accessToken);
            text.inputEl.type = "password";
            text.inputEl.autocomplete = "off";
            text.inputEl.setAttribute("autocorrect", "off");
            text.inputEl.setAttribute("autocapitalize", "none");
            text.inputEl.spellcheck = false;
            text.onChange(async (value) => {
              const trimmed = value.trim();
              this.plugin.settings.accessToken = trimmed;
              if (this.plugin.api) {
                this.plugin.api.setAccessToken(trimmed);
              }
              await this.plugin.saveSettings();
            });
          });
      
          let tokenVisible = false;
          tokenSetting.addExtraButton((button) => {
            button
              .setIcon("eye")
              .setTooltip(t.showAccessToken)
              .onClick(() => {
                tokenVisible = !tokenVisible;
                tokenInput.inputEl.type = tokenVisible ? "text" : "password";
                button.setIcon(tokenVisible ? "eye-off" : "eye");
                button.setTooltip(tokenVisible ? t.hideAccessToken : t.showAccessToken);
              });
          });
      
          new Setting(containerEl)
            .setName(t.openApiDashboard)
            .setDesc(t.openApiDashboardDesc)
            .addButton((button) =>
              button
                .setButtonText(t.openApiDashboard)
                .onClick(() => window.open("https://gyazo.com/oauth/applications", "_blank"))
            );
      
          new Setting(containerEl)
            .setName(t.languageLabel)
            .setDesc(t.languageDesc)
            .addDropdown((dropdown) => {
              dropdown.addOption("en", "English");
              dropdown.addOption("ja", "日本語");
              dropdown.setValue(this.plugin.settings.language || "en");
              dropdown.onChange(async (value) => {
                this.plugin.settings.language = value;
                await this.plugin.saveSettings();
                this.plugin.refreshViews();
              });
            });
      
          new Setting(containerEl)
            .setName(t.includePermalinkLinksLabel)
            .setDesc(t.includePermalinkLinksDesc)
            .addToggle((toggle) => {
              toggle.setValue(this.plugin.settings.includePermalinkLinks);
              toggle.onChange(async (value) => {
                this.plugin.settings.includePermalinkLinks = value;
                await this.plugin.saveSettings();
              });
            });
      
          new Setting(containerEl)
            .setName(t.imageWidthLabel)
            .setDesc(t.imageWidthDesc)
            .addToggle((toggle) => {
              toggle.setValue(this.plugin.settings.enableImageWidth);
              toggle.onChange(async (value) => {
                this.plugin.settings.enableImageWidth = value;
                await this.plugin.saveSettings();
              });
            });
      
          new Setting(containerEl)
            .setName(`${t.imageWidthLabel} (px)`)
            .addSlider((slider) => {
              slider.setLimits(100, 800, 10);
              slider.setValue(this.plugin.settings.imageWidth);
              slider.setDynamicTooltip();
              slider.onChange(async (value) => {
                this.plugin.settings.imageWidth = value;
                await this.plugin.saveSettings();
              });
            });
        }
      }
      
      module.exports = {
        GyazoSettingTab
      };
    },
    "src/views/gallery.js": (module, exports, require) => {
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
    },
    "src/views/detail.js": (module, exports, require) => {
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
    },
    "src/plugin.js": (module, exports, require) => {
      const { Plugin, addIcon } = require("obsidian");
      const { GyazoApiClient } = require("./api");
      const { GyazoGalleryView } = require("./views/gallery");
      const { GyazoDetailView } = require("./views/detail");
      const { GyazoSettingTab } = require("./settings");
      const {
        DEFAULT_SETTINGS,
        GYAZO_ICON,
        VIEW_TYPE_DETAIL,
        VIEW_TYPE_GALLERY
      } = require("./constants");
      const { getTranslation } = require("./i18n");
      
      class GyazoPlugin extends Plugin {
        constructor(app, manifest) {
          super(app, manifest);
          this.settings = Object.assign({}, DEFAULT_SETTINGS);
          this.api = null;
          this.imageListeners = new Set();
        }
      
        async onload() {
          await this.loadSettings();
          this.api = new GyazoApiClient(this);
          addIcon("gyazo", GYAZO_ICON);
      
          this.registerView(VIEW_TYPE_GALLERY, (leaf) => new GyazoGalleryView(leaf, this));
          this.registerView(VIEW_TYPE_DETAIL, (leaf) => new GyazoDetailView(leaf, this));
      
          this.addRibbonIcon("gyazo", getTranslation(this.settings).ribbonTooltip, async () => {
            await this.activateView();
          });
      
          this.addSettingTab(new GyazoSettingTab(this.app, this));
        }
      
        async onunload() {
          this.imageListeners.clear();
        }
      
        async ensureLeaf(type, options = {}) {
          const {
            active = true,
            reveal = false,
            reconfigureExisting = false
          } = options;
          const { workspace } = this.app;
          let leaf = workspace.getLeavesOfType(type)[0];
          if (!leaf) {
            leaf = workspace.getRightLeaf(false);
            if (!leaf) {
              leaf = workspace.getLeaf(true);
            }
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
          if (!data) {
            this.settings = Object.assign({}, DEFAULT_SETTINGS);
            return;
          }
          this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
        }
      
        async saveSettings() {
          await this.saveData(this.settings);
          if (this.api) {
            this.api.setAccessToken(this.settings.accessToken);
          }
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
      }
      
      module.exports = GyazoPlugin;
    }
  };

  const cache = {};

  const normalizePath = (value) => {
    const segments = [];
    value.replace(/\\/g, "/").split("/").forEach((segment) => {
      if (!segment || segment === ".") {
        return;
      }
      if (segment === "..") {
        segments.pop();
        return;
      }
      segments.push(segment);
    });
    return segments.join("/");
  };

  const resolveFrom = (parentId, request) => {
    const baseDir = parentId.slice(0, parentId.lastIndexOf('/') + 1);
    const targetBase = normalizePath(`${baseDir}${request}`);
    const candidates = [];
    if (modules[targetBase]) {
      candidates.push(targetBase);
    }
    if (!targetBase.endsWith('.js')) {
      candidates.push(`${targetBase}.js`);
    }
    if (!targetBase.endsWith('.json')) {
      candidates.push(`${targetBase}.json`);
    }
    candidates.push(`${targetBase}/index.js`);
    for (const candidate of candidates) {
      if (modules[candidate]) {
        return candidate;
      }
    }
    throw new Error(`Cannot find module '${request}' from '${parentId}'`);
  };

  const load = (id) => {
    if (cache[id]) {
      return cache[id].exports;
    }
    if (!modules[id]) {
      throw new Error(`Cannot find module '${id}'`);
    }
    const module = { exports: {} };
    cache[id] = module;
    const localRequire = (request) => {
      if (request.startsWith('.')) {
        const resolved = resolveFrom(id, request);
        return load(resolved);
      }
      if (!globalRequire) {
        throw new Error(`Cannot require external module "${request}"`);
      }
      return globalRequire(request);
    };
    modules[id](module, module.exports, localRequire);
    return module.exports;
  };

  module.exports = load("src/plugin.js");
})();
