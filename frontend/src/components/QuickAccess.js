import React from 'react';
import { FaChartBar, FaWallet, FaMoneyCheckAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function QuickAccess({ onAddPayment, onAddExpense, onAddBudgetGoal }) {
  const { t } = useTranslation();
  const quickActions = [
    {
      icon: FaChartBar,
      label: t('quickAccess.budgetGoal'),
      hint: t('quickAccess.budgetGoalHint'),
      bg: '#FFD86B',
      gradient: 'from-indigo-500 to-purple-600',
      hoverGradient: 'from-indigo-600 to-purple-700'
    },
    {
      icon: FaWallet,
      label: t('quickAccess.newExpense'),
      hint: t('quickAccess.newExpenseHint'),
      bg: '#FFD86B',
      gradient: 'from-emerald-500 to-teal-600',
      hoverGradient: 'from-emerald-600 to-teal-700'
    },
    {
      icon: FaMoneyCheckAlt,
      label: t('quickAccess.addPayment'),
      hint: t('quickAccess.addPaymentHint'),
      bg: '#FFD86B',
      gradient: 'from-blue-500 to-cyan-600',
      hoverGradient: 'from-blue-600 to-cyan-700'
    },
  ];
  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-slate-200/20 font-sans max-w-full transition-all duration-300 relative overflow-hidden   mb-8">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-3xl"></div>
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-2xl md:text-3xl font-bold text-slate-800 m-0 tracking-tight">
          {t('quickAccess.title')}
        </h2>
        <p className="text-slate-500 mt-2 text-sm font-medium">
          {t('quickAccess.description')}
        </p>
      </div>
      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {quickActions.map((action, idx) => (
          <button
            key={action.label}
            className={`group relative bg-gradient-to-br ${action.gradient} text-white border-none rounded-2xl sm:rounded-xl p-6 sm:p-5 font-semibold text-lg sm:text-base cursor-pointer shadow-lg transition-all duration-300 overflow-hidden`}
            onClick={() => {
              if (action.label === t('quickAccess.addPayment') && onAddPayment) {
                onAddPayment();
              }
              if (action.label === t('quickAccess.newExpense') && onAddExpense) {
                onAddExpense();
              }
              if (action.label === t('quickAccess.budgetGoal') && onAddBudgetGoal) {
                onAddBudgetGoal();
              }
            }}
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-white/10 opacity-0"></div>
            {/* Content container with icon on left and text on right */}
            <div className="flex items-center">
              {/* Icon container */}
              <div 
                className="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 rounded-xl mr-4"
                style={{ backgroundColor: action.bg }}
              >
                <action.icon 
                  className={`text-2xl sm:text-xl ${idx === 0 ? 'text-indigo-600' : 'text-slate-700'}`} 
                />
              </div>
              {/* Text container */}
              <div className="flex-1 text-left">
                <span className="block text-white font-bold text-lg sm:text-base leading-tight">
                  {action.label}
                </span>
                <span className="block text-white/80 text-sm sm:text-xs mt-1 font-medium">
                  {action.hint}
                </span>
              </div>
            </div>
            {/* Removed ripple effect */}
          </button>
        ))}
      </div>
      {/* Bottom hint */}
      <div className="mt-6 text-center">
        <p className="text-slate-400 text-xs font-medium">
          {t('quickAccess.bottomHint')}
        </p>
      </div>
    </div>
  );
}
