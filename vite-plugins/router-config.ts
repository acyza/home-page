import { readdirSync, readFileSync } from "fs";
import path from "path";
import type { PluginOption } from "vite";

const viewsDir = path.join(__dirname, "../src", "views");

function genRouterConfig() {
  const views = readdirSync(viewsDir);
  const infos = new Array<{
    index: number;
    info: string;
    toString: () => string;
  }>();
  for (const view of views) {
    const code = readFileSync(path.join(viewsDir, view)).toString().split("\n");
    const info = `{
      path: "${code[2].trim()}",
      name: "${code[3].trim()}",
      component: Loading,
      props: {
        component: () => import("../views/${view}")
      }
    }
    `;
    infos.push({
      index: Number.parseInt(code[1]),
      info,
      toString() {
        return info;
      },
    });
  }
  return infos.sort((a, b) => a.index - b.index).join();
}

export default {
  name: "routerConfig",
  transform(code, id) {
    if (
      path.normalize(id) ==
      path.join(__dirname, "../src", "router", "config.ts")
    ) {
      return code.replace("//Config", genRouterConfig());
    }
  },
} as PluginOption;
