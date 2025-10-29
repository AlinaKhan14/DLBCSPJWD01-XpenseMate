import React from 'react';
import { Shield, Lock, Eye, Users, MessageCircle, Database, UserCheck, Mail } from 'lucide-react';
import AppBar from '../components/AppBar';
import FooterGrid from '../components/landing/FooterGrid';

function PrivacySection({ icon: Icon, title, children, delay = 0 }) {
  return (
    <div
      className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
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

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      <AppBar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <div className="inline-flex items-center bg-white/40 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
              <Shield className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-indigo-600 font-medium">Your Privacy Matters</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
              Privacy{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We're committed to protecting your financial data and personal information. 
              Here's how we keep your information secure and private.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="space-y-8">
          
          <PrivacySection icon={Database} title="What Data We Collect" delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Personal Information</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Name, email address, and phone number</li>
                  <li>• Account credentials (encrypted passwords)</li>
                  <li>• Profile preferences and settings</li>
                  <li>• Support communications and feedback</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Financial Data</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Expense transactions and categories</li>
                  <li>• Budget goals and spending limits</li>
                  <li>• Bank account connections (read-only)</li>
                  <li>• Financial insights and analytics</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-indigo-400">
              <h3 className="font-semibold text-slate-800 mb-2 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat Data & AI Interactions
              </h3>
              <p className="text-sm">
                Your chat conversations with our AI assistant are processed to provide personalized financial insights. 
                All chat data is encrypted and used only to improve your experience within the app.
              </p>
            </div>
          </PrivacySection>

          <PrivacySection icon={Eye} title="How We Use Your Data" delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Service Delivery</h3>
                <p className="text-sm">Provide expense tracking, budgeting tools, and personalized financial insights</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">AI Chat Features</h3>
                <p className="text-sm">Enable intelligent conversations about your spending patterns and financial goals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Security & Fraud</h3>
                <p className="text-sm">Detect suspicious activities and protect your account from unauthorized access</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-xl border-l-4 border-red-400">
              <p className="text-sm font-medium text-red-800">
                <strong>We never sell your personal information.</strong> Your financial data is never shared with advertisers or third-party marketers.
              </p>
            </div>
          </PrivacySection>

          <PrivacySection icon={Lock} title="How We Protect Your Data" delay={0.3}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-800 mb-4">Technical Safeguards</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-slate-700">End-to-End Encryption</p>
                      <p className="text-sm text-slate-600">All sensitive data is encrypted in transit and at rest using AES-256 encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-slate-700">Secure Infrastructure</p>
                      <p className="text-sm text-slate-600">Hosted on enterprise-grade cloud servers with 99.9% uptime guarantee</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-slate-700">Regular Security Audits</p>
                      <p className="text-sm text-slate-600">Third-party security assessments and vulnerability testing</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-4">Access Controls</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-slate-700">Multi-Factor Authentication</p>
                      <p className="text-sm text-slate-600">Optional 2FA for enhanced account security</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-slate-700">Limited Staff Access</p>
                      <p className="text-sm text-slate-600">Only authorized personnel can access user data, with full audit logs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-slate-700">Data Minimization</p>
                      <p className="text-sm text-slate-600">We collect only the data necessary to provide our services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PrivacySection>

          <PrivacySection icon={Users} title="Third-Party Services" delay={0.4}>
            <p className="mb-4">
              We carefully select trusted partners to help deliver our services. All third-party providers are bound by strict data protection agreements.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">Cloud Hosting</h4>
                <p className="text-sm text-slate-600">Secure, compliant infrastructure providers for data storage and processing</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">Payment Processing</h4>
                <p className="text-sm text-slate-600">PCI-compliant payment processors for subscription billing</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">Analytics</h4>
                <p className="text-sm text-slate-600">Privacy-focused analytics to improve user experience (no personal data shared)</p>
              </div>
            </div>
          </PrivacySection>

          <PrivacySection icon={UserCheck} title="Your Rights & Choices" delay={0.5}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Data Rights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Access your personal data anytime
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Update or correct your information
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Delete your account and data
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Export your data in standard formats
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Privacy Controls</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Manage notification preferences
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Control data sharing settings
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Opt out of analytics tracking
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Disable AI chat features
                  </li>
                </ul>
              </div>
            </div>
          </PrivacySection>

        

        </div>

        
      </div>

      <FooterGrid />
      {/* <Footer /> */}

    </div>
  );
}