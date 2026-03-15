import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import { Home, Menu, X, Copy, Check } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyPrompt = () => {
    const prompt = `đây là ví dụ mẫu, data sẽ có dạng này, tạo cho tôi 1 object như thế này, name là: something interesting on social media, id sẽ là name mà parse dính liền lại { id: 'person', name: 'Describe a Person', words: [ { vietnamese: 'tính cách', english: 'personality' }, { vietnamese: 'ngoại hình', english: 'appearance' }, { vietnamese: 'tốt bụng', english: 'kind' }, { vietnamese: 'hào phóng', english: 'generous' }, { vietnamese: 'thông minh', english: 'intelligent' }, { vietnamese: 'kiên nhẫn', english: 'patient' }, { vietnamese: 'tự tin', english: 'confident' }, { vietnamese: 'khiêm tốn', english: 'modest' }, { vietnamese: 'đáng tin cậy', english: 'reliable' }, { vietnamese: 'năng động', english: 'energetic' }, ], },`

    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <header
        className="p-4 flex items-center justify-between text-white shadow-lg backdrop-blur-md"
        style={{
          background:
            'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 50%, rgba(240, 147, 251, 0.9) 100%)',
        }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-2xl font-bold flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <span className="text-3xl">📚</span>
              <span style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                Vocab Learning
              </span>
            </Link>
          </h1>
        </div>

        <button
          onClick={handleCopyPrompt}
          className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 flex items-center gap-2"
          aria-label="Copy AI prompt"
          title="Copy AI prompt for generating vocabulary"
        >
          {copied ? (
            <>
              <Check size={20} />
              <span className="text-sm font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={20} />
            </>
          )}
        </button>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background:
            'linear-gradient(180deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 50%, rgba(240, 147, 251, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Navigation
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 mb-2 hover:scale-105"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-xl bg-white/30 hover:bg-white/40 transition-all duration-300 mb-2 shadow-lg',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          {/* Demo Links Start */}

          {/* Demo Links End */}
        </nav>
      </aside>
    </>
  )
}
