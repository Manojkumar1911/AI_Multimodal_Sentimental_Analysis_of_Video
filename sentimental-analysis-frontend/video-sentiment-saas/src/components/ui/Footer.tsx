import { Card } from "~/components/ui/card";

export const Footer = () => {
  return (
    <footer className="relative py-16 bg-gradient-to-b from-slate-900 to-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🧠</span>
              </div>
              <span className="text-2xl font-bold gradient-text">EmotionAI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced multimodal AI for video emotion analysis. Decode human emotions at lightning speed with 99.2% accuracy.
            </p>
            <div className="flex space-x-4">
              <Card className="glassmorphism p-2 hover:scale-110 transition-transform cursor-pointer">
                <span className="text-xl">🐦</span>
              </Card>
              <Card className="glassmorphism p-2 hover:scale-110 transition-transform cursor-pointer">
                <span className="text-xl">💼</span>
              </Card>
              <Card className="glassmorphism p-2 hover:scale-110 transition-transform cursor-pointer">
                <span className="text-xl">📧</span>
              </Card>
              <Card className="glassmorphism p-2 hover:scale-110 transition-transform cursor-pointer">
                <span className="text-xl">🔗</span>
              </Card>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Product</h3>
            <div className="space-y-2">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors block">✨ Features</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors block">💰 Pricing</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">📚 Documentation</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">🔧 API Reference</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">⚡ Status</a>
            </div>
          </div>

          {/* Use Cases */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Use Cases</h3>
            <div className="space-y-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">🎥 Content Analysis</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">📱 Social Media</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">🎓 Education</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">🏢 Enterprise</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">🤖 AI Research</a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Support</h3>
            <div className="space-y-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">💬 Help Center</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">📞 Contact</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">🛠️ Tutorials</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">👥 Community</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">📈 Changelog</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 EmotionAI. Built with ❤️ for developers worldwide.
            </div>
          </div>
        </div>

        {/* Background Sparkles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-sparkle pointer-events-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </footer>
  );
};
