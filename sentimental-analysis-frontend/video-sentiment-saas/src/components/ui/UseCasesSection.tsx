"use client";

import { Card } from "~/components/ui/card";
import { useState, useEffect } from "react";

export const UseCasesSection = () => {
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

    const element = document.getElementById('use-cases-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const useCases = [
    {
      icon: "🎙️",
      title: "Podcast Emotion Tagging",
      description: "Automatically tag emotional moments in podcasts for better content discovery and audience engagement analysis.",
      color: "from-green-400 to-emerald-600",
      stats: "87% accuracy on 10M+ episodes"
    },
    {
      icon: "🎞️",
      title: "YouTube Video Summarization",
      description: "Generate emotional summaries of video content to help creators understand audience response patterns.",
      color: "from-red-400 to-pink-600",
      stats: "Used by 50K+ creators"
    },
    {
      icon: "📚",
      title: "Educational Feedback Analysis",
      description: "Analyze student engagement and emotional responses during online learning sessions for better outcomes.",
      color: "from-blue-400 to-cyan-600",
      stats: "Improved learning by 23%"
    },
    {
      icon: "🎭",
      title: "Film Mood Classification",
      description: "Automatically classify and tag movie scenes by emotional content for enhanced content recommendation systems.",
      color: "from-purple-400 to-indigo-600",
      stats: "98% genre accuracy"
    },
    {
      icon: "🤖",
      title: "Customer Support Tone Detection",
      description: "Monitor customer service interactions to ensure positive experiences and identify training opportunities.",
      color: "from-yellow-400 to-orange-600",
      stats: "40% reduction in escalations"
    },
    {
      icon: "📱",
      title: "Social Media Analytics",
      description: "Analyze video content sentiment across social platforms to measure brand perception and engagement quality.",
      color: "from-pink-400 to-rose-600",
      stats: "Track 100M+ posts daily"
    }
  ];

  return (
    <section id="use-cases-section" className="relative py-24 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Use Cases</span> for Every Industry
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From content creation to customer service, our AI understands emotions across every industry and use case.
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Infinite Horizontal Scroll Container - Increased Speed */}
          <div className="flex gap-8 animate-infinite-scroll-fast min-w-full flex-shrink-0">
            {/* First set of cards */}
            {useCases.map((useCase, index) => (
              <Card
                key={useCase.title}
                className={`glassmorphism p-6 group hover:scale-105 transition-all duration-500 relative overflow-hidden border border-white/10 min-w-[300px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Motion trail effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${useCase.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                
                <div className="relative">
                  {/* Icon with glow */}
                  <div className="relative mb-6">
                    <div className={`text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                      {useCase.icon}
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${useCase.color} rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                    {useCase.description}
                  </p>

                  {/* Stats Badge */}
                  <Card className="glassmorphism p-3 inline-block">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${useCase.color} animate-pulse`}></div>
                      <span className="text-sm font-medium text-gray-300">{useCase.stats}</span>
                    </div>
                  </Card>

                  {/* Sparkles */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-sparkle pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        top: `${(i * 25)}%`,
                        left: `${(i * 25)}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              </Card>
            ))}
            
            {/* Duplicate set for infinite scroll */}
            {useCases.map((useCase, index) => (
              <Card
                key={`second-${useCase.title}`}
                className={`glassmorphism p-6 group hover:scale-105 transition-all duration-500 relative overflow-hidden border border-white/10 min-w-[300px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Motion trail effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${useCase.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                
                <div className="relative">
                  {/* Icon with glow */}
                  <div className="relative mb-6">
                    <div className={`text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                      {useCase.icon}
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${useCase.color} rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                    {useCase.description}
                  </p>

                  {/* Stats Badge */}
                  <Card className="glassmorphism p-3 inline-block">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${useCase.color} animate-pulse`}></div>
                      <span className="text-sm font-medium text-gray-300">{useCase.stats}</span>
                    </div>
                  </Card>

                  {/* Sparkles */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-sparkle pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        top: `${(i * 25)}%`,
                        left: `${(i * 25)}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
