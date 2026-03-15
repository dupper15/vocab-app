import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import type { VocabTopic } from '../data/vocabulary'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableCell,
  TableRow,
  WidthType,
  AlignmentType,
} from 'docx'
import { saveAs } from 'file-saver'

type VocabViewLayoutProps<T extends number> = {
  backTo: string
  backToLabel: string
  title: string
  sectionLabel: string
  sections: Array<T>
  sectionName: (section: T) => string
  getCurrentTopics: (section: T) => Array<VocabTopic>
  primaryColor: string
  gradientColors: string
  emoji: string
}

export function VocabViewLayout<T extends number>({
  backTo,
  backToLabel,
  title,
  sectionLabel,
  sections,
  sectionName,
  getCurrentTopics,
  primaryColor,
  gradientColors,
  emoji,
}: VocabViewLayoutProps<T>) {
  const [selectedSection, setSelectedSection] = useState<T>(sections[0])
  const [selectedTopic, setSelectedTopic] = useState<VocabTopic | null>(null)
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set())

  const currentTopics = getCurrentTopics(selectedSection)

  // Toggle topic selection
  const toggleTopicSelection = (topicId: string) => {
    setSelectedTopics((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(topicId)) {
        newSet.delete(topicId)
      } else {
        newSet.add(topicId)
      }
      return newSet
    })
  }

  // Select all topics in current part
  const selectAllInPart = () => {
    setSelectedTopics((prev) => {
      const newSet = new Set(prev)
      currentTopics.forEach((topic) => newSet.add(topic.id))
      return newSet
    })
  }

  // Deselect all topics in current part
  const deselectAllInPart = () => {
    setSelectedTopics((prev) => {
      const newSet = new Set(prev)
      currentTopics.forEach((topic) => newSet.delete(topic.id))
      return newSet
    })
  }

  // Export to Word
  const exportToWord = async () => {
    if (selectedTopics.size === 0) {
      alert('Vui lòng chọn ít nhất một topic để xuất file Word')
      return
    }

    // Collect all selected topics from all parts
    const allSelectedTopics: Array<{ part: T; topic: VocabTopic }> = []
    sections.forEach((section) => {
      const topics = getCurrentTopics(section)
      topics.forEach((topic) => {
        if (selectedTopics.has(topic.id)) {
          allSelectedTopics.push({ part: section, topic })
        }
      })
    })

    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: title,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            ...allSelectedTopics.flatMap(({ part, topic }) => [
              new Paragraph({
                text: `${sectionName(part)} - ${topic.name}`,
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 200 },
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            text: 'Tiếng Việt',
                            bold: true,
                          }),
                        ],
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        margins: {
                          top: 150,
                          bottom: 150,
                          left: 150,
                          right: 150,
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text: 'English',
                            bold: true,
                          }),
                        ],
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        margins: {
                          top: 150,
                          bottom: 150,
                          left: 150,
                          right: 150,
                        },
                      }),
                    ],
                  }),
                  ...topic.words.map(
                    (word) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph(word.vietnamese)],
                            margins: {
                              top: 150,
                              bottom: 150,
                              left: 150,
                              right: 150,
                            },
                          }),
                          new TableCell({
                            children: [new Paragraph(word.english)],
                            margins: {
                              top: 150,
                              bottom: 150,
                              left: 150,
                              right: 150,
                            },
                          }),
                        ],
                      }),
                  ),
                ],
              }),
              new Paragraph({
                text: '',
                spacing: { after: 200 },
              }),
            ]),
          ],
        },
      ],
    })

    // Generate and download
    const blob = await Packer.toBlob(doc)
    const date = new Date().toISOString().split('T')[0]
    saveAs(blob, `vocabulary-speaking-${date}.docx`)
  }

  // Function to speak English word
  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9 // Slightly slower for learning
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    } else {
      alert('Trình duyệt của bạn không hỗ trợ text-to-speech')
    }
  }

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

      <div className="max-w-7xl mx-auto py-8 relative z-10">
        <Link
          to={backTo}
          className="inline-flex items-center text-white font-bold text-lg hover:scale-110 transition-transform mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30"
        >
          ← {backToLabel}
        </Link>

        <div className="text-center mb-8 animate-fade-in">
          <div className="text-7xl mb-4 animate-bounce">{emoji}</div>
          <h1
            className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
            style={{
              textShadow:
                '2px 2px 4px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.5)',
            }}
          >
            {title}
          </h1>

          {/* Export Button */}
          <div className="mt-6">
            <button
              onClick={exportToWord}
              disabled={selectedTopics.size === 0}
              className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                selectedTopics.size === 0
                  ? 'bg-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-white text-purple-600 hover:shadow-3xl'
              }`}
            >
              📄 Xuất {selectedTopics.size} topic ra Word
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel bên trái - Chọn Part và Topic */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6">
            {/* Chọn Section/Part */}
            <div className="mb-6">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: primaryColor }}
              >
                {sectionLabel}
              </h2>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      setSelectedSection(section)
                      setSelectedTopic(null)
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md text-left ${
                      selectedSection === section
                        ? 'text-white shadow-xl scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={
                      selectedSection === section
                        ? { backgroundColor: primaryColor }
                        : undefined
                    }
                  >
                    {sectionName(section)}
                  </button>
                ))}
              </div>
            </div>

            {/* Chọn Topic */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-xl font-bold"
                  style={{ color: primaryColor }}
                >
                  Topics
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllInPart}
                    className="text-xs px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all"
                  >
                    Chọn tất cả
                  </button>
                  <button
                    onClick={deselectAllInPart}
                    className="text-xs px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                  >
                    Bỏ chọn
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {currentTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md ${
                      selectedTopic?.id === topic.id
                        ? 'text-white shadow-xl scale-[1.02]'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    style={
                      selectedTopic?.id === topic.id
                        ? { backgroundColor: primaryColor }
                        : undefined
                    }
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedTopics.has(topic.id)}
                        onChange={() => toggleTopicSelection(topic.id)}
                        className="mt-1 w-5 h-5 cursor-pointer"
                      />
                      <button
                        onClick={() => setSelectedTopic(topic)}
                        className="flex-1 text-left"
                      >
                        <div className="font-bold">{topic.name}</div>
                        <div className="text-sm opacity-80 mt-1">
                          {topic.words.length} từ
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel bên phải - Hiển thị từ vựng */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">
            {selectedTopic ? (
              <>
                <div className="mb-8">
                  <div
                    className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-3"
                    style={{
                      backgroundColor: `${primaryColor}20`,
                      color: primaryColor,
                    }}
                  >
                    {sectionName(selectedSection)}
                  </div>
                  <h2
                    className="text-4xl font-bold mb-2"
                    style={{ color: primaryColor }}
                  >
                    {selectedTopic.name}
                  </h2>
                  <p className="text-gray-600">
                    Tổng số: {selectedTopic.words.length} từ vựng
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                  {selectedTopic.words.map((word, idx) => (
                    <div
                      key={idx}
                      className="p-5 border-2 rounded-2xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 transform hover:scale-[1.02]"
                      style={{
                        borderColor: `${primaryColor}40`,
                        animationDelay: `${idx * 0.02}s`,
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col space-y-2 flex-1">
                          <div className="text-lg font-bold text-gray-800">
                            {word.vietnamese}
                          </div>
                          <div
                            className="text-xl font-bold"
                            style={{ color: primaryColor }}
                          >
                            {word.english}
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
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="text-8xl mb-6 animate-bounce">📖</div>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">
                  Chọn một topic để học
                </h3>
                <p className="text-gray-400">
                  Hãy chọn {sectionLabel.toLowerCase()} và topic bên trái
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
