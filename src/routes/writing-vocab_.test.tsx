import { createFileRoute } from '@tanstack/react-router'
import { VocabTestLayout } from '../components/VocabTestLayout'
import { task1Topics } from '../data/writing/task1'
import { task2Topics } from '../data/writing/task2'

export const Route = createFileRoute('/writing-vocab_/test')({
  component: WritingVocabTest,
})

function WritingVocabTest() {
  return (
    <VocabTestLayout
      backRoute="/writing-vocab"
      backText="Back to Writing Vocab"
      title="Writing Vocab Test"
      emoji="✍️"
      bgGradient="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100"
      accentColor="text-blue-600"
      buttonBgColor="bg-blue-600"
      buttonHoverBgColor="hover:bg-blue-700"
      ringColor="focus:ring-blue-300"
      borderColor="border-blue-600"
      hoverBorderColor="hover:border-blue-600"
      bgLightColor="bg-blue-50"
      sectionLabel="Task"
      sections={[
        {
          id: 1,
          label: 'Task 1',
          description: 'Graph, Chart, Table Description',
          emoji: '📊',
          topics: task1Topics,
        },
        {
          id: 2,
          label: 'Task 2',
          description: 'Essay Writing',
          emoji: '📄',
          topics: task2Topics,
        },
      ]}
    />
  )
}
