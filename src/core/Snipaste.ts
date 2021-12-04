import { resolve } from 'path'
import { Config } from '../../types'
import fsAsync from 'fs/promises'
import fs from 'fs'
import {
  resolver as defaultResolver,
  generator as defaultGenerator,
} from '../default'
import { resolveFileName } from '../utils'

export default class Snipaste {
  protected fullEntry: string
  protected entry: string
  protected fullOutputDir: string
  protected naming: { [key: string]: string }
  protected outputDir: string
  protected ext: string

  constructor(protected config: Config) {
    this.fullEntry = resolve(config.base, config.entry)
    this.entry = config.entry
    this.outputDir = config.output.dir
    this.naming = config.naming
    this.ext = config.ext.startsWith('.') ? config.ext : '.' + config.ext
    this.fullOutputDir = resolve(config.base, config.output.dir)
  }

  public async traverse() {
    const dir = await fsAsync.readdir(this.fullEntry)
    const stats = await Promise.all(
      dir.map((file) => fsAsync.stat(resolve(this.fullEntry, file))),
    )

    const files: string[] = []
    const dirs: string[] = []
    stats.forEach((stat, index) => {
      stat.isFile() && files.push(dir[index])
      stat.isDirectory() && dirs.push(dir[index])
    })

    return {
      files,
      dirs,
      parent: this.entry,
    }
  }

  public async resolveFiles(files: string[]) {
    const fileDesc = await Promise.all(
      files.map((file) => fsAsync.readFile(resolve(this.fullEntry, file))),
    )

    const contents = fileDesc.map((file, index) => ({
      fileName: files[index],
      content: file.toString(),
    }))
    return contents
  }

  public resolveDirs(dirs: string[]) {}

  public export(
    files: { fileName: string; content: string }[],
    options: any = {},
  ) {
    const {
      naming = this.naming,
      key = this.entry,
      resolver = defaultResolver,
      generator = defaultGenerator,
      suffix = '',
      ext = this.ext,
    } = options

    const output = this.generate(
      files,
      naming[key] || this.entry,
      suffix,
      resolver,
      generator,
    )

    const target = resolve(this.fullOutputDir, key + ext)
    if (fs.existsSync(target)) {
      console.warn(`File "${target}" will be empty`)
      fs.truncateSync(target)
    }
    console.log(target)
    fs.writeFileSync(target, output)
  }

  private generate(
    files: { fileName: string; content: string }[],
    naming: string,
    suffix: string,
    resolver: (
      filename: string,
      content: string,
      prefix?: string,
      suffix?: string,
    ) => string,
    generator: (normalizeContents: string[]) => string,
  ) {
    return generator(
      files.map((f) => resolver(f.fileName, f.content, naming, suffix)),
    )
  }
}
