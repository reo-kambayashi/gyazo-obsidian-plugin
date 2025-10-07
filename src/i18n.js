const { TRANSLATIONS } = require("./constants");

function getTranslation(settings) {
  const lang = settings.language && settings.language in TRANSLATIONS ? settings.language : "en";
  return TRANSLATIONS[lang];
}

module.exports = {
  getTranslation
};
