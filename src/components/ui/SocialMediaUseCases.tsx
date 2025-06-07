"use client";

import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useState, useEffect, useRef } from "react";

export const SocialMediaUseCases = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

    const element = document.getElementById('social-media-use-cases');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const socialUseCases = [
    {
      platform: "Instagram",
      icon: "📸",
      title: "Reels Emotion Optimization",
      description: "Analyze your Instagram Reels to understand which emotions drive the highest engagement. Optimize content for maximum viral potential.",
      features: ["📈 Engagement Prediction", "🎯 Audience Targeting", "⚡ Real-time Analysis"],
      color: "from-pink-400 to-purple-600",
      bgGradient: "from-pink-500/20 to-purple-600/20",
      stats: "3x higher engagement rate",
      mockupContent: {
        title: "Your Reel Analysis",
        emotions: ["😍 Love: 45%", "😂 Joy: 30%", "😮 Surprise: 25%"],
        recommendation: "Add more surprise elements at 0:03s"
      }
    },
    {
      platform: "YouTube",
      icon: "📺",
      title: "Video Performance Analytics",
      description: "Understand viewer emotional journey throughout your YouTube videos. Identify the exact moments that keep audiences engaged or cause drop-offs.",
      features: ["📊 Retention Analysis", "🎬 Scene Optimization", "💡 Content Insights"],
      color: "from-red-400 to-orange-600",
      bgGradient: "from-red-500/20 to-orange-600/20",
      stats: "67% longer watch time",
      mockupContent: {
        title: "Video Emotional Timeline",
        emotions: ["😊 Happy: 0:00-0:30", "🤔 Curious: 0:30-2:15", "🎉 Excited: 2:15-end"],
        recommendation: "Peak engagement at 1:45 - replicate this energy"
      }
    },
    {
      platform: "TikTok",
      icon: "🎵",
      title: "Viral Content Prediction",
      description: "Predict which TikTok videos will go viral based on emotional triggers. Create content that resonates with your target audience's emotional patterns.",
      features: ["🔥 Viral Score", "🎭 Trend Analysis", "👥 Audience Mood"],
      color: "from-cyan-400 to-blue-600",
      bgGradient: "from-cyan-500/20 to-blue-600/20",
      stats: "89% viral prediction accuracy",
      mockupContent: {
        title: "Viral Potential: 94%",
        emotions: ["😂 Comedy: 60%", "😲 Shock: 25%", "❤️ Love: 15%"],
        recommendation: "Perfect emotional mix for viral content"
      }
    },
    {
      platform: "LinkedIn",
      icon: "💼",
      title: "Professional Content Optimization",
      description: "Ensure your LinkedIn videos strike the right professional tone while maintaining engagement. Analyze corporate content for maximum business impact.",
      features: ["🎯 Professional Tone", "📈 Business Metrics", "👔 Corporate Analysis"],
      color: "from-blue-400 to-indigo-600",
      bgGradient: "from-blue-500/20 to-indigo-600/20",
      stats: "156% more professional leads",
      mockupContent: {
        title: "Professional Analysis",
        emotions: ["💼 Confident: 50%", "🎯 Focused: 30%", "😊 Approachable: 20%"],
        recommendation: "Perfect balance for B2B content"
      }
    }
  ];

  return (
    <section id="social-media-use-cases" className="relative py-24 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            🚀 Supercharge Your <span className="gradient-text">Social Media</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            📱 Transform your content strategy with AI-powered emotion analysis. Know exactly what makes your audience 💖 <strong>love</strong>, 👍 <strong>share</strong>, and 🔔 <strong>subscribe</strong>.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <div className="glassmorphism px-4 py-2 rounded-full">
              <span className="text-green-400 font-semibold text-sm">✅ 2M+ videos analyzed</span>
            </div>
            <div className="glassmorphism px-4 py-2 rounded-full">
              <span className="text-blue-400 font-semibold text-sm">⚡ Real-time insights</span>
            </div>
            <div className="glassmorphism px-4 py-2 rounded-full">
              <span className="text-purple-400 font-semibold text-sm">🎯 Platform-optimized</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {socialUseCases.map((useCase, index) => (
            <Card
              key={useCase.platform}
              className={`glassmorphism p-6 group hover:scale-105 transition-all duration-500 relative overflow-hidden border border-white/10 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.bgGradient} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl`}></div>
              
              <div className="relative">
                {/* Platform header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`text-4xl transform group-hover:scale-110 transition-transform duration-300`}>
                      {useCase.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                        {useCase.platform}
                      </h3>
                      <p className="text-gray-400 text-xs">{useCase.title}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${useCase.color} text-white text-xs font-semibold`}>
                    {useCase.stats}
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-4 text-sm group-hover:text-white transition-colors duration-300">
                  {useCase.description}
                </p>

                {/* Features list */}
                <div className="space-y-1 mb-4">
                  {useCase.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${useCase.color} animate-pulse`}></div>
                      <span className="text-gray-300 text-xs">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Mock dashboard preview */}
                <Card className="glassmorphism p-3 border border-white/5">
                  <h4 className="text-white font-semibold mb-2 text-sm">{useCase.mockupContent.title}</h4>
                  <div className="space-y-1 mb-2">
                    {useCase.mockupContent.emotions.map((emotion, idx) => (
                      <div key={idx} className="text-xs text-gray-300">{emotion}</div>
                    ))}
                  </div>
                  <div className={`text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r ${useCase.color}`}>
                    💡 {useCase.mockupContent.recommendation}
                  </div>
                </Card>

                {/* CTA Button */}
                <Button 
                  className={`w-full mt-4 bg-gradient-to-r ${useCase.color} hover:opacity-90 text-white font-semibold py-2 text-sm transform hover:scale-105 transition-all duration-300`}
                >
                  🚀 Analyze {useCase.platform} Content
                </Button>

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

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Card className="glassmorphism p-6 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">
              🎯 Ready to dominate social media with emotion intelligence?
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Join 50,000+ creators who use our AI to create more engaging content
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 neon-glow">
                🚀 Start Free Analysis
              </Button>
              <Button variant="outline" size="lg" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-6 py-3">
                📹 Watch Demo
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
