import { spawnSync } from "child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import path from "path";
import { isDir, readDir, getCommitTime } from "./utils";
import info from "../info";

export default {
  name: "copyDoc",
  buildStart() {
    const cacheDir = path.join(__dirname, "../cache");
    const docDir = path.join(__dirname, "../public", "doc");
    if (!existsSync(cacheDir)) {
      mkdirSync(cacheDir);
    }
    if (!existsSync(docDir)) {
      mkdirSync(docDir);
    }
    const cmds = [
      `git clone https://github.com/${info.username}/${info.username}.git`,
      `git clone https://github.com/${info.username}/front-end-works.git`,
      `git clone https://github.com/${info.username}/front-end-blog.git`,
    ];
    for (const cmd of cmds)
      spawnSync(cmd, {
        shell: true,
        cwd: cacheDir,
        stdio: [undefined, process.stdout, process.stderr],
      });
    //copy about
    cpSync(
      path.join(cacheDir, info.username, "README.md"),
      path.join(docDir, "ABOUT.md")
    );

    //copy projects.json
    cpSync(
      path.join(cacheDir, info.username, "projects.json"),
      path.join(docDir, "projects.json")
    );

    //cp blog
    const blogInfo: Array<String> = [];
    const blogDir = path.join(cacheDir, "front-end-blog");
    readDir(
      blogDir,
      (path1, path2) => {
        cpSync(path1, path.join(docDir, "blog", path2));
        const data = readFileSync(path1).toString();
        if (!/.md$/.test(path1)) return;
        const title = data.match(/(?<=#+)[^#].*/)?.[0];
        const _path = path2.replace(/\\/g, "/");
        blogInfo.push(`
          {
            "title": "${title?.trim()}",
            "path": "${_path}",
            "updateTime": "${getCommitTime(blogDir, path2)}"
          }
        `);
      },
      /\.(md|svg)$/
    );
    writeFileSync(
      path.join(docDir, "blogInfo.json"),
      `[${blogInfo.join(",")}]`
    );
    const workDir = path.join(cacheDir, "front-end-works");
    const worksDirs = readdirSync(workDir);
    const workCpDir = path.join(docDir, "work");
    const workInfo = new Array<string>();
    const exclude = ["previewServer", "pushToGithub", ".git", ".github"];
    for (const dir of worksDirs) {
      const srcDir = path.join(workDir, dir);
      if (exclude.includes(dir) || !isDir(srcDir)) continue;
      else {
        cpSync(srcDir, path.join(workCpDir, dir), { recursive: true });
        workInfo.push(
          `{"name": "${dir}","updateTime": "${getCommitTime(workDir, srcDir)}"}`
        );
      }
    }
    writeFileSync(
      path.join(docDir, "workInfo.json"),
      `[${workInfo.join(",")}]`
    );
  },
};
