import { Plugin, addIcon, type WorkspaceLeaf } from "obsidian";
import { GyazoApiClient } from "./api";
import { DEFAULT_SETTINGS, GYAZO_ICON, VIEW_TYPE_DETAIL, VIEW_TYPE_GALLERY } from "./constants";
import { getTranslation } from "./i18n";
import { GyazoSettingTab } from "./settings";
import type { GyazoImage, GyazoPluginSettings } from "./types";
import { GyazoGalleryView } from "./views/gallery";
import { GyazoDetailView } from "./views/detail";

type LeafOptions = {
  active?: boolean;
  reveal?: boolean;
  reconfigureExisting?: boolean;
};

export default class GyazoPlugin extends Plugin {
  settings: GyazoPluginSettings = { ...DEFAULT_SETTINGS };
  api: GyazoApiClient | null = null;
  private readonly imageListeners = new Set<(image: GyazoImage) => void>();

  override async onload(): Promise<void> {
    await this.loadSettings();
    this.api = new GyazoApiClient(this);
    this.api.setAccessToken(this.settings.accessToken);

    addIcon("gyazo", GYAZO_ICON);

    this.registerView(VIEW_TYPE_GALLERY, (leaf) => new GyazoGalleryView(leaf, this));
    this.registerView(VIEW_TYPE_DETAIL, (leaf) => new GyazoDetailView(leaf, this));

    this.addRibbonIcon("gyazo", getTranslation(this.settings).ribbonTooltip, () => {
      void this.activateView();
    });

    this.addCommand({
      id: "open-gyazo-gallery",
      name: "Open Gyazo gallery",
      callback: () => {
        void this.activateView();
      }
    });

    this.addSettingTab(new GyazoSettingTab(this.app, this));
  }

  override async onunload(): Promise<void> {
    this.imageListeners.clear();
  }

  async ensureLeaf(type: string, options: LeafOptions = {}): Promise<WorkspaceLeaf> {
    const { active = true, reveal = false, reconfigureExisting = false } = options;
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(type)[0];
    if (!leaf) {
      leaf = workspace.getRightLeaf(false) ?? workspace.getLeaf(true);
      await leaf.setViewState({ type, active });
    } else if (reconfigureExisting) {
      await leaf.setViewState({ type, active });
    }
    if (reveal) {
      workspace.revealLeaf(leaf);
    }
    return leaf;
  }

  async activateView(): Promise<void> {
    await this.ensureLeaf(VIEW_TYPE_GALLERY, {
      active: true,
      reveal: true,
      reconfigureExisting: true
    });
  }

  async ensureDetailView(): Promise<WorkspaceLeaf> {
    return this.ensureLeaf(VIEW_TYPE_DETAIL, { active: false });
  }

  registerImageListener(callback: (image: GyazoImage) => void): () => void {
    this.imageListeners.add(callback);
    return () => {
      this.imageListeners.delete(callback);
    };
  }

  notifyImageSelected(image: GyazoImage): void {
    for (const callback of this.imageListeners) {
      try {
        callback(image);
      } catch (error) {
        console.error("Gyazo detail listener failed", error);
      }
    }
  }

  async loadSettings(): Promise<void> {
    const data = (await this.loadData()) as Partial<GyazoPluginSettings> | null;
    this.settings = { ...DEFAULT_SETTINGS, ...(data ?? {}) };
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
    this.api?.setAccessToken(this.settings.accessToken);
  }

  refreshViews(): void {
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
