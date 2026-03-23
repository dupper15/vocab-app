import { createFileRoute } from '@tanstack/react-router'
import VocabTest from '../components/VocabTest'
import { test1Vocab as cam18Test1 } from '../../data/listening/cam18/test1'
import { test2Vocab as cam18Test2 } from '../../data/listening/cam18/test2'
import { test1Vocab as cam19Test1 } from '../../data/listening/cam19/test1'
import { test2Vocab as cam19Test2 } from '../../data/listening/cam19/test2'

export const Route = createFileRoute('/ielts-listening/$cambridgeNum/$testNum')(
  {
    component: IeltsListeningTest,
  },
)

const vocabMap: Record<string, Record<string, any>> = {
  '18': { '1': cam18Test1, '2': cam18Test2 },
  '19': { '1': cam19Test1, '2': cam19Test2 },
}

function IeltsListeningTest() {
  const { cambridgeNum, testNum } = Route.useParams()
  const words = vocabMap[cambridgeNum]?.[testNum] || []

  return (
    <VocabTest
      cambridgeNum={cambridgeNum}
      testNum={testNum}
      type="listening"
      gradientColors="linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)"
      primaryColor="#4facfe"
      emoji="🎧"
      backPath={`/ielts-listening/${cambridgeNum}`}
      words={words}
    />
  )
}
