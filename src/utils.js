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
