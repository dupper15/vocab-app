import { createFileRoute } from '@tanstack/react-router'
import { VocabTestLayout } from '../components/VocabTestLayout'
import { task1Topics } from '../../data/writing/task1'
import { task2Topics } from '../../data/writing/task2'

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
      gradientColors="linear-gradient(-45deg, #3b82f6, #06b6d4, #2563eb, #0ea5e9)"
      primaryColor="#2563eb"
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
