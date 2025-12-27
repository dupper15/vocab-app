import { Link } from '@tanstack/react-router'

interface VocabSelectionLayoutProps {
  title: string
  emoji: string
  description?: string
  bgGradient: string
  accentColor: string
  viewRoute: string
  testRoute: string
}

export function VocabSelectionLayout({
  title,
  emoji,
  description = 'Choose your practice method',
  bgGradient,
  accentColor,
  viewRoute,
  testRoute,
}: VocabSelectionLayoutProps) {
  return (
    <div className={`min-h-screen ${bgGradient} p-4`}>
      <div className="max-w-4xl mx-auto py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Menu
        </Link>

        <div className="text-center mb-12">
          <div className="text-7xl mb-4 animate-bounce">{emoji}</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to={viewRoute}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-10 text-center group hover:scale-105 border-2 border-transparent hover:border-gray-100"
          >
            <div className="text-7xl mb-6 transition-transform group-hover:scale-110">
              📚
            </div>
            <h2
              className={`text-3xl font-bold text-gray-800 mb-3 group-hover:${accentColor} transition-colors`}
            >
              View Vocabulary
            </h2>
            <p className="text-gray-600 text-lg">Browse and learn new words</p>
            <div className="mt-6 inline-flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
              Start Learning
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>

          <Link
            to={testRoute}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-10 text-center group hover:scale-105 border-2 border-transparent hover:border-gray-100"
          >
            <div className="text-7xl mb-6 transition-transform group-hover:scale-110">
              ✍️
            </div>
            <h2
              className={`text-3xl font-bold text-gray-800 mb-3 group-hover:${accentColor} transition-colors`}
            >
              Take Test
            </h2>
            <p className="text-gray-600 text-lg">
              Practice with interactive quizzes
            </p>
            <div className="mt-6 inline-flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
              Start Testing
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
