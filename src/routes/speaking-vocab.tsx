import { createFileRoute } from '@tanstack/react-router'
import { VocabSelectionLayout } from '../components/VocabSelectionLayout'

export const Route = createFileRoute('/speaking-vocab')({
  component: SpeakingVocab,
})

function SpeakingVocab() {
  return (
    <VocabSelectionLayout
      title="Speaking Vocabulary"
      emoji="💬"
      description="Master essential speaking vocabulary for IELTS"
      bgGradient="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100"
      accentColor="text-purple-600"
      viewRoute="/speaking-vocab/view"
      testRoute="/speaking-vocab/test"
    />
  )
}
