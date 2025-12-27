import { createFileRoute } from '@tanstack/react-router'
import { VocabTestLayout } from '../components/VocabTestLayout'
import { part1Topics } from '../data/speaking/part1'
import { part2Topics } from '../data/speaking/part2'
import { part3Topics } from '../data/speaking/part3'

export const Route = createFileRoute('/speaking-vocab_/test')({
  component: SpeakingVocabTest,
})

function SpeakingVocabTest() {
  return (
    <VocabTestLayout
      backRoute="/speaking-vocab"
      backText="Back to Speaking Vocab"
      title="Speaking Vocab Test"
      emoji="💬"
      bgGradient="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100"
      accentColor="text-purple-600"
      buttonBgColor="bg-purple-600"
      buttonHoverBgColor="hover:bg-purple-700"
      ringColor="focus:ring-purple-300"
      borderColor="border-purple-600"
      hoverBorderColor="hover:border-purple-600"
      bgLightColor="bg-purple-50"
      sectionLabel="Part"
      sections={[
        {
          id: 1,
          label: 'Part 1',
          description: 'Introduction & Interview',
          emoji: '👋',
          topics: part1Topics,
        },
        {
          id: 2,
          label: 'Part 2',
          description: 'Long Turn (Cue Card)',
          emoji: '💭',
          topics: part2Topics,
        },
        {
          id: 3,
          label: 'Part 3',
          description: 'Discussion',
          emoji: '💬',
          topics: part3Topics,
        },
      ]}
    />
  )
}
