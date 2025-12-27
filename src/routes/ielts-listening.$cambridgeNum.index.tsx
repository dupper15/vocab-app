import { createFileRoute } from '@tanstack/react-router'
import TestSelection from '../components/TestSelection'

export const Route = createFileRoute('/ielts-listening/$cambridgeNum/')({
  component: IeltsListeningBook,
})

function IeltsListeningBook() {
  const { cambridgeNum } = Route.useParams()

  return (
    <TestSelection
      cambridgeNum={cambridgeNum}
      title="Cambridge"
      emoji="📘"
      description="Select Test - Let's improve your listening! 🎵"
      gradientColors="linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)"
      textColor="#4facfe"
      testEmoji="🎧"
      backPath="/ielts-listening"
      backLabel="Back to IELTS Listening"
      basePath="/ielts-listening"
    />
  )
}
