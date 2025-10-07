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
