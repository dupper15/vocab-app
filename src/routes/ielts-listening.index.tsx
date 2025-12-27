import { createFileRoute } from '@tanstack/react-router'
import CambridgeBookSelection from '../components/CambridgeBookSelection'

export const Route = createFileRoute('/ielts-listening/')({
  component: IeltsListening,
})

function IeltsListening() {
  return (
    <CambridgeBookSelection
      title="IELTS Listening 🎵"
      emoji="🎧"
      description="Select Cambridge Book - Let's practice! 🚀"
      gradientColors="linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)"
      textColor="#4facfe"
      bookEmoji="📘"
      basePath="/ielts-listening"
    />
  )
}
