"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useState, useEffect } from "react";

export const FeaturesGrid = () => {
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

    const element = document.getElementById('features-grid');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: "🎥",
      title: "Video Frame Analysis",
      description: "Advanced computer vision to detect facial expressions, body language, and visual emotional cues",
      side: "left"
    },
    {
      icon: "🎙️",
      title: "Audio Emotion Signals",
      description: "Voice tone analysis, pace detection, and vocal stress patterns for emotional state identification",
      side: "right"
    },
    {
      icon: "📝",
      title: "BERT-based Text Sentiment",
      description: "Natural language processing using state-of-the-art transformer models for context understanding",
      side: "left"
    },
    {
      icon: "🧬",
      title: "Real-Time Multimodal Fusion",
      description: "Simultaneous processing of all input streams with intelligent weight balancing",
      side: "right"
    },
    {
      icon: "📊",
      title: "Emotion + Sentiment Labels",
      description: "Comprehensive output including confidence scores, temporal analysis, and detailed breakdowns",
      side: "left"
    },
    {
      icon: "📈",
      title: "Session-based Insights",
      description: "Historical tracking, trend analysis, and comparative insights across multiple videos",
      side: "right"
    }
  ];

  return (
    <section id="features-grid" className="relative py-32 bg-gradient-to-b from-purple-900/50 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Powered by <span className="gradient-text">Multimodal Intelligence</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Six core capabilities working in harmony to understand human emotions at unprecedented scale and accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`glassmorphism p-8 group hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer transform ${
                isVisible 
                  ? feature.side === 'left' 
                    ? 'animate-slide-in-left' 
                    : 'animate-slide-in-right'
                  : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative">
                {/* Bloom effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                
                <div className="relative">
                  <div className="text-4xl mb-4 animate-float">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
