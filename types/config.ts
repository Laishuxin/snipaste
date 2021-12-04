export interface Naming {
  [key: string]: string
}

export interface Config {
  base: string
  entry: string
  output: {
    dir: string
  }
  naming: Naming
  ext: string
}
