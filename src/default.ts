import { Config } from '../types'
import { resolve } from 'path'
import { vscodeGenerator, vscodeResolver } from './resolver/vscode'

export const resolver = vscodeResolver
export const generator = vscodeGenerator

export const config: Config = {
  base: resolve(__dirname, '../'),
  entry: 'template',
  output: {
    dir: '.vscode',
  },

  naming: {
    template: 'sutils:',
  },
  ext: '.code-snippets',
}
