import { App, PluginSettingTab, Setting, TextComponent } from "obsidian";
import type GyazoPlugin from "./main";
import { getTranslation } from "./i18n";
import type { GyazoPluginSettings } from "./types";

export class GyazoSettingTab extends PluginSettingTab {
  constructor(app: App, private readonly plugin: GyazoPlugin) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    const settings = this.plugin.settings;
    const t = getTranslation(settings);

    containerEl.empty();
    new Setting(containerEl).setHeading().setName("Gyazo");

    let tokenInput: TextComponent | null = null;
    const tokenSetting = new Setting(containerEl)
      .setName(t.accessTokenLabel)
      .setDesc(t.accessTokenDesc);

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
      button
        .setIcon("eye")
        .setTooltip(t.showAccessToken)
        .onClick(() => {
          tokenVisible = !tokenVisible;
          if (!tokenInput) {
            return;
          }
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
          .onClick(() =>
            window.open("https://gyazo.com/oauth/applications", "_blank", "noopener noreferrer")
          )
      );

    new Setting(containerEl)
      .setName(t.languageLabel)
      .setDesc(t.languageDesc)
      .addDropdown((dropdown) => {
        dropdown.addOption("en", "English");
        dropdown.addOption("ja", "日本語");
        dropdown.setValue(settings.language || "en");
        dropdown.onChange(async (value) => {
          await this.updateSettings((draft) => {
            draft.language = value as GyazoPluginSettings["language"];
          });
          this.plugin.refreshViews();
        });
      });

    new Setting(containerEl)
      .setName(t.includePermalinkLinksLabel)
      .setDesc(t.includePermalinkLinksDesc)
      .addToggle((toggle) => {
        toggle.setValue(settings.includePermalinkLinks);
        toggle.onChange(async (value) => {
          await this.updateSettings((draft) => {
            draft.includePermalinkLinks = value;
          });
        });
      });

    new Setting(containerEl)
      .setName(t.imageWidthLabel)
      .setDesc(t.imageWidthDesc)
      .addToggle((toggle) => {
        toggle.setValue(settings.enableImageWidth);
        toggle.onChange(async (value) => {
          await this.updateSettings((draft) => {
            draft.enableImageWidth = value;
          });
        });
      });

    new Setting(containerEl)
      .setName(`${t.imageWidthLabel} (px)`)
      .addSlider((slider) => {
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

  private async updateSettings(mutator: (draft: GyazoPluginSettings) => void): Promise<void> {
    const nextSettings: GyazoPluginSettings = { ...this.plugin.settings };
    mutator(nextSettings);
    this.plugin.settings = nextSettings;
    await this.plugin.saveSettings();
  }
}
