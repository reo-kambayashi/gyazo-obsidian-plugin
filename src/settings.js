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

    new Setting(containerEl)
      .setName(t.accessTokenLabel)
      .setDesc(t.accessTokenDesc)
      .addText((text) => {
        text.setPlaceholder("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        text.setValue(this.plugin.settings.accessToken);
        text.onChange(async (value) => {
          this.plugin.settings.accessToken = value.trim();
          this.plugin.api.setAccessToken(this.plugin.settings.accessToken);
          await this.plugin.saveSettings();
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
