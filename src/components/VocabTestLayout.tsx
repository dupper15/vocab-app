import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { VocabTopic, VocabWord } from '../data/vocabulary'

interface VocabTestLayoutProps {
  backRoute: string
  backText: string
  title: string
  emoji: string
  gradientColors: string
  primaryColor: string
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
  gradientColors,
  primaryColor,
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
  const [unknownWords, setUnknownWords] = useState<Array<VocabWord>>([])
  const [isPracticingUnknown, setIsPracticingUnknown] = useState(false)
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
    setUnknownWords([])
    setIsPracticingUnknown(false)
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

  const handleSkip = () => {
    setCorrectCount((prev) => prev + 1)
    setIsWrong(false)
    setUserInput('')

    if (currentWordIndex < testWords.length - 1) {
      setCurrentWordIndex((prev) => prev + 1)
    } else {
      setTestCompleted(true)
    }
  }

  const handleMarkAsUnknown = () => {
    const currentWord = testWords[currentWordIndex]
    if (!unknownWords.find((w) => w.english === currentWord.english)) {
      setUnknownWords((prev) => [...prev, currentWord])
    }
    setIsWrong(false)
    setUserInput('')

    if (currentWordIndex < testWords.length - 1) {
      setCurrentWordIndex((prev) => prev + 1)
    } else {
      setTestCompleted(true)
    }
  }

  const handlePracticeUnknown = () => {
    const shuffled = [...unknownWords].sort(() => Math.random() - 0.5)
    setTestWords(shuffled)
    setTestStarted(true)
    setTestCompleted(false)
    setCurrentWordIndex(0)
    setCorrectCount(0)
    setUserInput('')
    setIsWrong(false)
    setIsPracticingUnknown(true)
  }

  const handleFinishUnknownPractice = () => {
    setTestStarted(false)
    setTestCompleted(false)
    setShowSectionModal(true)
    setShowTopicModal(false)
    setSelectedSection(null)
    setSelectedTopics([])
    setUnknownWords([])
    setIsPracticingUnknown(false)
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
          to={backRoute}
          className="inline-flex items-center text-white font-bold text-lg hover:scale-110 transition-transform mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30"
        >
          ← {backText}
        </Link>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 transform hover:scale-[1.01] transition-all duration-300">
          {!testStarted && !testCompleted ? (
            <div className="text-center">
              <div className="text-7xl mb-6 animate-bounce">{emoji}</div>
              <h1
                className="text-5xl font-bold mb-4 tracking-tight drop-shadow-sm"
                style={{ color: primaryColor }}
              >
                {title}
              </h1>
              <p className="text-gray-600 mb-12 text-lg font-medium">
                Test your vocabulary knowledge
              </p>

              <button
                onClick={() => setShowSectionModal(true)}
                className="text-white font-bold px-10 py-5 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl hover:scale-110 transform"
                style={{ backgroundColor: primaryColor }}
              >
                🚀 Start Test
              </button>
            </div>
          ) : testCompleted ? (
            <div className="text-center">
              <div className="text-7xl mb-6 animate-bounce">🎉</div>
              <h2
                className="text-5xl font-bold mb-6 tracking-tight drop-shadow-sm"
                style={{ color: primaryColor }}
              >
                Test Completed!
              </h2>
              <div
                className="rounded-2xl p-8 mb-10 shadow-inner"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <p
                  className="text-4xl font-bold mb-3"
                  style={{ color: primaryColor }}
                >
                  {correctCount} / {testWords.length}
                </p>
                <p className="text-gray-600 text-lg mb-2">Correct Answers</p>
                <p
                  className="text-2xl font-semibold mt-3"
                  style={{ color: primaryColor }}
                >
                  {Math.round((correctCount / testWords.length) * 100)}%
                </p>
                {unknownWords.length > 0 && !isPracticingUnknown && (
                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <p className="text-gray-700 text-lg mb-2 font-semibold">
                      📚 Words to Review: {unknownWords.length}
                    </p>
                  </div>
                )}
              </div>
              {isPracticingUnknown ? (
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handlePracticeUnknown}
                    className="text-white font-bold px-10 py-5 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl hover:scale-110 transform"
                    style={{ backgroundColor: primaryColor }}
                  >
                    🔄 Practice Again
                  </button>
                  <button
                    onClick={handleFinishUnknownPractice}
                    className="text-white font-bold px-10 py-5 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl hover:scale-110 transform bg-green-600 hover:bg-green-700"
                  >
                    ✅ Finish
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 justify-center">
                  {unknownWords.length > 0 && (
                    <button
                      onClick={handlePracticeUnknown}
                      className="text-white font-bold px-10 py-5 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl hover:scale-110 transform bg-orange-600 hover:bg-orange-700"
                    >
                      📚 Practice Unknown Words
                    </button>
                  )}
                  <button
                    onClick={handleRestart}
                    className="text-white font-bold px-10 py-5 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl hover:scale-110 transform"
                    style={{ backgroundColor: primaryColor }}
                  >
                    🔄 Take Another Test
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span className="font-semibold">
                    📝 Question {currentWordIndex + 1} / {testWords.length}
                  </span>
                  <span
                    className="font-bold px-3 py-1 rounded-full"
                    style={{
                      color: primaryColor,
                      backgroundColor: `${primaryColor}20`,
                    }}
                  >
                    ✅ Correct: {correctCount}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                  <div
                    className="h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{
                      width: `${((currentWordIndex + 1) / testWords.length) * 100}%`,
                      backgroundColor: primaryColor,
                    }}
                  />
                </div>
              </div>

              {/* Vietnamese Word */}
              <div className="text-center mb-10">
                <p className="text-gray-600 mb-3 text-lg font-semibold">
                  🇻🇳 Translate to English:
                </p>
                <h2
                  className="text-6xl font-bold mb-6 drop-shadow-sm"
                  style={{ color: primaryColor }}
                >
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
                      : 'border-gray-300'
                  }`}
                  style={{
                    outlineColor: isWrong ? undefined : primaryColor,
                    borderColor: isWrong
                      ? undefined
                      : userInput
                        ? primaryColor
                        : undefined,
                  }}
                  autoComplete="off"
                />
                {isWrong && (
                  <div className="flex items-center justify-center mt-3 text-red-600 animate-pulse">
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
                      ❌ Incorrect! Please try again.
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <p className="text-gray-500 text-sm text-center">
                    Press{' '}
                    <kbd
                      className="px-3 py-1 rounded font-mono font-bold"
                      style={{
                        backgroundColor: `${primaryColor}20`,
                        color: primaryColor,
                      }}
                    >
                      Enter ⏎
                    </kbd>{' '}
                    to submit
                  </p>
                  <span className="text-gray-400">|</span>
                  <button
                    type="button"
                    onClick={handleMarkAsUnknown}
                    className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 shadow-md bg-orange-100 text-orange-600 hover:bg-orange-200"
                  >
                    📚 Don't Know
                  </button>
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 shadow-md"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor,
                    }}
                  >
                    ⏭️ Skip
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Section Selection Modal */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-lg w-full transform transition-all animate-scale-in">
            <div className="p-8 border-b border-gray-200">
              <h2
                className="text-3xl font-bold tracking-tight drop-shadow-sm"
                style={{ color: primaryColor }}
              >
                Select {sectionLabel}
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                Choose which {sectionLabel.toLowerCase()} to practice
              </p>
            </div>

            <div className="p-6 space-y-4">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setSelectedSection(section.id)
                    setShowSectionModal(false)
                    setShowTopicModal(true)
                    setSelectedTopics([])
                  }}
                  className="w-full p-6 border-2 rounded-2xl transition-all text-left group hover:shadow-xl transform hover:scale-105"
                  style={{
                    borderColor: `${primaryColor}40`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className="text-2xl font-bold transition-colors"
                        style={{ color: primaryColor }}
                      >
                        {sectionLabel} {section.id}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 font-medium">
                        {section.description}
                      </p>
                    </div>
                    <div className="text-4xl transition-transform group-hover:scale-125 group-hover:rotate-12">
                      {section.emoji}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowSectionModal(false)}
                className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all hover:scale-105"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Topic Selection Modal */}
      {showTopicModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2
                  className="text-3xl font-bold tracking-tight drop-shadow-sm"
                  style={{ color: primaryColor }}
                >
                  Select Topics
                </h2>
                <button
                  onClick={() => {
                    setShowTopicModal(false)
                    setShowSectionModal(true)
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-all hover:scale-110"
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
                className="w-full mb-6 px-4 py-4 border-2 font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105"
                style={{
                  borderColor: primaryColor,
                  color: primaryColor,
                  backgroundColor: `${primaryColor}10`,
                }}
              >
                {selectedTopics.length === currentTopics.length
                  ? '❌ Deselect All'
                  : '✅ Select All'}
              </button>

              <div className="space-y-4">
                {currentTopics.map((topic, index) => (
                  <label
                    key={topic.id}
                    className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] ${
                      selectedTopics.includes(topic.id)
                        ? 'shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{
                      borderColor: selectedTopics.includes(topic.id)
                        ? primaryColor
                        : undefined,
                      backgroundColor: selectedTopics.includes(topic.id)
                        ? `${primaryColor}15`
                        : undefined,
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTopics.includes(topic.id)}
                      onChange={() => handleTopicToggle(topic.id)}
                      className="w-6 h-6 rounded focus:ring-4"
                      style={{
                        accentColor: primaryColor,
                      }}
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-bold text-gray-800 text-lg">
                        {topic.name}
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: primaryColor }}
                      >
                        📝 {topic.words.length} words
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
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all hover:scale-105"
              >
                ⬅️ Back
              </button>
              <button
                onClick={handleStartTest}
                className="flex-1 px-6 py-4 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                🚀 Start Test ({selectedTopics.length}{' '}
                {selectedTopics.length === 1 ? 'topic' : 'topics'})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
