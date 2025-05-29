// NOTE: this file gets appended to the wrapper created by emscripten

let initialFiles = [];

/**
 * @param {string} asm 
 * @returns Promise<Record<string, Uint8Array>>
 */
export async function assemble(asm) {
  const encoder = new TextEncoder();
  const data = encoder.encode(asm);

  const m = await Module({
    argv: ["", "", "asm.s"],
    preRun: (mod) => {
      mod.FS.writeFile("asm.s", data);
      initialFiles = mod.FS.readdir("/");
    }
  });

  const newFiles = m.FS.readdir("/")
    .filter(f => !initialFiles.includes(f));

  const res = {};
  for(const f of newFiles) {
    res[f] = m.FS.readFile(f, {});
  }
  return res;
}
