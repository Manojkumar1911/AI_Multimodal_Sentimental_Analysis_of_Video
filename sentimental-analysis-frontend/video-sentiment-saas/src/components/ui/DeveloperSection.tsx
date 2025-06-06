import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

export const DeveloperSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('developer-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const codeSnippet = `curl -X POST "https://api.emotionsense.ai/v1/infer" \\
  -H "Authorization: Bearer sk-your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "video_url": "https://example.com/video.mp4",
    "return_confidence": true,
    "include_timeline": true
  }'`;

  return (
    <section id="developer-section" className="relative py-32 bg-gradient-to-b from-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Built for <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Simple API, powerful results. Get started in minutes with our developer-friendly platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Code Editor */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <Card className="glassmorphism p-0 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 bg-gray-900/50 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-gray-300 text-sm font-mono">emotion-api-example.sh</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="text-gray-300 hover:text-white"
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </Button>
              </div>
              
              {/* Code Content */}
              <div className={`p-6 font-mono text-sm transition-all duration-500 ${isDarkMode ? 'bg-gray-900 text-green-400' : 'bg-white text-gray-800'}`}>
                <div className="space-y-2">
                  {codeSnippet.split('\n').map((line, index) => (
                    <div 
                      key={index} 
                      className={`animate-pulse ${isDarkMode ? 'text-green-400' : 'text-gray-800'}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Developer Badges */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { label: "Developer Friendly", icon: "👨‍💻" },
                { label: "Fast Inference", icon: "⚡" },
                { label: "No Login Needed", icon: "🔓" },
              ].map((badge, index) => (
                <Card 
                  key={badge.label}
                  className="glassmorphism px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-white font-medium">{badge.label}</span>
                </Card>
              ))}
            </div>
          </div>

          {/* API Key Card */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <Card className="glassmorphism p-8 relative overflow-hidden group">
              {/* Security visualizations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                    🔐
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Secure API Access</h3>
                    <p className="text-gray-300">Get your key instantly</p>
                  </div>
                </div>

                {/* API Key Display */}
                <Card className="glassmorphism p-4 mb-6 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 text-green-400">🔒</div>
                      <span className="font-mono text-gray-300">sk-•••••••••••••••••••••••••••••••••••••••</span>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Copy
                    </Button>
                  </div>
                  {/* Blur effect for security */}
                  <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                </Card>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Card className="glassmorphism p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-1">10K</div>
                    <div className="text-sm text-gray-300">Free Requests</div>
                  </Card>
                  <Card className="glassmorphism p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-1">2ms</div>
                    <div className="text-sm text-gray-300">Avg Response</div>
                  </Card>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 neon-glow">
                  Get Your API Key →
                </Button>
              </div>

              {/* Sparkle effects */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
