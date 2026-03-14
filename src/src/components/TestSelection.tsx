import { Link } from '@tanstack/react-router'

interface TestSelectionProps {
  cambridgeNum: string
  title: string
  emoji: string
  description: string
  gradientColors: string
  textColor: string
  testEmoji: string
  backPath: string
  backLabel: string
  basePath: string
}

export default function TestSelection({
  cambridgeNum,
  title,
  emoji,
  description,
  gradientColors,
  textColor,
  testEmoji,
  backPath,
  backLabel,
  basePath,
}: TestSelectionProps) {
  const tests = [1, 2, 3, 4]

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
          ← {backLabel}
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
            {title} {cambridgeNum}
          </h1>
          <p className="text-2xl text-white font-semibold drop-shadow-md">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tests.map((testNum, index) => (
            <Link
              key={testNum}
              to={`${basePath}/${cambridgeNum}/${testNum}` as any}
              className="bg-white rounded-3xl shadow-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 p-8 text-center transform hover:-translate-y-2"
            >
              <div
                className="text-6xl mb-4 animate-bounce"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  animationDuration: '2s',
                }}
              >
                {testEmoji}
              </div>
              <h2
                className="text-2xl font-bold drop-shadow-sm"
                style={{ color: textColor }}
              >
                Test {testNum}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
