import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';
import LessonList from '../../components/LessonList/LessonList';
import VideoPanel from '../../components/VideoPanel/VideoPanel';
import styles from './Dashboard.module.css';
import { useAuth } from '../../hooks/useAuth';
import { getAllLessons } from '../../service/lesson.service';
import ClipLoader from 'react-spinners/ClipLoader';
import Sidear from '../Header/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABS = [
  { key: 'all',    label: 'Alle Lessen' },
  { key: 'recent', label: 'Recente'    },
  { key: 'older',  label: 'Oudere'     },
];

export default function Dashboard() {
  const [activeTab, setActiveTab]   = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [lessons, setLessons]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout }                  = useAuth();
  const navigate                    = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const all = await getAllLessons();
        setLessons(all);
      } catch (err) {
        // toast.error('Lessen laden mislukt');
        // console.error(err);
        // setError('Lessen laden mislukt');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sortedLessons = useMemo(() => {
    return [...lessons].sort((a, b) => b.date - a.date);
  }, [lessons]);

  useEffect(() => {
    if (sortedLessons.length && !selectedId) {
      setSelectedId(sortedLessons[0].id);
    }
  }, [sortedLessons, selectedId]);

  const filtered = useMemo(() => {
    if (activeTab === 'recent') return sortedLessons.slice(0, 5);
    if (activeTab === 'older')  return sortedLessons.slice(5);
    return sortedLessons;
  }, [activeTab, sortedLessons]);

  useEffect(() => {
    if (selectedId && !filtered.find(l => l.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filtered, selectedId]);

  const selectedLesson = sortedLessons.find(l => l.id === selectedId);

  const handleMenuClick = () => {
    setIsSidebarOpen(true); // Opens the sidebar
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false); // Closes the sidebar
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  if (loading) {
    return <div className={styles.loading}><ClipLoader size={40} color="#4968f1" /></div>;
  }

  // if (error) {
  //   return <div className={styles.error}>{error}</div>;
  // }

  if (!lessons.length) {
    return (
      <div className={styles.container}>
        <Header title="Leerling Dashboard" onLogout={handleLogout} />
        <div className={styles.noLessons}>
          Geen lessen gevonden.<br />
          Neem contact op met je instructeur.
        </div>
      </div>
    );
  }

  return (
    <>
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header title="Leerling Dashboard" onLogout={handleLogout} />
      <Sidear 
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose} // This closes the sidebar
        onLogout={handleLogout}
      />

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
    </>
  );
}
