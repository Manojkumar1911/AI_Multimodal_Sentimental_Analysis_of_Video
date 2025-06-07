"use client";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { ParticleBackground } from "../ui/ParticleBackground";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      {/* Particle Background with enhanced visibility */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      {/* Enhanced background gradient with more depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/30 animate-pulse z-0" />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/50 via-transparent to-purple-900/20 z-0" />
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Enhanced headline and CTA */}
          <div className="space-y-8">
            <Card className="glassmorphism p-8 transform hover:scale-105 transition-all duration-300 border border-purple-500/20">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">Decode Human</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-glow">
                  Emotions 🧠
                </span>
                <br />
                <span className="text-3xl lg:text-4xl text-gray-300">
                  AI Video Analyzer 🎥
                </span>
              </h1>
              <p className="text-lg text-gray-300 mt-8 leading-relaxed">
                🎥 Advanced multimodal AI that analyzes <strong className="text-purple-400">video, audio, and text</strong> simultaneously to detect emotions and sentiment with <strong className="text-cyan-400">99.2% accuracy</strong> - faster than human perception.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-sm">Real-time Processing</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="text-sm">No Delays</span>
                </div>
              </div>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold neon-glow transform hover:scale-105 transition-all duration-300 flex-1"
              >
                🎬 Start Analyzing Videos
              </Button>
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">
              🆓 Try free • No signup required • Results in seconds
            </p>
          </div>
          
          {/* Right side - Enhanced 3D Video Cube with gradients */}
          <div className="relative flex justify-center items-center h-full py-10 lg:py-0">
            {/* Background gradients for the right side - adjusted for visibility */}
            <div className="absolute inset-0 w-3/4 h-3/4 mx-auto my-auto bg-gradient-to-br from-purple-500/40 via-blue-500/40 to-cyan-500/40 rounded-full blur-3xl opacity-60 animate-pulse" style={{ zIndex: -1 }} />
            <div className="absolute inset-0 w-3/4 h-3/4 mx-auto my-auto bg-gradient-to-tr from-pink-500/40 via-purple-500/40 to-blue-500/40 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s', zIndex: -1 }} />
            
            {/* Enhanced floating 3D Video Cube */}
            <div className="animate-float relative z-10">
              <div className="relative w-96 h-96 transform-gpu perspective-1000">
                <div className="animate-rotate-slow transform-style-preserve-3d relative w-full h-full">
                  {/* Video Panel */}
                  <div
                    className={`absolute inset-0 transition-all duration-1000 ${
                      activeSlide === 0 ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      transform: `translate3d(0, 0, 40px) rotateY(0deg)`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <Card className="glassmorphism p-8 h-full border border-red-500/20">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg animate-pulse-glow flex items-center justify-center">
                          <span className="text-3xl">🎥</span>
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">Video Frames</h3>
                        <p className="text-gray-300 text-sm mb-4">Facial expressions & body language</p>
                        <div className="grid grid-cols-3 gap-2">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="w-8 h-6 bg-gradient-to-br from-red-400 to-pink-600 rounded animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  {/* Audio Panel */}
                  <div
                    className={`absolute inset-0 transition-all duration-1000 ${
                      activeSlide === 1 ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      transform: `translate3d(0, 0, 40px) rotateY(120deg)`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <Card className="glassmorphism p-8 h-full border border-green-500/20">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-cyan-600 rounded-lg animate-pulse-glow flex items-center justify-center">
                          <span className="text-3xl">🎙️</span>
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">Audio Waves</h3>
                        <p className="text-gray-300 text-sm mb-4">Voice tone & emotional cues</p>
                        <div className="flex items-end justify-center gap-1">
                          {Array.from({ length: 15 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-2 bg-gradient-to-t from-green-400 to-cyan-400 rounded-t animate-pulse`} 
                              style={{
                                height: `${20 + (i * 5)}px`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  {/* Text Panel */}
                  <div
                    className={`absolute inset-0 transition-all duration-1000 ${
                      activeSlide === 2 ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      transform: `translate3d(0, 0, 40px) rotateY(240deg)`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <Card className="glassmorphism p-8 h-full border border-yellow-500/20">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg animate-pulse-glow flex items-center justify-center">
                          <span className="text-3xl">📝</span>
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">Text Analysis</h3>
                        <p className="text-gray-300 text-sm mb-4">Natural language processing</p>
                        <div className="space-y-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded animate-pulse`} 
                              style={{
                                width: `${40 + (i * 10)}%`,
                                animationDelay: `${i * 0.2}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced sparkles around the cube */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-sparkle"
                style={{
                  top: `${20 + (i * 8)}%`,
                  left: `${20 + (i * 8)}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
            
            {/* Floating emotion tags with 3D emojis */}
            <div className="absolute -top-5 left-1/4 glassmorphism px-4 py-2 rounded-full border border-green-500/50 animate-float">
              <span className="text-green-400 font-semibold">😊 Happy</span>
            </div>
             <div className="absolute top-1/4 -right-5 glassmorphism px-4 py-2 rounded-full border border-red-500/50 animate-float" style={{animationDelay: '2s'}}>
              <span className="text-red-400 font-semibold">😠 Angry</span>
            </div>
            <div className="absolute bottom-5 left-1/3 glassmorphism px-4 py-2 rounded-full border border-gray-500/50 animate-float" style={{animationDelay: '3s'}}>
              <span className="text-gray-400 font-semibold">😐 Neutral</span>
            </div>
             <div className="absolute bottom-1/4 -right-5 glassmorphism px-4 py-2 rounded-full border border-purple-500/50 animate-float" style={{animationDelay: '1s'}}>
              <span className="text-purple-400 font-semibold">🎯 95.8%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
