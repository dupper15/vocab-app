import { createFileRoute } from '@tanstack/react-router'
import CambridgeBookSelection from '../components/CambridgeBookSelection'

export const Route = createFileRoute('/ielts-reading/')({
  component: IeltsReading,
})

function IeltsReading() {
  return (
    <CambridgeBookSelection
      title="IELTS Reading 📚"
      emoji="📖"
      description="Select Cambridge Book - Happy reading! 🌈"
      gradientColors="linear-gradient(135deg, #11998e 0%, #38ef7d 25%, #17ead9 50%, #6078ea 75%, #c471ed 100%)"
      textColor="#11998e"
      bookEmoji="📗"
      basePath="/ielts-reading"
    />
  )
}
