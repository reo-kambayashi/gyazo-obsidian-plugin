import { MEDIA_SUFFIX_TO_COPY_KEY } from "./constants";
import type { GyazoImage, GyazoPluginSettings, TranslationStrings } from "./types";

export function buildMarkdown(image: GyazoImage, settings: GyazoPluginSettings): string {
  const altParts: string[] = [];
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

export function formatDate(isoText: string | undefined, locale: string): string {
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

export function resolveErrorMessage(error: unknown): string {
  if (!error) {
    return "";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && "message" in error && typeof (error as { message: unknown }).message === "string") {
    return (error as { message: string }).message;
  }
  return "";
}

export function resolveCopyLabel(imageType: string | undefined, translation: TranslationStrings): string {
  const suffix = (imageType ?? "").toLowerCase();
  const copyKey = MEDIA_SUFFIX_TO_COPY_KEY[suffix];
  if (copyKey && copyKey in translation) {
    return translation[copyKey];
  }
  return translation.copyMarkdown;
}
