import React from 'react';
import Sidebar from '../components/Sidebar';
import styles from './ExpensesPage.module.css';
import ExpensesTable from '../components/ExpensesTable';

export default function ExpensesPage({ expanded, setExpanded }) {
  return (
    <div className={styles.layout}>
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${expanded ? 'ml-72' : 'ml-20'}`}
        // style={{ marginLeft: expanded ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH }}
      >
        <div className="w-full mt-6">
          <ExpensesTable />
        </div>
      </main>
    </div>
  );
} 