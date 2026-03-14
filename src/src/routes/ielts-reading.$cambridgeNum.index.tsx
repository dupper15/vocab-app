import { createFileRoute } from '@tanstack/react-router'
import TestSelection from '../components/TestSelection'

export const Route = createFileRoute('/ielts-reading/$cambridgeNum/')({
  component: IeltsReadingBook,
})

function IeltsReadingBook() {
  const { cambridgeNum } = Route.useParams()

  return (
    <TestSelection
      cambridgeNum={cambridgeNum}
      title="Cambridge"
      emoji="📗"
      description="Select Test - Enjoy your reading journey! 🌈"
      gradientColors="linear-gradient(135deg, #11998e 0%, #38ef7d 25%, #17ead9 50%, #6078ea 75%, #c471ed 100%)"
      textColor="#11998e"
      testEmoji="📖"
      backPath="/ielts-reading"
      backLabel="Back to IELTS Reading"
      basePath="/ielts-reading"
    />
  )
}
