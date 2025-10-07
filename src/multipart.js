const { TextEncoder } = require("util");

// Gyazoアップロード用のマルチパートフォームデータを生成するビルダー
class MultipartFormDataBuilder {
  constructor(boundaryPrefix = "----GyazoUpload") {
    this.encoder = new TextEncoder();
    this.boundary = `${boundaryPrefix}${Date.now().toString(16)}${Math.random()
      .toString(16)
      .slice(2)}`;
    this.parts = [];
  }

  appendField(name, value) {
    if (value === undefined || value === null || value === "") {
      return;
    }
    const chunk = this.encoder.encode(
      `--${this.boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`
    );
    this.parts.push(chunk);
  }

  async appendFile(name, file) {
    if (!file) {
      return;
    }
    const originalName = typeof file.name === "string" && file.name.trim() ? file.name : "upload";
    const safeName = originalName.replace(/[\r\n"]/g, "");
    const contentType = file.type || "application/octet-stream";

    const header = this.encoder.encode(
      `--${this.boundary}\r\nContent-Disposition: form-data; name="${name}"; filename="${safeName}"\r\nContent-Type: ${contentType}\r\n\r\n`
    );
    const fileBuffer = new Uint8Array(await file.arrayBuffer());
    const footer = this.encoder.encode(`\r\n`);
    this.parts.push(header, fileBuffer, footer);
  }

  build() {
    const closing = this.encoder.encode(`--${this.boundary}--\r\n`);
    const chunks = [...this.parts, closing];
    let totalLength = 0;
    for (const chunk of chunks) {
      totalLength += chunk.byteLength;
    }
    const payload = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      payload.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return payload;
  }

  getContentType() {
    return `multipart/form-data; boundary=${this.boundary}`;
  }
}

module.exports = {
  MultipartFormDataBuilder
};
