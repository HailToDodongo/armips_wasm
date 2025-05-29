export async function assemble(
  asm: stirng, 
  options: {
    log?: (s: string) => void,
    error?: (s: string) => void,
  }
) : Promise<Record<string, Uint8Array>>
