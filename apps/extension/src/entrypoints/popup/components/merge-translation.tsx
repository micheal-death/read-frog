import { i18n } from '#imports'
import { Switch } from '@repo/ui/components/switch'
import { useAtom } from 'jotai'
import { mergeTranslationAtom } from '../atoms/merge-translation'

export function MergeTranslation() {
  const [mergeTranslation, setMergeTranslation] = useAtom(mergeTranslationAtom)

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[13px] font-medium">
        {i18n.t('popup.mergeTranslation')}
      </span>
      <Switch
        checked={mergeTranslation}
        onCheckedChange={setMergeTranslation}
      />
    </div>
  )
}
