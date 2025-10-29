import React from 'react';
import { Users, TrendingUp, Shield, Mail, Star } from 'lucide-react';
import AppBar from '../components/AppBar';
import FooterGrid from '../components/landing/FooterGrid';

function AboutSection({ icon: Icon, title, children, delay = 0, accent = 'indigo' }) {
  const accentColors = {
    indigo: 'from-indigo-600 to-purple-600',
    blue: 'from-blue-600 to-indigo-600',
    green: 'from-green-600 to-emerald-600',
    yellow: 'from-yellow-400 to-amber-500',
    pink: 'from-pink-500 to-purple-500',
  };
  return (
    <div
      className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-6">
        <div className={`w-12 h-12 bg-gradient-to-r ${accentColors[accent]} rounded-xl flex items-center justify-center mr-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      </div>
      <div className="text-slate-600 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      <AppBar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <div className="inline-flex items-center bg-white/40 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
              <Star className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-indigo-600 font-medium">About XpenseMate</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
              Empowering Your {' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Financial {' '}
              </span>
               Journey
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              XpenseMate is your trusted partner for smart expense tracking, budgeting, and financial insights. Our mission is to make personal finance simple, secure, and accessible for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="space-y-8">
          <AboutSection icon={TrendingUp} title="Our Mission" delay={0.1} accent="indigo">
            <p>
              At XpenseMate, we believe that everyone deserves financial clarity and control. Our mission is to empower individuals and families to make informed decisions, achieve their goals, and build a secure financial future.
            </p>
          </AboutSection>

          <AboutSection icon={Shield} title="Key Features" delay={0.2} accent="blue">
            <ul className="list-disc pl-6 space-y-2">
              <li>Intuitive expense tracking and categorization</li>
              <li>Customizable budget goals and spending limits</li>
              <li>AI-powered insights and analytics</li>
              <li>Bank-grade security and privacy</li>
              <li>Multi-device sync and cloud backup</li>
              <li>Personalized notifications and reminders</li>
              <li>Seamless import/export of financial data</li>
            </ul>
          </AboutSection>

    
          
        </div>
       
      </div>

      <FooterGrid />

  
    </div>
  );
}