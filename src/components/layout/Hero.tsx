"use client";

import { Search, DollarSign, ThumbsUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const Hero = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-700 dark:to-red-700">
        <div className="container mx-auto px-4 py-8 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-orange-200 dark:bg-orange-400 rounded-full opacity-10 animate-pulse" />
            <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-red-200 dark:bg-red-400 rounded-full opacity-10 animate-pulse" />
          </div>

          <div className="relative text-center max-w-3xl mx-auto space-y-6">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-300 tracking-tight">
                Discover Trending Products
                <span className="text-orange-500 dark:text-orange-300">
                  {" "}
                  at Direct Prices
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-200 md:text-2xl ">
                We curate viral products and amazing deals, connecting you
                directly to the best AliExpress sellers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-stone-800 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Real Prices, No Markup",
                description:
                  "We're not a dropshipping store – we just help you find the best prices so you can shop smarter!",
              },
              {
                icon: Search,
                title: "Direct from Source",
                description:
                  "No Middlemen, No Hidden Fees – Just the best real prices directly from trusted AliExpress sellers!",
              },
              {
                icon: ThumbsUp,
                title: "Curated Quality",
                description:
                  "We carefully select and verify products, ensuring you get the best quality at the lowest possible prices.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 text-center space-y-4 dark:bg-gray-900/10 shadow-md rounded-lg">
                  <div className="flex justify-center">
                    <feature.icon className="h-12 w-12 text-orange-500 group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-200">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-up {
          opacity: 0;
          animation: fade-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;
