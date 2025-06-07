"use client";

import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useState, useEffect } from "react";

export const PricingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

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

    const element = document.getElementById('pricing-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const pricingPlans = [
    {
      name: "Free Tier",
      description: "Perfect for testing and small projects",
      price: { monthly: 0, annual: 0 },
      features: [
        "1,000 requests/month",
        "Basic emotion detection",
        "Community support",
        "API documentation access",
        "Standard processing speed"
      ],
      color: "from-gray-400 to-slate-600",
      popular: false
    },
    {
      name: "Pro Tier",
      description: "Ideal for growing businesses and developers",
      price: { monthly: 49, annual: 39 },
      features: [
        "50,000 requests/month",
        "Advanced multimodal analysis",
        "Priority support",
        "Custom webhooks",
        "Fast processing speed",
        "Analytics dashboard",
        "API rate limit increase"
      ],
      color: "from-purple-500 to-blue-600",
      popular: true
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large-scale operations",
      price: { monthly: "Custom", annual: "Custom" },
      features: [
        "Unlimited requests",
        "Custom model training",
        "Dedicated support team",
        "SLA guarantees",
        "On-premise deployment",
        "Advanced security features",
        "Custom integrations"
      ],
      color: "from-yellow-500 to-orange-600",
      popular: false
    }
  ];

  return (
    <section id="pricing-section" className="relative py-24 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. Scale as you grow with transparent, developer-friendly pricing.
          </p>

          {/* Monthly/Annual Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg ${!isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>Monthly</span>
            <Button
              variant="ghost"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 bg-gray-700 rounded-full p-1"
            >
              <div className={`w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-transform duration-300 ${isAnnual ? 'transform translate-x-8' : ''}`} />
            </Button>
            <span className={`text-lg ${isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Annual 
              <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded-full">20% off</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`glassmorphism p-6 group hover:scale-105 transition-all duration-500 relative overflow-hidden border border-white/10 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
              
              <div className="relative">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-300 mb-6">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-5xl font-bold text-white mb-2">
                      {typeof plan.price.monthly === 'number' ? '$' : ''}
                      {isAnnual ? plan.price.annual : plan.price.monthly}
                      {typeof plan.price.monthly === 'number' && plan.price.monthly > 0 && (
                        <span className="text-lg text-gray-300 font-normal">/month</span>
                      )}
                    </div>
                    {isAnnual && typeof plan.price.monthly === 'number' && plan.price.monthly > 0 && (
                      <div className="text-sm text-gray-400 line-through">
                        ${plan.price.monthly}/month
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0`}>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white neon-glow'
                      : 'border border-gray-600 text-white hover:bg-gray-800'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </div>

              {/* Floating elements */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-sparkle pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{
                    top: `${(i * 16)}%`,
                    left: `${(i * 16)}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
