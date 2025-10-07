import { TRANSLATIONS } from "./constants";
import type { GyazoPluginSettings, TranslationStrings } from "./types";

export function getTranslation(settings: GyazoPluginSettings): TranslationStrings {
  const lang = settings.language && settings.language in TRANSLATIONS ? settings.language : "en";
  return TRANSLATIONS[lang as keyof typeof TRANSLATIONS];
}
