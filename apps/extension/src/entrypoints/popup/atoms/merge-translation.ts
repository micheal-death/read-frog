import { atom } from 'jotai'
import { configFields } from '@/utils/atoms/config'

export const mergeTranslationAtom = atom(
  (get) => {
    const translateConfig = get(configFields.translate)
    return translateConfig.mergeTranslation
  },
  (get, set, value: boolean) => {
    const translateConfig = get(configFields.translate)
    set(configFields.translate, {
      ...translateConfig,
      mergeTranslation: value,
    })
  },
)
