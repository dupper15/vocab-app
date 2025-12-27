import { createFileRoute } from '@tanstack/react-router'
import { VocabSelectionLayout } from '../components/VocabSelectionLayout'

export const Route = createFileRoute('/writing-vocab')({
  component: WritingVocab,
})

function WritingVocab() {
  return (
    <VocabSelectionLayout
      title="Writing Vocabulary"
      emoji="✍️"
      description="Enhance your writing skills with academic vocabulary"
      bgGradient="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100"
      accentColor="text-blue-600"
      viewRoute="/writing-vocab/view"
      testRoute="/writing-vocab/test"
    />
  )
}
