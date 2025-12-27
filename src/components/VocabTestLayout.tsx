import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { VocabTopic, VocabWord } from '../data/vocabulary'

interface VocabTestLayoutProps {
  backRoute: string
  backText: string
  title: string
  emoji: string
  bgGradient: string
  accentColor: string
  buttonBgColor: string
  buttonHoverBgColor: string
  ringColor: string
  borderColor: string
  hoverBorderColor: string
  bgLightColor: string
  sections: Array<{
    id: number
    label: string
    description: string
    emoji: string
    topics: Array<VocabTopic>
  }>
  sectionLabel: string
}

export function VocabTestLayout({
  backRoute,
  backText,
  title,
  emoji,
  bgGradient,
  accentColor,
  buttonBgColor,
  buttonHoverBgColor,
  ringColor,
  borderColor,
  hoverBorderColor,
  bgLightColor,
  sections,
  sectionLabel,
}: VocabTestLayoutProps) {
  const [showSectionModal, setShowSectionModal] = useState(false)
  const [showTopicModal, setShowTopicModal] = useState(false)
  const [selectedSection, setSelectedSection] = useState<number | null>(null)
  const [selectedTopics, setSelectedTopics] = useState<Array<string>>([])
  const [testStarted, setTestStarted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [testWords, setTestWords] = useState<Array<VocabWord>>([])
  const [userInput, setUserInput] = useState('')
  const [correctCount, setCorrectCount] = useState(0)
  const [isWrong, setIsWrong] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentTopics =
    selectedSection !== null
      ? sections.find((s) => s.id === selectedSection)?.topics || []
      : []

  useEffect(() => {
    if (testStarted && inputRef.current) {
      inputRef.current.focus()
    }
  }, [testStarted, currentWordIndex])

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId],
    )
  }

  const handleSelectAll = () => {
    if (selectedTopics.length === currentTopics.length) {
      setSelectedTopics([])
    } else {
      setSelectedTopics(currentTopics.map((topic) => topic.id))
    }
  }

  const handleStartTest = () => {
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic!')
      return
    }

    const words: Array<VocabWord> = []
    currentTopics.forEach((topic) => {
      if (selectedTopics.includes(topic.id)) {
        words.push(...topic.words)
      }
    })

    const shuffled = [...words].sort(() => Math.random() - 0.5)
    setTestWords(shuffled)
    setTestStarted(true)
    setShowTopicModal(false)
    setCurrentWordIndex(0)
    setCorrectCount(0)
    setUserInput('')
    setIsWrong(false)
    setTestCompleted(false)
  }

  const normalizeString = (str: string) => {
    return str.toLowerCase().trim()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userInput.trim()) return

    const currentWord = testWords[currentWordIndex]
    const isCorrect =
      normalizeString(userInput) === normalizeString(currentWord.english)

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1)
      setIsWrong(false)
      setUserInput('')

      if (currentWordIndex < testWords.length - 1) {
        setCurrentWordIndex((prev) => prev + 1)
      } else {
        setTestCompleted(true)
      }
    } else {
      setIsWrong(true)
      setUserInput('')
      inputRef.current?.focus()
    }
  }

  const handleRestart = () => {
    setTestStarted(false)
    setShowSectionModal(true)
    setShowTopicModal(false)
    setSelectedSection(null)
    setSelectedTopics([])
    setTestCompleted(false)
    setCurrentWordIndex(0)
    setCorrectCount(0)
    setUserInput('')
    setIsWrong(false)
  }

  const currentWord = testWords[currentWordIndex]

  return (
    <div className={`min-h-screen ${bgGradient} p-4`}>
      <div className="max-w-4xl mx-auto py-8">
        <Link
          to={backRoute}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
        >
          <svg
            className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
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
          {backText}
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-10">
          {!testStarted && !testCompleted ? (
            <div className="text-center">
              <div className="text-7xl mb-6 animate-bounce">{emoji}</div>
              <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
                {title}
              </h1>
              <p className="text-gray-600 mb-12 text-lg">
                Test your vocabulary knowledge
              </p>

              <button
                onClick={() => setShowSectionModal(true)}
                className={`${buttonBgColor} ${buttonHoverBgColor} text-white font-bold px-10 py-5 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform`}
              >
                Start Test
              </button>
            </div>
          ) : testCompleted ? (
            <div className="text-center">
              <div className="text-7xl mb-6 animate-bounce">🎉</div>
              <h2 className="text-5xl font-bold text-gray-800 mb-6 tracking-tight">
                Test Completed!
              </h2>
              <div
                className={`${bgLightColor} rounded-2xl p-8 mb-10 shadow-inner`}
              >
                <p className={`text-4xl font-bold ${accentColor} mb-3`}>
                  {correctCount} / {testWords.length}
                </p>
                <p className="text-gray-600 text-lg mb-2">Correct Answers</p>
                <p className={`text-2xl font-semibold ${accentColor} mt-3`}>
                  {Math.round((correctCount / testWords.length) * 100)}%
                </p>
              </div>
              <button
                onClick={handleRestart}
                className={`${buttonBgColor} ${buttonHoverBgColor} text-white font-bold px-10 py-5 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform`}
              >
                Take Another Test
              </button>
            </div>
          ) : (
            <div>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span className="font-semibold">
                    Question {currentWordIndex + 1} / {testWords.length}
                  </span>
                  <span className={`font-bold ${accentColor}`}>
                    Correct: {correctCount}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div
                    className={`${buttonBgColor} h-3 rounded-full transition-all duration-500 shadow-lg`}
                    style={{
                      width: `${((currentWordIndex + 1) / testWords.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Vietnamese Word */}
              <div className="text-center mb-10">
                <p className="text-gray-600 mb-3 text-lg font-medium">
                  Translate to English:
                </p>
                <h2 className="text-6xl font-bold text-gray-800 mb-6">
                  {currentWord.vietnamese}
                </h2>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value)
                    setIsWrong(false)
                  }}
                  placeholder="Type your answer..."
                  className={`w-full px-6 py-5 text-xl border-2 rounded-xl focus:outline-none focus:ring-4 transition-all shadow-lg ${
                    isWrong
                      ? 'border-red-500 focus:ring-red-300 bg-red-50'
                      : `border-gray-300 ${ringColor}`
                  }`}
                  autoComplete="off"
                />
                {isWrong && (
                  <div className="flex items-center justify-center mt-3 text-red-600">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="font-semibold">
                      Incorrect! Please try again.
                    </span>
                  </div>
                )}
                <p className="text-gray-500 text-sm mt-3 text-center">
                  Press{' '}
                  <kbd className="px-2 py-1 bg-gray-100 rounded">Enter</kbd> to
                  submit
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Section Selection Modal */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full transform transition-all animate-scale-in">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                Select {sectionLabel}
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                Choose which {sectionLabel.toLowerCase()} to practice
              </p>
            </div>

            <div className="p-6 space-y-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setSelectedSection(section.id)
                    setShowSectionModal(false)
                    setShowTopicModal(true)
                    setSelectedTopics([])
                  }}
                  className={`w-full p-6 border-2 border-gray-200 rounded-2xl ${hoverBorderColor} hover:${bgLightColor} transition-all text-left group hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`text-2xl font-bold text-gray-800 group-hover:${accentColor}`}
                      >
                        {sectionLabel} {section.id}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 font-medium">
                        {section.description}
                      </p>
                    </div>
                    <div className="text-4xl transition-transform group-hover:scale-125">
                      {section.emoji}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowSectionModal(false)}
                className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Topic Selection Modal */}
      {showTopicModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                  Select Topics
                </h2>
                <button
                  onClick={() => {
                    setShowTopicModal(false)
                    setShowSectionModal(true)
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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
                </button>
              </div>
              <p className="text-gray-600 text-lg">
                {sectionLabel} {selectedSection} - Choose one or more topics to
                test
              </p>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <button
                onClick={handleSelectAll}
                className={`w-full mb-6 px-4 py-4 border-2 ${borderColor} ${accentColor} font-bold rounded-xl hover:${bgLightColor} transition-all shadow-md hover:shadow-lg`}
              >
                {selectedTopics.length === currentTopics.length
                  ? 'Deselect All'
                  : 'Select All'}
              </button>

              <div className="space-y-4">
                {currentTopics.map((topic) => (
                  <label
                    key={topic.id}
                    className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-md ${
                      selectedTopics.includes(topic.id)
                        ? `${borderColor} ${bgLightColor} shadow-lg`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTopics.includes(topic.id)}
                      onChange={() => handleTopicToggle(topic.id)}
                      className={`w-6 h-6 rounded focus:ring-4 ${ringColor}`}
                      style={{
                        accentColor: buttonBgColor.includes('purple')
                          ? '#7c3aed'
                          : '#2563eb',
                      }}
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-bold text-gray-800 text-lg">
                        {topic.name}
                      </p>
                      <p className={`text-sm ${accentColor} font-semibold`}>
                        {topic.words.length} words
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-4">
              <button
                onClick={() => {
                  setShowTopicModal(false)
                  setShowSectionModal(true)
                }}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleStartTest}
                className={`flex-1 px-6 py-4 ${buttonBgColor} ${buttonHoverBgColor} text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl`}
              >
                Start Test ({selectedTopics.length}{' '}
                {selectedTopics.length === 1 ? 'topic' : 'topics'})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
