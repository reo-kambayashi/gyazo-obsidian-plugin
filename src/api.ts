import { requestUrl, type RequestUrlParam } from "obsidian";
import { GYAZO_API_BASE, GYAZO_UPLOAD_ENDPOINT } from "./constants";
import { MultipartFormDataBuilder } from "./multipart";
import type { GyazoImage, GyazoUploadOptions } from "./types";
import type GyazoPlugin from "./main";

export class GyazoApiClient {
  private accessToken: string;

  constructor(private readonly plugin: GyazoPlugin) {
    this.accessToken = plugin.settings.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  private ensureToken(): void {
    if (!this.accessToken) {
      throw new Error("missing-token");
    }
  }

  async fetchImages(limit = 100): Promise<GyazoImage[]> {
    this.ensureToken();
    const url = new URL("/api/images", GYAZO_API_BASE);
    url.searchParams.append("access_token", this.accessToken);
    url.searchParams.append("per_page", String(limit));

    const response = await requestUrl({ url: url.toString(), method: "GET" });
    const images = response.json as GyazoImage[] | undefined;
    if (!Array.isArray(images)) {
      return [];
    }
    return images;
  }

  async uploadImage(file: File, options: GyazoUploadOptions = {}): Promise<GyazoImage> {
    this.ensureToken();
    const builder = new MultipartFormDataBuilder();
    builder.appendField("access_token", this.accessToken);
    builder.appendField("title", options.title);
    builder.appendField("desc", options.description);
    builder.appendField("access_policy", options.accessPolicy);
    builder.appendField("referer_url", options.refererUrl);
    await builder.appendFile("imagedata", file);

    const payload = builder.build();
    const body = payload.slice().buffer;
    const request: RequestUrlParam = {
      url: GYAZO_UPLOAD_ENDPOINT,
      method: "POST",
      headers: {
        "Content-Type": builder.getContentType(),
        Accept: "application/json"
      },
      body,
      throw: false
    };

    const response = await requestUrl(request);
    if (response.status < 200 || response.status >= 300) {
      const responseBody = response.text || (response.json ? JSON.stringify(response.json) : "");
      throw new Error(`Gyazo upload failed (${response.status}): ${responseBody}`);
    }

    return response.json as GyazoImage;
  }
}
