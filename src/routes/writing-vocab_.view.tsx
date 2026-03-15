import { createFileRoute } from '@tanstack/react-router'
import { task1Topics } from '../data/writing/task1'
import { task2Topics } from '../data/writing/task2'
import { VocabViewLayout } from '../components/VocabViewLayout'
import type { VocabTopic } from '../data/vocabulary'

export const Route = createFileRoute('/writing-vocab_/view')({
  component: WritingVocabView,
})

type Task = 1 | 2

function WritingVocabView() {
  const getCurrentTopics = (task: Task): Array<VocabTopic> => {
    switch (task) {
      case 1:
        return task1Topics
      case 2:
        return task2Topics
    }
  }

  return (
    <VocabViewLayout<Task>
      backTo="/writing-vocab"
      backToLabel="Back to Writing Vocab"
      title="View vocabulary to writing tasks"
      sectionLabel="Select Task"
      sections={[1, 2]}
      sectionName={(task) => `Task ${task}`}
      getCurrentTopics={getCurrentTopics}
      primaryColor="#2563eb"
      gradientColors="linear-gradient(-45deg, #3b82f6, #06b6d4, #2563eb, #0ea5e9)"
      emoji="✍️"
    />
  )
}
