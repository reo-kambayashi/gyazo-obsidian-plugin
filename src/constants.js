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
