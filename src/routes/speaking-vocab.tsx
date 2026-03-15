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
      gradientColors="linear-gradient(-45deg, #7c3aed, #ec4899, #a855f7, #d946ef)"
      primaryColor="#7c3aed"
      viewRoute="/speaking-vocab/view"
      testRoute="/speaking-vocab/test"
    />
  )
}
