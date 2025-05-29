// NOTE: this file gets appended to the wrapper created by emscripten

/**
 * @param {string} asm 
 * @returns Promise<{imem: Uint8Array, dmem: Uint8Array}>
 */
export async function assemble(asm) {
  const encoder = new TextEncoder();
  const data = encoder.encode(asm);

  const m = await Module({
    argv: ["", "", "rsp_test.S"],
    preRun: (mod) => {
      mod.FS.writeFile("rsp_test.S", data);
      //console.log("PRERUN", mod.FS);
    }
  });

  const imem = m.FS.readFile("ucode.imem", {});
  const dmem = m.FS.readFile("ucode.dmem", {});
  return {imem, dmem};
}
