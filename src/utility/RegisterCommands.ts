import fs from "fs/promises";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";
import Command from "./CommandType";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registerCommands = async (dir = "../commands"): Promise<Map<string, Command>> => {
  const commands = new Map<string, Command>();

  const base = path.join(__dirname, dir);
  const files = await fs.readdir(base);

  for (const file of files) {
    const fullPath = path.join(base, file);
    const stat = await fs.lstat(fullPath);

    if (stat.isDirectory()) {
      await registerCommands(path.join(dir, file));
      continue;
    }

    if (/\.(mjs|cjs|js|ts)$/.test(file)) {
      const cmdName = path.basename(file, path.extname(file));

      if (cmdName !== "Template") {
        const moduleUrl = pathToFileURL(fullPath).href;
        const mod: any = await import(moduleUrl);
        const command = mod.default ?? mod;

        commands.set(cmdName.toLowerCase(), command as Command);
      }
    }
  }

  return commands;
};

export default registerCommands;
