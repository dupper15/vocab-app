import { createFileRoute } from '@tanstack/react-router'
import { part1Topics } from '../data/speaking/part1'
import { part2Topics } from '../data/speaking/part2'
import { part3Topics } from '../data/speaking/part3'
import { VocabViewLayout } from '../components/VocabViewLayout'
import type { VocabTopic } from '../data/vocabulary'

export const Route = createFileRoute('/speaking-vocab_/view')({
  component: SpeakingVocabView,
})

type Part = 1 | 2 | 3

function SpeakingVocabView() {
  const getCurrentTopics = (part: Part): Array<VocabTopic> => {
    switch (part) {
      case 1:
        return part1Topics
      case 2:
        return part2Topics
      case 3:
        return part3Topics
    }
  }

  return (
    <VocabViewLayout<Part>
      backTo="/speaking-vocab"
      backToLabel="Back to Speaking Vocab"
      title="View vocabulary to speaking parts"
      sectionLabel="Select Part"
      sections={[1, 2, 3]}
      sectionName={(part) => `Part ${part}`}
      getCurrentTopics={getCurrentTopics}
      primaryColor="#7c3aed"
      gradientColors="linear-gradient(-45deg, #7c3aed, #ec4899, #a855f7, #d946ef)"
      emoji="🎤"
    />
  )
}
