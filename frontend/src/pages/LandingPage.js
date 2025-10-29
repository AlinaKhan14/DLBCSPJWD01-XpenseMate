import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import FeaturesSection from '../components/landing/FeaturesSection';
import AdvancedFeaturesSection from '../components/landing/AdvancedFeaturesSection';
import NewsletterSection from '../components/landing/NewsletterSection';
import statsImg from '../images/stats.png';
import FooterGrid from '../components/landing/FooterGrid';

function HeroSection() {
  const navigate = useNavigate();
  return (
      <div className="relative pt-20 min-h-screen flex items-center">
        
        {/* Main Hero Section */}
        <main className="flex flex-col md:flex-row items-center justify-between text-center md:text-left px-6 sm:px-12 py-12 max-w-7xl mx-auto w-full relative">
  {/* Left: Text and Buttons */}
  <div 
    className="flex-1 flex flex-col justify-center items-center md:items-start"
  >
    <div className="max-w-2xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight leading-tight">
        Take Control of Your{' '}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Finances
        </span>{' '}
        <br className="hidden sm:block" />
        with XpenseMate
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mb-8 leading-relaxed">
        Effortlessly track expenses, set budgets, and achieve your financial goals with a beautiful, intuitive dashboard designed for modern life.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-16">
        <button
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          onClick={() => navigate('/login')}
        >
          Get Started Free
        </button>
      </div>
    </div>
  </div>

  {/* Right: Stats Image */}
  <div className="flex-1 flex justify-center items-center mt-10 md:mt-0 overflow-visible">
  <img
    src={statsImg}
    alt="XpenseMate Stats UI"
    className="max-w-full h-auto object-contain drop-shadow-2xl w-[300px] sm:w-[400px] md:w-[617px] lg:w-[900px] xl:w-[1137px]"
    style={{
      transform: 'scale(1.4)',   
      transformOrigin: 'center',  
    }}
  />
</div>
</main>
      </div>
  );
}


export default function LandingPage() {

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <AppBar />
      <HeroSection />
      <FeaturesSection />
      <AdvancedFeaturesSection />
  
      <NewsletterSection />

      <FooterGrid />


    </div>
  );
}