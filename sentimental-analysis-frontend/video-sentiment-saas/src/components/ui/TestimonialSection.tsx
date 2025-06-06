import { Card } from "~/components/ui/card";
import { useState, useEffect } from "react";

export const TestimonialSection = () => {
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

    const element = document.getElementById('testimonial-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "AI Product Manager",
      company: "StreamLabs",
      avatar: "👩‍💻",
      content: "EmotionSense AI has revolutionized how we understand our audience. The multimodal analysis gives us insights we never had before.",
      rating: 5,
      color: "from-purple-400 to-pink-500"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      company: "EduTech Solutions",
      avatar: "👨‍🔬",
      content: "The accuracy is incredible. We've improved student engagement by 40% using their emotion detection in our virtual classrooms.",
      rating: 5,
      color: "from-blue-400 to-cyan-500"
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      company: "AI Research Institute",
      avatar: "👩‍🔬",
      content: "The technical depth and API design is exceptional. Integration took us less than a day, and the results speak for themselves.",
      rating: 5,
      color: "from-green-400 to-emerald-500"
    },
    {
      name: "Alex Kim",
      role: "Content Creator",
      company: "YouTube (2M subscribers)",
      avatar: "🎥",
      content: "Game-changer for content optimization. I can now see exactly which parts of my videos resonate most with viewers emotionally.",
      rating: 5,
      color: "from-yellow-400 to-orange-500"
    },
    {
      name: "Priya Patel",
      role: "Director of Engineering",
      company: "Social Media Corp",
      avatar: "👩‍💼",
      content: "Processing 10M+ videos daily with 99.7% uptime. The scalability and reliability is unmatched in the industry.",
      rating: 5,
      color: "from-indigo-400 to-purple-500"
    },
    {
      name: "James Liu",
      role: "Founder & CEO",
      company: "CustomerCare AI",
      avatar: "👨‍💼",
      content: "Customer satisfaction scores improved by 35% after implementing emotion monitoring in our support video calls.",
      rating: 5,
      color: "from-pink-400 to-rose-500"
    }
  ];

  return (
    <section id="testimonials" className="relative py-32 bg-gradient-to-b from-slate-900 to-purple-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Trusted by <span className="gradient-text">Innovators</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of developers and companies using EmotionSense AI to understand human emotions at scale.
          </p>
        </div>

        {/* 3D Matrix Layout */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className={`glassmorphism p-6 transform transition-all duration-500 hover:scale-105 group relative overflow-hidden ${
                  isVisible ? 'animate-float' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: `${6 + index * 0.5}s`
                }}
              >
                {/* Glow border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl`}></div>
                
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    {/* Animated Avatar */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-xl animate-pulse-glow`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-300">{testimonial.role}</p>
                      <p className="text-xs text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div 
                        key={i} 
                        className="text-yellow-400 animate-sparkle"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        ⭐
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Quote marks decoration */}
                  <div className="absolute top-2 right-2 text-4xl text-white/10 group-hover:text-white/20 transition-colors duration-300">
                    "
                  </div>
                </div>

                {/* Floating sparkles */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-sparkle pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </Card>
            ))}
          </div>

          {/* Background floating elements */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-float pointer-events-none opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
