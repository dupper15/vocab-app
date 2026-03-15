import { Link } from '@tanstack/react-router'

interface VocabSelectionLayoutProps {
  title: string
  emoji: string
  description?: string
  gradientColors: string
  primaryColor: string
  viewRoute: string
  testRoute: string
}

export function VocabSelectionLayout({
  title,
  emoji,
  description = 'Choose your practice method',
  gradientColors,
  primaryColor,
  viewRoute,
  testRoute,
}: VocabSelectionLayoutProps) {
  return (
    <div
      className="min-h-screen p-4 relative overflow-hidden"
      style={{
        background: gradientColors,
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    >
      {/* Hình nền trang trí */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-bounce"
          style={{ animationDelay: '0s', animationDuration: '3s' }}
        ></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full animate-bounce"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-white rounded-full animate-bounce"
          style={{ animationDelay: '2s', animationDuration: '5s' }}
        ></div>
        <div
          className="absolute bottom-40 right-1/3 w-28 h-28 bg-white rounded-full animate-bounce"
          style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto py-8 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center text-white font-bold text-lg hover:scale-110 transition-transform mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30"
        >
          ← Back to Menu
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <div className="text-7xl mb-4 animate-bounce">{emoji}</div>
          <h1
            className="text-5xl font-bold mb-3 tracking-tight drop-shadow-lg"
            style={{
              color: 'white',
              textShadow:
                '2px 2px 4px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.5)',
            }}
          >
            {title}
          </h1>
          <p className="text-2xl text-white font-semibold drop-shadow-md">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to={viewRoute}
            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-2xl transition-all duration-300 p-10 text-center group hover:scale-110 transform border-2"
            style={{ borderColor: `${primaryColor}40` }}
          >
            <div className="text-7xl mb-6 transition-transform group-hover:scale-125 group-hover:rotate-6">
              📚
            </div>
            <h2
              className="text-3xl font-bold mb-3 transition-colors drop-shadow-sm"
              style={{ color: primaryColor }}
            >
              View Vocabulary
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Browse and learn new words
            </p>
            <div
              className="mt-6 inline-flex items-center text-sm font-bold transition-transform group-hover:translate-x-2"
              style={{ color: primaryColor }}
            >
              Start Learning →
            </div>
          </Link>

          <Link
            to={testRoute}
            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-2xl transition-all duration-300 p-10 text-center group hover:scale-110 transform border-2"
            style={{ borderColor: `${primaryColor}40` }}
          >
            <div className="text-7xl mb-6 transition-transform group-hover:scale-125 group-hover:rotate-6">
              ✍️
            </div>
            <h2
              className="text-3xl font-bold mb-3 transition-colors drop-shadow-sm"
              style={{ color: primaryColor }}
            >
              Take Test
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Practice with interactive quizzes
            </p>
            <div
              className="mt-6 inline-flex items-center text-sm font-bold transition-transform group-hover:translate-x-2"
              style={{ color: primaryColor }}
            >
              Start Testing →
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
