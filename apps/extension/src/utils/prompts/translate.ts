import { globalConfig } from '@/utils/config/config'
import { DEFAULT_TRANSLATE_PROMPT, INPUT_TOKEN, TARGET_LANG_TOKEN } from '../constants/prompt'

export function getTranslatePrompt(targetLang: string, input: string) {
  if (!globalConfig) {
    throw new Error('No global config when translate text')
  }
  const promptsConfig = globalConfig.translate.promptsConfig
  const { patterns = [], prompt: promptId = '' } = promptsConfig

  const prompt = patterns.find(pattern => pattern.id === promptId)?.prompt ?? DEFAULT_TRANSLATE_PROMPT

  return prompt
    .replaceAll(TARGET_LANG_TOKEN, targetLang)
    .replaceAll(INPUT_TOKEN, input)
}

export function getBatchTranslatePrompt(targetLang: string, input: string) {
  const BATCH_TRANSLATE_SEPARATOR = '<read-frog-separator>'
  const batchInstruction = `You are a professional translator. Your task is to translate a batch of texts. The texts are separated by a special marker: \`${BATCH_TRANSLATE_SEPARATOR}\`. You must follow these rules strictly:
1. Translate each text segment independently into ${targetLang}.
2. In your response, you MUST preserve the exact same separator \`${BATCH_TRANSLATE_SEPARATOR}\` between each of the translated text segments.
3. Do NOT translate the separator itself.
4. Your response should only contain the translated texts and the separators, with no additional explanations, introductions, or any other text.

Here is the text to translate:`

  const finalInput = `${batchInstruction}\n\n${input}`

  // For batch translation, we use a fixed, reliable prompt and do not use user-configurable prompts.
  const promptTemplate = DEFAULT_TRANSLATE_PROMPT
    .replaceAll(TARGET_LANG_TOKEN, targetLang)
    .replaceAll(INPUT_TOKEN, finalInput)

  return promptTemplate
}
