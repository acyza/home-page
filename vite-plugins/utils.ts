import { spawnSync } from "child_process";
import { readdirSync, statSync } from "fs";
import path from "path";

export function isDir(name: string) {
  return statSync(name).isDirectory();
}
export function readDir(
  dir: string,
  callback: (path: string, relativePath: string) => void,
  filter?: RegExp,
  childDir?: string
) {
  const files = readdirSync(dir);
  for (const name of files) {
    const _path = childDir ? path.join(childDir, name) : name;
    const file = path.join(dir, name);
    const stat = statSync(file);
    if (stat.isDirectory()) {
      readDir(file, callback, filter, _path);
    } else if (stat.isFile() && (!filter || filter.test(file))) {
      callback(file, _path);
    }
  }
}

export function getCommitTime(gitDir: string, filePath: string) {
  const gitProcess = spawnSync(`git log --pretty=%cd -1 ${filePath}`, {
    cwd: gitDir,
    shell: true,
    stdio: [undefined, undefined, process.stderr],
  });
  return gitProcess.stdout?.toString().trim();
}
