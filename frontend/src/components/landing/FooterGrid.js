import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function FooterGrid() {
  const { t } = useTranslation();
  return (
    <section className="w-full bg-white/30 py-12 border-t border-slate-200">
      <div
        className="max-w-6xl w-full mx-auto px-4 text-center"
      >
        <p className="text-gray-700 text-lg">
          Made by{' '}
          <a 
            href="https://github.com/AlinaKhan14" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
          >
            Alina Noor
          </a>
          {' | Student at '}
          <a 
            href="https://www.iu.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
          >
            IU
          </a>
        </p>
      </div>
    </section>
  );
}
