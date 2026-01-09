"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    // Loading页开始退出
    setIsLoading(false);
    // 延迟300ms后Home页进入，形成自然的衔接
    setTimeout(() => {
      setShowContent(true);
    }, 300);
    // Loading页退出完成后完全移除
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-retro-dark">
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}

      {/* Main Content */}
      <div
        className={`
          transition-all duration-700 ease-out
          ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          ${!isLoading ? "visible" : "invisible"}
        `}
      >
        {/* Hero Section */}
        <Hero />

        {/* Rest of content */}
        <main>
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
