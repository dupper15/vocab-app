import { createFileRoute } from '@tanstack/react-router'
import VocabTest from '../components/VocabTest'
import { test1Vocab as cam14Test1 } from '../../data/reading/cam14/test1'
import { test2Vocab as cam14Test2 } from '../../data/reading/cam14/test2'
import { test3Vocab as cam14Test3 } from '../../data/reading/cam14/test3'
import { test4Vocab as cam14Test4 } from '../../data/reading/cam14/test4'
import { test1Vocab as cam13test1 } from '../../data/reading/cam13/test1'
import { test2Vocab as cam13test2 } from '../../data/reading/cam13/test2'
import { test3Vocab as cam13test3 } from '../../data/reading/cam13/test3'
import { test4Vocab as cam13test4 } from '../../data/reading/cam13/test4'
import { test1Vocab as cam15test1 } from '../../data/reading/cam15/test1'
import { test2Vocab as cam15Test2 } from '../../data/reading/cam15/test2'
import { test3Vocab as cam15Test3 } from '../../data/reading/cam15/test3'
import { test4Vocab as cam15Test4 } from '../../data/reading/cam15/test4'
import { test1Vocab as cam11Test1 } from '../../data/reading/cam11/test1'
import { test2Vocab as cam11Test2 } from '../../data/reading/cam11/test2'
import { test3Vocab as cam11Test3 } from '../../data/reading/cam11/test3'
import { test4Vocab as cam11Test4 } from '../../data/reading/cam11/test4'
import { test1Vocab as cam12Test1 } from '../../data/reading/cam12/test1'
import { test2Vocab as cam12Test2 } from '../../data/reading/cam12/test2'
import { test3Vocab as cam12Test3 } from '../../data/reading/cam12/test3'
import { test4Vocab as cam12Test4 } from '../../data/reading/cam12/test4'
import { test1Vocab as cam17Test1 } from '../../data/reading/cam17/test1'
import { test2Vocab as cam17Test2 } from '../../data/reading/cam17/test2'
import { test3Vocab as cam17Test3 } from '../../data/reading/cam17/test3'
import { test4Vocab as cam17Test4 } from '../../data/reading/cam17/test4'
import { test1Vocab as cam16Test1 } from '../../data/reading/cam16/test1'
import { test2Vocab as cam16Test2 } from '../../data/reading/cam16/test2'
import { test3Vocab as cam16Test3 } from '../../data/reading/cam16/test3'
import { test4Vocab as cam16Test4 } from '../../data/reading/cam16/test4'

export const Route = createFileRoute('/ielts-reading/$cambridgeNum/$testNum')({
  component: IeltsReadingTest,
})

const vocabMap: Record<string, Record<string, any>> = {
  '13': { '1': cam13test1, '2': cam13test2, '3': cam13test3, '4': cam13test4 },
  '14': { '1': cam14Test1, '2': cam14Test2, '3': cam14Test3, '4': cam14Test4 },
  '15': { '1': cam15test1, '2': cam15Test2, '3': cam15Test3, '4': cam15Test4 },
  '16': { '1': cam16Test1, '2': cam16Test2, '3': cam16Test3, '4': cam16Test4 },
  '17': { '1': cam17Test1, '2': cam17Test2, '3': cam17Test3, '4': cam17Test4 },
  '11': { '1': cam11Test1, '2': cam11Test2, '3': cam11Test3, '4': cam11Test4 },
  '12': { '1': cam12Test1, '2': cam12Test2, '3': cam12Test3, '4': cam12Test4 },
}

function IeltsReadingTest() {
  const { cambridgeNum, testNum } = Route.useParams()
  const words = vocabMap[cambridgeNum]?.[testNum] || []
  return (
    <VocabTest
      cambridgeNum={cambridgeNum}
      testNum={testNum}
      type="reading"
      gradientColors="linear-gradient(135deg, #11998e 0%, #38ef7d 25%, #17ead9 50%, #6078ea 75%, #c471ed 100%)"
      primaryColor="#11998e"
      emoji="📖"
      backPath={`/ielts-reading/${cambridgeNum}`}
      words={words}
    />
  )
}
