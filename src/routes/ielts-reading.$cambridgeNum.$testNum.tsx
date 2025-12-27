import { createFileRoute } from '@tanstack/react-router'
import VocabTest from '../components/VocabTest'

export const Route = createFileRoute('/ielts-reading/$cambridgeNum/$testNum')({
  component: IeltsReadingTest,
})

function IeltsReadingTest() {
  const { cambridgeNum, testNum } = Route.useParams()

  return (
    <VocabTest
      cambridgeNum={cambridgeNum}
      testNum={testNum}
      type="reading"
      gradientColors="linear-gradient(135deg, #11998e 0%, #38ef7d 25%, #17ead9 50%, #6078ea 75%, #c471ed 100%)"
      primaryColor="#11998e"
      emoji="📖"
      backPath={`/ielts-reading/${cambridgeNum}`}
      dataPath={`reading/cam${cambridgeNum}/test${testNum}.ts`}
    />
  )
}
