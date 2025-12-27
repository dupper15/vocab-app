import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { VocabTopic, VocabWord } from '../data/vocabulary'
import { task1Topics } from '../data/writing/task1'
import { task2Topics } from '../data/writing/task2'

export const Route = createFileRoute('/writing-vocab_/view')({
  component: WritingVocabView,
})

type Task = 1 | 2

function WritingVocabView() {
  const [selectedTask, setSelectedTask] = useState<Task>(1)
  const [topicName, setTopicName] = useState('')
  const [wordsText, setWordsText] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const getCurrentTopics = (task: Task): VocabTopic[] => {
    switch (task) {
      case 1:
        return task1Topics
      case 2:
        return task2Topics
    }
  }

  const generateId = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!topicName.trim() || !wordsText.trim()) {
      alert('Please fill in all fields!')
      return
    }

    try {
      const wordsArray: VocabWord[] = JSON.parse(wordsText)

      if (
        !Array.isArray(wordsArray) ||
        !wordsArray.every(
          (w) =>
            typeof w.vietnamese === 'string' && typeof w.english === 'string',
        )
      ) {
        alert(
          'Invalid format! Please use: [{"vietnamese": "từ", "english": "word"}]',
        )
        return
      }

      const newTopic: VocabTopic = {
        id: generateId(topicName),
        name: topicName.trim(),
        words: wordsArray,
      }

      const currentTopics = getCurrentTopics(selectedTask)
      const updatedTopics = [...currentTopics, newTopic]

      const fileContent = `import type { VocabTopic } from '../vocabulary'

export const task${selectedTask}Topics: VocabTopic[] = ${JSON.stringify(updatedTopics, null, 2)}
`

      console.log('Copy this code to task' + selectedTask + '.ts:')
      console.log(fileContent)

      const resultTextarea = document.createElement('textarea')
      resultTextarea.value = fileContent
      resultTextarea.style.position = 'fixed'
      resultTextarea.style.top = '50%'
      resultTextarea.style.left = '50%'
      resultTextarea.style.transform = 'translate(-50%, -50%)'
      resultTextarea.style.width = '80%'
      resultTextarea.style.height = '80%'
      resultTextarea.style.zIndex = '9999'
      resultTextarea.style.padding = '20px'
      resultTextarea.style.fontSize = '14px'
      resultTextarea.style.fontFamily = 'monospace'
      document.body.appendChild(resultTextarea)
      resultTextarea.select()

      const closeBtn = document.createElement('button')
      closeBtn.textContent =
        'Close (Copy và paste vào file task' + selectedTask + '.ts)'
      closeBtn.style.position = 'fixed'
      closeBtn.style.top = '10px'
      closeBtn.style.left = '50%'
      closeBtn.style.transform = 'translateX(-50%)'
      closeBtn.style.zIndex = '10000'
      closeBtn.style.padding = '10px 20px'
      closeBtn.style.backgroundColor = '#2563eb'
      closeBtn.style.color = 'white'
      closeBtn.style.border = 'none'
      closeBtn.style.borderRadius = '8px'
      closeBtn.style.cursor = 'pointer'
      closeBtn.onclick = () => {
        document.body.removeChild(resultTextarea)
        document.body.removeChild(closeBtn)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }
      document.body.appendChild(closeBtn)

      setTopicName('')
      setWordsText('')
    } catch (error) {
      alert('Error parsing words! Please check JSON format.')
      console.error(error)
    }
  }

  const exampleFormat = JSON.stringify(
    [
      { vietnamese: 'ví dụ', english: 'example' },
      { vietnamese: 'từ vựng', english: 'vocabulary' },
    ],
    null,
    2,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <Link
          to="/writing-vocab"
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
          Back to Writing Vocab
        </Link>

        {showSuccess && (
          <div className="mb-6 bg-green-50 border-2 border-green-400 text-green-800 px-6 py-4 rounded-xl shadow-lg flex items-center animate-pulse">
            <svg
              className="w-6 h-6 mr-3 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold">
              Topic generated! Copy the code and paste it into the task file.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form thêm topic */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">➕</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
                Add New Topic
              </h1>
              <p className="text-gray-600 text-lg">
                Add vocabulary to writing tasks
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Chọn Task */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Task
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2].map((task) => (
                    <button
                      key={task}
                      type="button"
                      onClick={() => setSelectedTask(task as Task)}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        selectedTask === task
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Task {task}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Topic Name
                </label>
                <input
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="e.g., Graph Description, Comparison"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {topicName && (
                  <p className="text-sm text-gray-500 mt-1">
                    ID will be:{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {generateId(topicName)}
                    </code>
                  </p>
                )}
              </div>

              {/* Words Array */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Words (JSON Array)
                </label>
                <textarea
                  value={wordsText}
                  onChange={(e) => setWordsText(e.target.value)}
                  placeholder={`Paste array here:\n${exampleFormat}`}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  rows={12}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Generate Code
              </button>
            </form>
          </div>

          {/* Danh sách topics hiện tại */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
                Current Topics
              </h2>
              <p className="text-gray-600 text-lg font-semibold">
                Task {selectedTask}
              </p>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {getCurrentTopics(selectedTask).map((topic) => (
                <div
                  key={topic.id}
                  className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-white to-blue-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{topic.name}</h3>
                      <p className="text-sm text-gray-500 font-mono">
                        id: {topic.id}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        {topic.words.length} words
                      </p>
                    </div>
                  </div>
                  <details className="mt-3">
                    <summary className="text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                      View words
                    </summary>
                    <div className="mt-2 space-y-1 text-sm">
                      {topic.words.map((word, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between bg-gray-50 px-3 py-1 rounded"
                        >
                          <span className="text-gray-700">
                            {word.vietnamese}
                          </span>
                          <span className="text-blue-600 font-medium">
                            {word.english}
                          </span>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
