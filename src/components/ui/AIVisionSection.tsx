"use client";

import { Card } from "../ui/card";
import { useState, useEffect } from "react";

export const AIVisionSection = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.getElementById('ai-vision-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const emotions = [
    {
      name: "Happy",
      emoji: "😊",
      color: "from-yellow-400 to-orange-600",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/50"
    },
    {
      name: "Angry", 
      emoji: "😠",
      color: "from-red-400 to-pink-600",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/50"
    },
    {
      name: "Neutral",
      emoji: "😐", 
      color: "from-gray-400 to-slate-600",
      bgColor: "bg-gray-500/20",
      borderColor: "border-gray-500/50"
    },
    {
      name: "Positive",
      emoji: "🟢",
      color: "from-green-400 to-emerald-600",
      bgColor: "bg-green-500/20", 
      borderColor: "border-green-500/50"
    }
  ];

  return (
    <section id="ai-vision-section" className="relative py-24 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">AI Vision</span> Technology
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how our AI processes multimodal data streams to understand human emotions with unprecedented accuracy.
          </p>
        </div>

        {/* Input Streams */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          {/* Video Input */}
          <Card className={`glassmorphism p-6 text-center transform hover:scale-105 transition-all duration-500 border border-red-500/30 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center animate-pulse-glow">
              <span className="text-2xl">📼</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Video Frames</h3>
            <p className="text-gray-400 text-sm">Facial expressions analyzed</p>
          </Card>

          {/* Audio Input */}
          <Card className={`glassmorphism p-6 text-center transform hover:scale-105 transition-all duration-500 border border-green-500/30 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-cyan-600 rounded-lg flex items-center justify-center animate-pulse-glow">
              <span className="text-2xl">🎧</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Audio Waveform</h3>
            <p className="text-gray-400 text-sm">Voice tone extracted</p>
          </Card>

          {/* Text Input */}
          <Card className={`glassmorphism p-6 text-center transform hover:scale-105 transition-all duration-500 border border-yellow-500/30 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center animate-pulse-glow">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Transcript</h3>
            <p className="text-gray-400 text-sm">Natural language processed</p>
          </Card>
        </div>

        {/* Fusion Core */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse-glow border-4 border-purple-400/50">
              <span className="text-4xl">🧬</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full animate-ping opacity-20"></div>
            
            {/* Data streams */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-8 bg-gradient-to-t from-transparent to-cyan-400 animate-pulse"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-80px)`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
          <h3 className="text-2xl font-bold text-white mt-6 mb-2">Multimodal AI processing</h3>
          <p className="text-gray-400">Data streams merged in real-time</p>
        </div>

        {/* Output Emotions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {emotions.map((emotion, index) => (
            <Card
              key={emotion.name}
              className={`glassmorphism p-6 text-center transform hover:scale-110 transition-all duration-500 ${emotion.borderColor} border ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 ${emotion.bgColor} rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300`}>
                <span className="text-3xl filter drop-shadow-lg transform hover:scale-110 transition-transform duration-300">
                  {emotion.emoji}
                </span>
              </div>
              <h4 className="text-white font-semibold">{emotion.name}</h4>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
