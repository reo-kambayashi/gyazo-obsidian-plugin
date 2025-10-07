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
