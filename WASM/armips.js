// NOTE: this file gets appended to the wrapper created by emscripten

/**
 * @param {string} asm 
 * @returns Promise<{imem: Uint8Array, dmem: Uint8Array}>
 */
async function assemble(asm) {
  const encoder = new TextEncoder();
  const data = encoder.encode(asm);
  FS.writeFile("rsp_test.S", data);

  const task = new Promise((resolve, reject) => {
    Module['postRun'] = Module['postRun'] || [];
    Module['postRun'].push((a) => resolve(a));

    arguments_.splice(0);
    arguments_[0] = "rsp_test.S";
    run();
  });
  await task;

  const imem = FS.readFile("ucode.imem", {});
  const dmem = FS.readFile("ucode.dmem", {});
  return {imem, dmem};
}

module.exports = {assemble};
