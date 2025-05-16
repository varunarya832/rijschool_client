import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';
import LessonList from '../../components/LessonList/LessonList';
import VideoPanel from '../../components/VideoPanel/VideoPanel';
import styles from './Dashboard.module.css';
import { useAuth } from '../../hooks/useAuth';

const allLessons = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  date: new Date(2025, 4, 1 + (i % 30)).toLocaleDateString('en-US'),
  start: '02:00 PM',
  end:   '03:00 PM',
  videos: Math.floor(Math.random() * 5),
}));

const TABS = [
  { key: 'all',    label: 'Alle Lessen' },
  { key: 'recent', label: 'Recente'   },
  { key: 'older',  label: 'Oudere'    },
];

export default function Dashboard() {
  const [activeTab,   setActiveTab]   = useState('all');
  const [selectedId,  setSelectedId]  = useState(null);
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const filtered = useMemo(() => {
    const now = new Date();
    if (activeTab === 'recent') {
      return allLessons.filter(l => new Date(l.date) <= now).slice(0, 5);
    }
    if (activeTab === 'older') {
      return allLessons.filter(l => new Date(l.date) < now).slice(5);
    }
    return allLessons;
  }, [activeTab]);

  const selectedLesson = allLessons.find(l => l.id === selectedId);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className={styles.container}>
      <Header title="Leerling Dashboard" onLogout={handleLogout} />

      <div className={styles.body}>
        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <Tabs
              tabs={TABS}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <div className={styles.lessonListContainer}>
              <LessonList
                lessons={filtered}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          </aside>

          <main className={styles.main}>
            <VideoPanel selectedLesson={selectedLesson} />
          </main>
        </div>
      </div>
    </div>
  );
}
