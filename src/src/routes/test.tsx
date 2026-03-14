import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
  component: Test,
})

function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          ← Back to Menu
        </Link>

        <div className="text-center">
          <div className="text-6xl mb-6">📝</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Vocabulary Test
          </h1>
          <p className="text-gray-600 mb-8">
            Test your knowledge with interactive quizzes
          </p>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl">
            Start Test
          </button>

          <div className="mt-8 text-sm text-gray-500">
            Click the button to implement test functionality
          </div>
        </div>
      </div>
    </div>
  )
}
