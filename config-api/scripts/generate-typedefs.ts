import { zodToTs, printNode, createTypeAlias } from 'zod-to-ts';
import fs from 'fs';
import { ConfigSchema } from '../src/configSchema.ts';

const { node } = zodToTs(ConfigSchema, 'FinickyConfig');
const config = printNode(createTypeAlias(node, 'FinickyConfig'))

// TODO: Generate the FinickyUtils interface automatically
const output = `
/** This file is generated by the generate-typedefs.ts script. Do not edit it directly. */


interface FinickyUtils {
    matchHostnames: (hostnames: string[]) => (url: URL) => boolean;
    getKeys: () => {
        shift: boolean;
        option: boolean;
        command: boolean;
        control: boolean;
        capsLock: boolean;
        fn: boolean;
    };
}
    
declare global {
    const finicky: FinickyUtils
}

export ${config}
`

fs.writeFileSync(
  '../assets/finicky.d.ts',
  output,
  'utf-8'
);
