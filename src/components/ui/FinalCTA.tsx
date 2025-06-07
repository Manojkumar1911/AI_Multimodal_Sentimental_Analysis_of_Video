import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { useState, useEffect } from "react";

export const FinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoDropped, setVideoDropped] = useState(false);

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

    const element = document.getElementById('final-cta');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="final-cta" className="relative py-32 bg-gradient-to-b from-purple-900/30 via-slate-900 to-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Moving stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to <span className="gradient-text">Understand</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Human Emotions?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
              Join thousands of developers and companies already using our multimodal AI to decode emotions at scale. 
              Start analyzing video content in minutes, not months.
            </p>
          </div>

          {/* Interactive Demo Section */}
          <div className={`relative mb-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Card className="glassmorphism p-12 max-w-2xl mx-auto relative overflow-hidden group">
              {/* Central Glowing Orb */}
              <div className="relative mb-8">
                <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 animate-pulse-glow flex items-center justify-center relative transition-all duration-500 ${videoDropped ? 'scale-110' : ''}`}>
                  <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center">
                    {videoDropped ? (
                      <span className="text-3xl animate-pulse">🧠</span>
                    ) : (
                      <span className="text-3xl">🎯</span>
                    )}
                  </div>
                  
                  {/* Orbiting elements */}
                  <div className="absolute inset-0 animate-rotate-slow">
                    <div className="absolute -top-3 left-1/2 w-6 h-6 bg-red-400 rounded-full -translate-x-1/2 animate-pulse"></div>
                    <div className="absolute top-1/2 -right-3 w-6 h-6 bg-green-400 rounded-full -translate-y-1/2 animate-pulse"></div>
                    <div className="absolute -bottom-3 left-1/2 w-6 h-6 bg-yellow-400 rounded-full -translate-x-1/2 animate-pulse"></div>
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-blue-400 rounded-full -translate-y-1/2 animate-pulse"></div>
                  </div>
                </div>

                {/* Video File Animation */}
                <div 
                  className={`absolute -top-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                    videoDropped ? 'translate-y-20 opacity-0 scale-0' : 'translate-y-0 opacity-100 scale-100'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center animate-float shadow-lg">
                    📹
                  </div>
                </div>

                <div className="text-center mt-6">
                  <p className="text-gray-300 mb-4">
                    {videoDropped ? "Analyzing emotions..." : "Drop your video here"}
                  </p>
                  <div className="text-sm text-gray-400">
                    {videoDropped ? "🧠 Multimodal AI Processing" : "🎥 Supports MP4, MOV, AVI"}
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setVideoDropped(!videoDropped)}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold neon-glow transform hover:scale-105 transition-all duration-300 mb-4"
              >
                {videoDropped ? "Reset Demo" : "Try the Demo"}
              </Button>

              {/* Results Animation */}
              {videoDropped && (
                <div className="mt-6 grid grid-cols-2 gap-4 animate-slide-in-left">
                  {[
                    { emotion: "Happy", confidence: 87, color: "from-yellow-400 to-orange-500" },
                    { emotion: "Excited", confidence: 73, color: "from-green-400 to-emerald-500" },
                  ].map((result, index) => (
                    <Card key={result.emotion} className="glassmorphism p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm">{result.emotion}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${result.color} rounded-full animate-pulse`}
                              style={{ width: `${result.confidence}%`, animationDelay: `${index * 0.2}s` }}
                            ></div>
                          </div>
                          <span className="text-gray-300 text-xs">{result.confidence}%</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Sparkle effects */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-sparkle pointer-events-none"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold neon-glow transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">🚀</span>
              Start Free Trial
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">🔐</span>
              Get Your API Key
            </Button>
          </div>

          {/* Footer Stats */}
          <div className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {[
              { stat: "10M+", label: "Videos Analyzed" },
              { stat: "99.7%", label: "Uptime" },
              { stat: "50K+", label: "Developers" }
            ].map((item, index) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{item.stat}</div>
                <div className="text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
