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
      gradientColors="linear-gradient(-45deg, #3b82f6, #06b6d4, #2563eb, #0ea5e9)"
      primaryColor="#2563eb"
      viewRoute="/writing-vocab/view"
      testRoute="/writing-vocab/test"
    />
  )
}
