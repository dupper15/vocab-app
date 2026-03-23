import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { VocabWord } from '../../data/vocabulary'
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake'
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts'

if (pdfMake.vfs === undefined) {
  pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs
}

type TranslationMode = 'en-vi' | 'vi-en'

interface VocabTestProps {
  cambridgeNum: string
  testNum: string
  type: 'listening' | 'reading'
  gradientColors: string
  primaryColor: string
  emoji: string
  backPath: string
  words: Array<VocabWord>
}

export default function VocabTest({
  cambridgeNum,
  testNum,
  type,
  gradientColors,
  primaryColor,
  emoji,
  backPath,
  words,
}: VocabTestProps) {
  const [showModeModal, setShowModeModal] = useState(false)
  const [selectedMode, setSelectedMode] = useState<TranslationMode | null>(null)
  const [testStarted, setTestStarted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [testWords, setTestWords] = useState<Array<VocabWord>>([])
  const [userInput, setUserInput] = useState('')
  const [correctCount, setCorrectCount] = useState(0)
  const [isWrong, setIsWrong] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [showVocabList, setShowVocabList] = useState(false)
  const [unknownWords, setUnknownWords] = useState<Array<VocabWord>>([])
  const [isPracticingUnknown, setIsPracticingUnknown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (testStarted && inputRef.current) {
      inputRef.current.focus()
    }
  }, [testStarted, currentWordIndex])

  const loadVocabulary = async (mode: TranslationMode) => {
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
    setUnknownWords([])
    setIsPracticingUnknown(false)
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
    setShowModeModal(true)
    setSelectedMode(null)
    setUnknownWords([])
    setIsPracticingUnknown(false)
  }

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  const exportToPDF = () => {
    try {
      const typeName = type === 'listening' ? 'Listening' : 'Reading'

      // Prepare table body
      const tableBody = words.map((word) => [
        { text: word.english, bold: true },
        word.vietnamese,
      ])

      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
          {
            text: `Cambridge ${cambridgeNum} - Test ${testNum}`,
            style: 'header',
            alignment: 'center',
            margin: [0, 0, 0, 10],
          },
          {
            text: `IELTS ${typeName} Vocabulary (${words.length} words)`,
            style: 'subheader',
            alignment: 'center',
            margin: [0, 0, 0, 20],
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*'],
              body: [
                [
                  { text: 'English', style: 'tableHeader' },
                  { text: 'Vietnamese', style: 'tableHeader' },
                ],
                ...tableBody,
              ],
            },
            layout: {
              fillColor: function (rowIndex: number) {
                return rowIndex === 0
                  ? '#666666'
                  : rowIndex % 2 === 0
                    ? '#f5f5f5'
                    : null
              },
              hLineWidth: function () {
                return 1
              },
              vLineWidth: function () {
                return 1
              },
              hLineColor: function () {
                return '#cccccc'
              },
              vLineColor: function () {
                return '#cccccc'
              },
              paddingTop: function () {
                return 8
              },
              paddingBottom: function () {
                return 8
              },
              paddingLeft: function () {
                return 8
              },
              paddingRight: function () {
                return 8
              },
            },
          },
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            color: '#333333',
          },
          subheader: {
            fontSize: 12,
            color: '#666666',
          },
          tableHeader: {
            bold: true,
            fontSize: 11,
            color: 'white',
            fillColor: '#666666',
          },
        },
        defaultStyle: {
          font: 'Roboto',
          fontSize: 10,
        },
      }

      const date = new Date().toISOString().split('T')[0]
      pdfMake
        .createPdf(docDefinition)
        .download(`vocabulary-cam${cambridgeNum}-test${testNum}-${date}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const currentWord = testWords[currentWordIndex]
  const questionText =
    currentWord && selectedMode === 'en-vi'
      ? currentWord.english
      : currentWord?.vietnamese

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

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowVocabList(true)}
                  className="font-bold px-10 py-5 rounded-2xl text-xl transition-all shadow-lg hover:shadow-2xl hover:scale-110 bg-gray-700 text-white hover:bg-gray-800"
                >
                  📖 View Vocabulary
                </button>
                <button
                  onClick={() => setShowModeModal(true)}
                  className="font-bold px-10 py-5 rounded-2xl text-xl transition-all shadow-lg hover:shadow-2xl hover:scale-110 text-white"
                  style={{ background: primaryColor }}
                >
                  🚀 Start Practice
                </button>
              </div>
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
                    className="font-bold px-10 py-5 rounded-2xl text-xl transition-all shadow-lg hover:shadow-2xl hover:scale-110 text-white"
                    style={{ background: primaryColor }}
                  >
                    🔄 Practice Again
                  </button>
                  <button
                    onClick={handleFinishUnknownPractice}
                    className="font-bold px-10 py-5 rounded-2xl text-xl transition-all shadow-lg hover:shadow-2xl hover:scale-110 bg-green-600 text-white hover:bg-green-700"
                  >
                    ✅ Finish
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 justify-center">
                  {unknownWords.length > 0 && (
                    <button
                      onClick={handlePracticeUnknown}
                      className="font-bold px-10 py-5 rounded-2xl text-xl transition-all shadow-lg hover:shadow-2xl hover:scale-110 bg-orange-600 text-white hover:bg-orange-700"
                    >
                      📚 Practice Unknown Words
                    </button>
                  )}
                  <button
                    onClick={handleRestart}
                    className="font-bold px-10 py-5 rounded-2xl text-xl transition-all shadow-lg hover:shadow-2xl hover:scale-110 text-white"
                    style={{ background: primaryColor }}
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
                      ? ({
                          '--tw-ring-color': `${primaryColor}50`,
                        } as React.CSSProperties)
                      : undefined
                  }
                  autoComplete="off"
                />
                {isWrong && (
                  <p className="text-red-600 font-semibold text-base mt-3 animate-fade-in">
                    ❌ Incorrect! Please try again.
                  </p>
                )}
                <div className="flex items-center justify-center gap-4 mt-3">
                  <p className="text-gray-500 text-base text-center font-medium">
                    Press{' '}
                    <kbd className="px-2 py-1 bg-gray-200 rounded">Enter</kbd>{' '}
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = primaryColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = '#e5e7eb')
                }
              >
                <div className="flex items-center justify-between flex-col">
                  <h3
                    className="text-2xl font-bold text-gray-800"
                    style={{ color: primaryColor }}
                  >
                    English → Tiếng Việt
                  </h3>
                  <div className="text-4xl">🇬🇧 → 🇻🇳</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Translate English words to Vietnamese
                  </p>
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
                <div className="flex items-center justify-between flex-col">
                  <h3
                    className="text-2xl font-bold text-gray-800"
                    style={{ color: primaryColor }}
                  >
                    Tiếng Việt → English
                  </h3>

                  <div className="text-4xl">🇻🇳 → 🇬🇧</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Translate Vietnamese words to English
                  </p>
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

      {/* Vocabulary List Modal */}
      {showVocabList && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8 animate-fade-in">
            <div className="p-8 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl z-10">
              <h2 className="text-3xl font-bold text-gray-800">
                📖 Vocabulary List
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                Cambridge {cambridgeNum} - Test {testNum} ({words.length} words)
              </p>
            </div>

            <div
              className="p-6 max-h-[60vh] overflow-y-auto"
              id="vocab-pdf-content"
            >
              {/* Hidden header for PDF */}
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  Cambridge {cambridgeNum} - Test {testNum}
                </h1>
                <p className="text-gray-600 mt-1">
                  IELTS {type === 'listening' ? 'Listening' : 'Reading'}{' '}
                  Vocabulary ({words.length} words)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {words.map((word, idx) => (
                  <div
                    key={idx}
                    className="p-5 border-2 rounded-2xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 transform hover:scale-[1.02]"
                    style={{
                      borderColor: `${primaryColor}40`,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col space-y-2 flex-1">
                        <div
                          className="text-xl font-bold"
                          style={{ color: primaryColor }}
                        >
                          {word.english}
                        </div>
                        <div className="text-lg font-bold text-gray-800">
                          {word.vietnamese}
                        </div>
                      </div>
                      <button
                        onClick={() => speakWord(word.english)}
                        className="ml-3 p-2 rounded-full hover:bg-gray-200 transition-all duration-200 transform hover:scale-110 active:scale-95"
                        style={{
                          color: primaryColor,
                        }}
                        title="Phát âm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                          <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-3xl">
              <div className="flex gap-4">
                <button
                  onClick={exportToPDF}
                  className="flex-1 px-6 py-4 font-bold rounded-2xl text-lg transition-all hover:scale-105 bg-red-600 text-white hover:bg-red-700"
                >
                  📄 Export PDF
                </button>
                <button
                  onClick={() => setShowVocabList(false)}
                  className="flex-1 px-6 py-4 font-bold rounded-2xl text-lg transition-all hover:scale-105 text-white"
                  style={{ background: primaryColor }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
