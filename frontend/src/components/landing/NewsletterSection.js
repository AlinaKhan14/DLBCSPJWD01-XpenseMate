import React, { useState } from 'react';
import apiService from '../../services/apiService';
import { useTranslation } from 'react-i18next';

export default function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Please enter a valid email address.');
      setTimeout(() => setError(''), 3500);
      return;
    }
    try {
      await apiService.post('/subscribe-newsletter', { email });
      setSuccess('Thank you for subscribing!');
      setSubmitted(true);
      setEmail('');
      setTimeout(() => {
        setSubmitted(false);
        setSuccess('');
      }, 3500);
    } catch (err) {
      if (err.response?.status === 409) {
        setError('This email is already subscribed.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
      setTimeout(() => setError(''), 3500);
    }
  };

  return (
    <section className="w-full bg-white  py-20">
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2
          className="text-3xl sm:text-4xl   mb-4 tracking-tight text-4xl font-bold text-gray-800 mb-4"
        >
          {t('newsletter.title')}
        </h2>
        <p
          className="text-lg text-slate-600 mb-8"
        >
          {t('newsletter.description')}
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center items-center" onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full sm:w-72 px-5 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-lg bg-white shadow"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={submitted}
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
            disabled={submitted}
          >
            {submitted ? 'Subscribed!' : t('newsletter.subscribe')}
          </button>
        </form>
        {error && <div className="text-red-500 mt-3 text-sm">{error}</div>}
        {success && (
          <div
            className="mt-6 text-green-600 text-lg font-semibold"
          >
            {success}
          </div>
        )}
      </div>
    </section>
  );
}