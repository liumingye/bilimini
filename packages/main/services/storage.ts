import Storage from 'electron-json-storage'
import Logger from '~/common/logger'
import is from 'electron-is'

function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object
}

const electron = is.renderer() ? require('@electron/remote') : require('electron')

export class StorageService {
  public static instance = new this()

  public key = 'app'

  public constructor() {
    Storage.setDataPath(electron.app.getPath('userData') + '/config')
  }

  public get = (key = this.key) => {
    const config = Storage.getSync(key)
    return config
  }

  public remove = (data: string, key = this.key) => {
    const json = Storage.getSync(key)
    if (!isValidKey(data, json)) return
    delete json[data]
    Storage.set(key, { ...json }, (error: any) => {
      if (error) {
        Logger.error(error)
        throw error
      }
    })
  }

  public find = (data: string, key = this.key) => {
    const config = Storage.getSync(key)

    if (!isValidKey(data, config)) {
      return null
    }

    return config[data]
  }

  public update = (data: Record<string, any>, key = this.key) => {
    const oldJson = Storage.getSync(key)

    Storage.set(key, { ...oldJson, ...data }, (error: any) => {
      if (error) {
        Logger.error(error)
        throw error
      }
    })
  }
}