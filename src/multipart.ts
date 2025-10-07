export class MultipartFormDataBuilder {
  private readonly encoder = new TextEncoder();
  private readonly boundary: string;
  private readonly parts: Uint8Array[] = [];

  constructor(boundaryPrefix = "----GyazoUpload") {
    this.boundary = `${boundaryPrefix}${Date.now().toString(16)}${Math.random()
      .toString(16)
      .slice(2)}`;
  }

  appendField(name: string, value: unknown): void {
    if (value === undefined || value === null || value === "") {
      return;
    }
    const chunk = this.encoder.encode(
      `--${this.boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`
    );
    this.parts.push(chunk);
  }

  async appendFile(name: string, file: File | Blob | null | undefined): Promise<void> {
    if (!file) {
      return;
    }
    const originalName =
      typeof (file as File).name === "string" && (file as File).name.trim()
        ? (file as File).name
        : "upload";
    const safeName = originalName.replace(/[\r\n"]/g, "");
    const contentType = (file as File).type || "application/octet-stream";

    const header = this.encoder.encode(
      `--${this.boundary}\r\nContent-Disposition: form-data; name="${name}"; filename="${safeName}"\r\nContent-Type: ${contentType}\r\n\r\n`
    );
    const buffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(buffer);
    const footer = this.encoder.encode(`\r\n`);
    this.parts.push(header, fileBuffer, footer);
  }

  build(): Uint8Array {
    const closing = this.encoder.encode(`--${this.boundary}--\r\n`);
    const chunks = [...this.parts, closing];
    const payload = new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0));
    let offset = 0;
    for (const chunk of chunks) {
      payload.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return payload;
  }

  getContentType(): string {
    return `multipart/form-data; boundary=${this.boundary}`;
  }
}
