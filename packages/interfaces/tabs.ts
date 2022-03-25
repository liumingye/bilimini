import type { LoadURLOptions } from 'electron'

export type TabEvent = 'url-updated' | 'title-updated' | 'loading'

export interface CreateProperties {
  pluginName: string | undefined
  url: string
  active?: boolean
  options?: LoadURLOptions
  index?: number
}
