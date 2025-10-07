export interface GyazoImage {
  image_id: string;
  type: string;
  thumb_url: string;
  url: string;
  permalink_url?: string;
  desc?: string;
  title?: string;
  referer_url?: string;
  application?: string;
  created_at?: string;
  alt_text?: string;
  ocr?: string;
}

export interface GyazoUploadOptions {
  title?: string;
  description?: string;
  accessPolicy?: string;
  refererUrl?: string;
}

export type SupportedLanguage = "en" | "ja";

export interface GyazoPluginSettings {
  accessToken: string;
  language: SupportedLanguage;
  includePermalinkLinks: boolean;
  enableImageWidth: boolean;
  imageWidth: number;
}

export interface TranslationStrings {
  ribbonTooltip: string;
  galleryTitle: string;
  detailViewTitle: string;
  selectImageToView: string;
  loadingImages: string;
  noImages: string;
  errorLoadingImages: string;
  refreshButton: string;
  dropHint: string;
  uploading: string;
  uploaded: string;
  uploadFailed: string;
  noAccessToken: string;
  accessTokenLabel: string;
  accessTokenDesc: string;
  showAccessToken: string;
  hideAccessToken: string;
  openApiDashboard: string;
  openApiDashboardDesc: string;
  languageLabel: string;
  languageDesc: string;
  includePermalinkLinksLabel: string;
  includePermalinkLinksDesc: string;
  imageWidthLabel: string;
  imageWidthDesc: string;
  save: string;
  copyMarkdown: string;
  copyMarkdownGif: string;
  copyMarkdownMp4: string;
  imageCopiedToClipboard: string;
  imageCopiedToEditor: string;
  imageOpenedInBrowser: string;
  openInBrowser: string;
  copyUrl: string;
  uploadDate: string;
  description: string;
  title: string;
  source: string;
  app: string;
  ocr: string;
}
