'use client';

import styles from './FilterTabs.module.css';

export interface TabItem {
  id: string;
  label: string;
}

interface FilterTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function FilterTabs({ tabs, activeTab, onChange }: FilterTabsProps) {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          className={[styles.tab, activeTab === tab.id ? styles.tabActive : ''].filter(Boolean).join(' ')}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
