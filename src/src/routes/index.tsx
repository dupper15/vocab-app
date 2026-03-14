import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Menu,
})

function Menu() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
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

      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1
            className="text-6xl font-bold text-white mb-4 drop-shadow-lg"
            style={{
              textShadow:
                '2px 2px 4px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.5)',
            }}
          >
            ✨ 📚 Vocab Learning 🌟
          </h1>
          <p className="text-2xl text-white font-semibold drop-shadow-md">
            Master English vocabulary with joy! 🎉
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/ielts-listening"
            className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl shadow-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 p-8 text-center group transform hover:-translate-y-2"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <div className="text-7xl mb-4 animate-bounce">🎧</div>
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
              IELTS Listening
            </h2>
            <p className="text-white/90 font-medium">Cambridge 11-19</p>
          </Link>

          <Link
            to="/ielts-reading"
            className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl shadow-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 p-8 text-center group transform hover:-translate-y-2"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <div
              className="text-7xl mb-4 animate-bounce"
              style={{ animationDelay: '0.2s' }}
            >
              📖
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
              IELTS Reading
            </h2>
            <p className="text-white/90 font-medium">Cambridge 11-19</p>
          </Link>

          <Link
            to="/speaking-vocab"
            className="bg-gradient-to-br from-green-400 to-emerald-400 rounded-3xl shadow-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 p-8 text-center group transform hover:-translate-y-2"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <div
              className="text-7xl mb-4 animate-bounce"
              style={{ animationDelay: '0.4s' }}
            >
              💬
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
              Speaking Vocab
            </h2>
            <p className="text-white/90 font-medium">View & Practice</p>
          </Link>

          <Link
            to="/writing-vocab"
            className="bg-gradient-to-br from-orange-400 to-red-400 rounded-3xl shadow-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 p-8 text-center group transform hover:-translate-y-2"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <div
              className="text-7xl mb-4 animate-bounce"
              style={{ animationDelay: '0.6s' }}
            >
              ✍️
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
              Writing Vocab
            </h2>
            <p className="text-white/90 font-medium">View & Practice</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
