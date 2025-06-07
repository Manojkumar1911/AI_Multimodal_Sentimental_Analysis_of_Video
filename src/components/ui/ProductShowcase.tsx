"use client";

import { Card } from "~/components/ui/card";
import { useState, useEffect } from "react";

export const ProductShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

    const element = document.getElementById('product-showcase');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="product-showcase" className="relative py-32 bg-gradient-to-b from-slate-900 to-purple-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Dashboard <span className="gradient-text">Preview</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience our intuitive interface designed for seamless video analysis and emotion insights.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* 3D Floating Mockup */}
          <div 
            className={`relative transform transition-all duration-1000 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            } ${isHovered ? 'rotate-y-12 scale-105' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Reflection */}
            <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent transform scale-y-[-1] opacity-30 blur-sm"></div>
            
            <Card className="glassmorphism p-8 relative overflow-hidden group">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg"></div>
                  <h3 className="text-2xl font-semibold text-white">EmotionSense AI</h3>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Analysis Results */}
                <Card className="glassmorphism p-6 group-hover:scale-105 transition-all duration-300">
                  <h4 className="text-lg font-semibold text-white mb-4">Live Analysis</h4>
                  <div className="space-y-3">
                    {[
                      { emotion: "😊 Happy", confidence: 87, color: "from-yellow-400 to-orange-500" },
                      { emotion: "😠 Angry", confidence: 73, color: "from-red-400 to-red-500" },
                      { emotion: "😐 Neutral", confidence: 45, color: "from-gray-400 to-slate-500" },
                      { emotion: "😍 Positive", confidence: 92, color: "from-green-400 to-emerald-500" },
                    ].map((result, index) => (
                      <div key={result.emotion} className="flex items-center justify-between">
                        <span className="text-white font-medium">{result.emotion}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${result.color} rounded-full animate-pulse`}
                              style={{ width: `${result.confidence}%`, animationDelay: `${index * 0.2}s` }}
                            ></div>
                          </div>
                          <span className="text-gray-300 text-sm">{result.confidence}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Utterances Card */}
                <Card className="glassmorphism p-6 group-hover:scale-105 transition-all duration-300 delay-100">
                  <h4 className="text-lg font-semibold text-white mb-4">Recent Utterances</h4>
                  <div className="space-y-4">
                    {[
                      { text: "I'm really excited about this!", emotion: "😊", time: "0:12" },
                      { text: "This is frustrating...", emotion: "😠", time: "0:45" },
                      { text: "Let's move forward", emotion: "😐", time: "1:23" },
                    ].map((utterance, index) => (
                      <div key={index} className="p-3 bg-black/20 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">{utterance.time}</span>
                          <span className="text-lg">{utterance.emotion}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{utterance.text}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Stats */}
                <Card className="glassmorphism p-6 group-hover:scale-105 transition-all duration-300 delay-200">
                  <h4 className="text-lg font-semibold text-white mb-4">Session Stats</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-purple-500/20 rounded text-center">
                        <div className="text-2xl font-bold text-white">1,247</div>
                        <div className="text-xs text-gray-300">Frames</div>
                      </div>
                      <div className="p-2 bg-blue-500/20 rounded text-center">
                        <div className="text-2xl font-bold text-white">99.2%</div>
                        <div className="text-xs text-gray-300">Accuracy</div>
                      </div>
                      <div className="p-2 bg-green-500/20 rounded text-center">
                        <div className="text-2xl font-bold text-white">2:45</div>
                        <div className="text-xs text-gray-300">Duration</div>
                      </div>
                      <div className="p-2 bg-orange-500/20 rounded text-center">
                        <div className="text-2xl font-bold text-white">15</div>
                        <div className="text-xs text-gray-300">Emotions</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Analytics Chart Preview */}
              <Card className="glassmorphism p-6 mt-6 group-hover:scale-105 transition-all duration-300 delay-300">
                <h4 className="text-lg font-semibold text-white mb-4">Emotion Timeline</h4>
                <div className="h-24 flex items-end justify-between gap-1">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-purple-500 to-blue-500 rounded-t animate-pulse"
                      style={{
                        width: '100%',
                        height: `${20 + (i * 3)}%`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
              </Card>

              {/* Sparkles and micro-interactions */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-sparkle pointer-events-none"
                  style={{
                    top: `${(i * 12)}%`,
                    left: `${(i * 12)}%`,
                    animationDelay: `${i * 0.3}s`,
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
