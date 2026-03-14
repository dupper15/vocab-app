import { Link } from '@tanstack/react-router'

interface CambridgeBookSelectionProps {
  title: string
  emoji: string
  description: string
  gradientColors: string
  textColor: string
  bookEmoji: string
  basePath: string
}

export default function CambridgeBookSelection({
  title,
  emoji,
  description,
  gradientColors,
  textColor,
  bookEmoji,
  basePath,
}: CambridgeBookSelectionProps) {
  const cambridgeBooks = [11, 12, 13, 14, 15, 16, 17, 18, 19]

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

      <div className="max-w-6xl mx-auto py-8 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center text-white font-bold text-lg hover:scale-110 transition-transform mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30"
        >
          ← Back to Menu
        </Link>

        <div className="text-center mb-12 animate-fade-in">
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
          <p className="text-2xl text-white font-semibold drop-shadow-md">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cambridgeBooks.map((num, index) => (
            <Link
              key={num}
              to={`${basePath}/${num}` as any}
              className="bg-white rounded-3xl shadow-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 p-6 text-center transform hover:-translate-y-2"
            >
              <div
                className="text-6xl mb-3 animate-bounce"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '2s',
                }}
              >
                {bookEmoji}
              </div>
              <h2
                className="text-xl font-bold drop-shadow-sm"
                style={{ color: textColor }}
              >
                Cambridge {num}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
