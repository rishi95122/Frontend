/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WCCLIENT: string
  readonly VITE_APPVERSION: string
  readonly VITE_CGPRO: string
  readonly VITE_KADO: string
  readonly VITE_HOTJARID: string
  readonly VITE_AMPLITUDE: string
  readonly VITE_NEUTRONNETWORK: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
