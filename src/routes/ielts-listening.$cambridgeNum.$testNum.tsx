import { createFileRoute } from '@tanstack/react-router'
import VocabTest from '../components/VocabTest'

export const Route = createFileRoute('/ielts-listening/$cambridgeNum/$testNum')(
  {
    component: IeltsListeningTest,
  },
)

function IeltsListeningTest() {
  const { cambridgeNum, testNum } = Route.useParams()

  return (
    <VocabTest
      cambridgeNum={cambridgeNum}
      testNum={testNum}
      type="listening"
      gradientColors="linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)"
      primaryColor="#4facfe"
      emoji="🎧"
      backPath={`/ielts-listening/${cambridgeNum}`}
      dataPath={`listening/cam${cambridgeNum}/test${testNum}.ts`}
    />
  )
}
