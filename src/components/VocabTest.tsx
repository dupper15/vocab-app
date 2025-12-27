import { Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import type { VocabWord } from '../data/vocabulary'

type TranslationMode = 'en-vi' | 'vi-en'

interface VocabTestProps {
  cambridgeNum: string
  testNum: string
  type: 'listening' | 'reading'
  gradientColors: string
  primaryColor: string
  emoji: string
  backPath: string
  dataPath: string
}

export default function VocabTest({
  cambridgeNum,
  testNum,
  type,
  gradientColors,
  primaryColor,
  emoji,
  backPath,
  dataPath,
}: VocabTestProps) {
  const [showModeModal, setShowModeModal] = useState(false)
  const [selectedMode, setSelectedMode] = useState<TranslationMode | null>(null)
  const [testStarted, setTestStarted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [testWords, setTestWords] = useState<VocabWord[]>([])
  const [userInput, setUserInput] = useState('')
  const [correctCount, setCorrectCount] = useState(0)
  const [isWrong, setIsWrong] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (testStarted && inputRef.current) {
      inputRef.current.focus()
    }
  }, [testStarted, currentWordIndex])

  const loadVocabulary = async (mode: TranslationMode) => {
    try {
      const vocabModule = await import(`../data/${dataPath}`)
      const words = vocabModule[`test${testNum}Vocab`] || []

      const shuffled = [...words].sort(() => Math.random() - 0.5)
      setTestWords(shuffled)
      setSelectedMode(mode)
      setTestStarted(true)
      setShowModeModal(false)
      setCurrentWordIndex(0)
      setCorrectCount(0)
      setUserInput('')
      setIsWrong(false)
      setTestCompleted(false)
    } catch (error) {
      console.error('Error loading vocabulary:', error)
      alert('Không tìm thấy vocabulary cho test này!')
    }
  }

  const normalizeString = (str: string) => {
    return str.toLowerCase().trim()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userInput.trim() || !selectedMode) return

    const currentWord = testWords[currentWordIndex]
    const correctAnswer =
      selectedMode === 'en-vi' ? currentWord.vietnamese : currentWord.english
    const isCorrect =
      normalizeString(userInput) === normalizeString(correctAnswer)

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
    setShowModeModal(true)
    setSelectedMode(null)
    setTestCompleted(false)
    setCurrentWordIndex(0)
    setCorrectCount(0)
    setUserInput('')
    setIsWrong(false)
  }

  const currentWord = testWords[currentWordIndex]
  const questionText =
    selectedMode === 'en-vi' ? currentWord?.english : currentWord?.vietnamese

  const typeName = type === 'listening' ? 'Listening' : 'Reading'

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
          to={backPath}
          className="inline-flex items-center text-white font-bold text-lg hover:scale-110 transition-transform mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30"
        >
          ← Back to Cambridge {cambridgeNum}
        </Link>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 animate-fade-in">
          {!testStarted && !testCompleted ? (
            <div className="text-center">
              <div className="text-7xl mb-4 animate-bounce">{emoji}</div>
              <h1
                className="text-5xl font-bold mb-4"
                style={{ color: primaryColor }}
              >
                Cambridge {cambridgeNum}
              </h1>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">
                Test {testNum}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                IELTS {typeName} Vocabulary Practice ✨
              </p>

              <button
                onClick={() => setShowModeModal(true)}
                className="font-bold px-10 py-5 rounded-2xl text-xl transition-all shadow-lg hover:shadow-2xl hover:scale-110 text-white"
                style={{ background: primaryColor }}
              >
                🚀 Start Practice
              </button>
            </div>
          ) : testCompleted ? (
            <div className="text-center">
              <div className="text-8xl mb-6 animate-bounce">🎉</div>
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                Test Completed! 🌟
              </h2>
              <div
                className="rounded-3xl p-8 mb-8 shadow-lg"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <p
                  className="text-5xl font-bold mb-3"
                  style={{ color: primaryColor }}
                >
                  {correctCount} / {testWords.length}
                </p>
                <p className="text-gray-600 text-lg mb-3">Correct Answers</p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: primaryColor }}
                >
                  {Math.round((correctCount / testWords.length) * 100)}%
                </p>
              </div>
              <button
                onClick={handleRestart}
                className="font-bold px-10 py-5 rounded-2xl text-xl transition-all shadow-lg hover:shadow-2xl hover:scale-110 text-white"
                style={{ background: primaryColor }}
              >
                🔄 Take Another Test
              </button>
            </div>
          ) : (
            <div>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span className="font-semibold text-lg">
                    Question {currentWordIndex + 1} / {testWords.length}
                  </span>
                  <span
                    className="font-bold text-lg"
                    style={{ color: primaryColor }}
                  >
                    ✅ Correct: {correctCount}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${((currentWordIndex + 1) / testWords.length) * 100}%`,
                      background: primaryColor,
                    }}
                  />
                </div>
              </div>

              {/* Mode Badge */}
              <div className="text-center mb-6">
                <span
                  className="inline-block px-6 py-3 rounded-full text-base font-bold text-white shadow-lg"
                  style={{ background: primaryColor }}
                >
                  Mode:{' '}
                  {selectedMode === 'en-vi'
                    ? '🇬🇧 English → 🇻🇳 Tiếng Việt'
                    : '🇻🇳 Tiếng Việt → 🇬🇧 English'}
                </span>
              </div>

              {/* Question Word */}
              <div className="text-center mb-10">
                <p className="text-gray-600 mb-3 text-lg font-medium">
                  {selectedMode === 'en-vi'
                    ? '📝 Translate to Vietnamese:'
                    : '📝 Translate to English:'}
                </p>
                <h2
                  className="text-6xl font-bold mb-6"
                  style={{ color: primaryColor }}
                >
                  {questionText}
                </h2>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value)
                    setIsWrong(false)
                  }}
                  placeholder="Type your answer..."
                  className={`w-full px-8 py-5 text-2xl border-3 rounded-2xl focus:outline-none focus:ring-4 transition-all shadow-lg ${
                    isWrong
                      ? 'border-red-500 focus:ring-red-300 bg-red-50 shake'
                      : 'border-gray-300 focus:ring-opacity-50'
                  }`}
                  style={
                    !isWrong
                      ? { focusRingColor: `${primaryColor}50` }
                      : undefined
                  }
                  autoComplete="off"
                />
                {isWrong && (
                  <p className="text-red-600 font-semibold text-base mt-3 animate-fade-in">
                    ❌ Incorrect! Please try again.
                  </p>
                )}
                <p className="text-gray-500 text-base mt-3 text-center font-medium">
                  Press{' '}
                  <kbd className="px-2 py-1 bg-gray-200 rounded">Enter</kbd> to
                  submit
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Mode Selection Modal */}
      {showModeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full animate-fade-in">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800">
                Select Mode 🎯
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                Choose translation direction
              </p>
            </div>

            <div className="p-6 space-y-4">
              <button
                onClick={() => loadVocabulary('en-vi')}
                className="w-full p-6 border-3 border-gray-200 rounded-2xl hover:shadow-xl transition-all text-left group hover:scale-105"
                style={{
                  borderColor: `${primaryColor}00`,
                  ':hover': { borderColor: primaryColor },
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = primaryColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = '#e5e7eb')
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className="text-2xl font-bold text-gray-800"
                      style={{ color: primaryColor }}
                    >
                      English → Tiếng Việt
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Translate English words to Vietnamese
                    </p>
                  </div>
                  <div className="text-4xl">🇬🇧 → 🇻🇳</div>
                </div>
              </button>

              <button
                onClick={() => loadVocabulary('vi-en')}
                className="w-full p-6 border-3 border-gray-200 rounded-2xl hover:shadow-xl transition-all text-left group hover:scale-105"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = primaryColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = '#e5e7eb')
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className="text-2xl font-bold text-gray-800"
                      style={{ color: primaryColor }}
                    >
                      Tiếng Việt → English
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Translate Vietnamese words to English
                    </p>
                  </div>
                  <div className="text-4xl">🇻🇳 → 🇬🇧</div>
                </div>
              </button>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModeModal(false)}
                className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-all text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
