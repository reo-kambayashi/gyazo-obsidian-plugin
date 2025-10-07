const fs = require("fs");

const modules = [
  "src/constants.js",
  "src/utils.js",
  "src/multipart.js",
  "src/i18n.js",
  "src/api.js",
  "src/settings.js",
  "src/views/gallery.js",
  "src/views/detail.js",
  "src/plugin.js"
];

const lines = [];
lines.push(
  "// バンドル済みエントリーポイントを生成します。Obsidian 本番環境では main.js のみを読み込むため、src 配下をひとつにまとめます。"
);
lines.push("(() => {");
lines.push('  const globalRequire = typeof require === "function" ? require : null;');
lines.push("  const modules = {");

modules.forEach((file, index) => {
  const source = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n").replace(/\n$/, "");
  lines.push(`    "${file}": (module, exports, require) => {`);
  source.split("\n").forEach((line) => {
    lines.push(`      ${line}`);
  });
  lines.push(index === modules.length - 1 ? "    }" : "    },");
});

lines.push("  };");
lines.push("");
lines.push("  const cache = {};");
lines.push("");
lines.push("  const normalizePath = (value) => {");
lines.push("    const segments = [];");
lines.push('    value.replace(/\\\\/g, "/").split("/").forEach((segment) => {');
lines.push('      if (!segment || segment === ".") {');
lines.push("        return;");
lines.push("      }");
lines.push('      if (segment === "..") {');
lines.push("        segments.pop();");
lines.push("        return;");
lines.push("      }");
lines.push("      segments.push(segment);");
lines.push("    });");
lines.push('    return segments.join("/");');
lines.push("  };");
lines.push("");
lines.push("  const resolveFrom = (parentId, request) => {");
lines.push("    const baseDir = parentId.slice(0, parentId.lastIndexOf('/') + 1);");
lines.push("    const targetBase = normalizePath(`${baseDir}${request}`);");
lines.push("    const candidates = [];");
lines.push("    if (modules[targetBase]) {");
lines.push("      candidates.push(targetBase);");
lines.push("    }");
lines.push("    if (!targetBase.endsWith('.js')) {");
lines.push("      candidates.push(`${targetBase}.js`);");
lines.push("    }");
lines.push("    if (!targetBase.endsWith('.json')) {");
lines.push("      candidates.push(`${targetBase}.json`);");
lines.push("    }");
lines.push("    candidates.push(`${targetBase}/index.js`);");
lines.push("    for (const candidate of candidates) {");
lines.push("      if (modules[candidate]) {");
lines.push("        return candidate;");
lines.push("      }");
lines.push("    }");
lines.push("    throw new Error(`Cannot find module '${request}' from '${parentId}'`);");
lines.push("  };");
lines.push("");
lines.push("  const load = (id) => {");
lines.push("    if (cache[id]) {");
lines.push("      return cache[id].exports;");
lines.push("    }");
lines.push("    if (!modules[id]) {");
lines.push("      throw new Error(`Cannot find module '${id}'`);");
lines.push("    }");
lines.push("    const module = { exports: {} };");
lines.push("    cache[id] = module;");
lines.push("    const localRequire = (request) => {");
lines.push("      if (request.startsWith('.')) {");
lines.push("        const resolved = resolveFrom(id, request);");
lines.push("        return load(resolved);");
lines.push("      }");
lines.push("      if (!globalRequire) {");
lines.push("        throw new Error(`Cannot require external module \"${request}\"`);");
lines.push("      }");
lines.push("      return globalRequire(request);");
lines.push("    };");
lines.push("    modules[id](module, module.exports, localRequire);");
lines.push("    return module.exports;");
lines.push("  };");
lines.push("");
lines.push('  module.exports = load("src/plugin.js");');
lines.push("})();");
lines.push("");

fs.writeFileSync("main.js", lines.join("\n"), "utf8");

console.log("main.js をバンドルしました。");
