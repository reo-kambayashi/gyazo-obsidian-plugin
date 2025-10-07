const { requestUrl } = require("obsidian");
const {
  GYAZO_API_BASE,
  GYAZO_UPLOAD_ENDPOINT
} = require("./constants");
const { MultipartFormDataBuilder } = require("./multipart");

class GyazoApiClient {
  constructor(plugin) {
    this.plugin = plugin;
    this.accessToken = plugin.settings.accessToken;
  }

  setAccessToken(token) {
    this.accessToken = token;
  }

  ensureToken() {
    if (!this.accessToken) {
      throw new Error("missing-token");
    }
  }

  async fetchImages(limit = 100) {
    this.ensureToken();
    const url = new URL(`${GYAZO_API_BASE}/api/images`);
    url.searchParams.append("access_token", this.accessToken);
    url.searchParams.append("per_page", String(limit));
    const response = await requestUrl({
      url: url.toString(),
      method: "GET"
    });
    return response.json;
  }

  async uploadImage(file, options = {}) {
    this.ensureToken();
    const builder = new MultipartFormDataBuilder();
    builder.appendField("access_token", this.accessToken);
    builder.appendField("title", options.title);
    builder.appendField("desc", options.description);
    builder.appendField("access_policy", options.accessPolicy);
    builder.appendField("referer_url", options.refererUrl);
    await builder.appendFile("imagedata", file);

    const response = await requestUrl({
      url: GYAZO_UPLOAD_ENDPOINT,
      method: "POST",
      headers: {
        "Content-Type": builder.getContentType(),
        Accept: "application/json"
      },
      body: builder.build().buffer,
      throw: false
    });

    if (response.status < 200 || response.status >= 300) {
      const responseBody = response.text || (response.json ? JSON.stringify(response.json) : "");
      throw new Error(`Gyazo upload failed (${response.status}): ${responseBody}`);
    }

    return response.json;
  }
}

module.exports = {
  GyazoApiClient
};
