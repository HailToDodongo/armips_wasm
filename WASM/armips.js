// NOTE: this file gets appended to the wrapper created by emscripten

let initialFiles = [];

/**
* @param {string} asm 
* @param {Object} [options]
* @returns Promise<Record<string, Uint8Array>>
*/
export async function assemble(asm, options = {}) {
  const encoder = new TextEncoder();
  const data = encoder.encode(asm);

  const m = await Module({
      argv: ["", "", "asm.s"],
      log: options.log || console.log,
      error: options.error || console.error,
      preRun: (mod) => {
          mod.FS.writeFile("asm.s", data);
          initialFiles = mod.FS.readdir("/");
      }
  });

  const newFiles = m.FS.readdir("/")
      .filter(f => !initialFiles.includes(f));

  const res = {};
  for (const f of newFiles) {
      res[f] = m.FS.readFile(f, {});
  }
  return res;
}