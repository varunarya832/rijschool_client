
import React, { useState, useEffect } from 'react';
import styles from './VideoPanel.module.css';
import VideoModal from './VideoModal';
import { getLessonDetails } from '../../service/lesson.service';

export default function VideoPanel({ selectedLesson }) {
  const [videos, setVideos]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [modalVideo, setModalVideo] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (selectedLesson?.id) {
      setLoading(true);
      setError(null);
      getLessonDetails(selectedLesson.id)
        .then(list => {
          if (!cancelled) setVideos(list);
        })
        .catch(() => {
          if (!cancelled) setError('Video’s laden mislukt');
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else {
      setVideos([]);
    }
    return () => { cancelled = true };
  }, [selectedLesson]);

  if (!selectedLesson) {
    return (
      <div className={styles.placeholder}>
        <p>Selecteer een les om video's te bekijken</p>
      </div>
    );
  }

  const dateStr = selectedLesson.date.toLocaleDateString('nl-NL', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  const startStr = selectedLesson.start.toLocaleTimeString('nl-NL', {
    hour: '2-digit', minute: '2-digit'
  });
  const endStr = selectedLesson.end.toLocaleTimeString('nl-NL', {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2>Lesdetails</h2>
        <span className={styles.lessonDate}>{dateStr}</span>
      </div>

      <div className={styles.times}>
        <div className={styles.timeBox}>
          <label>Starttijd</label>
          <div className={styles.timeValue}>{startStr}</div>
        </div>
        <div className={styles.timeBox}>
          <label>Eindtijd</label>
          <div className={styles.timeValue}>{endStr}</div>
        </div>
      </div>

      <div className={styles.videosSection}>
        <label className={styles.videosLabel}>
          Video’s van deze les ({videos.length})
        </label>

        {loading && <p>Video’s laden…</p>}
        {error   && <p className={styles.error}>{error}</p>}

        {!loading && !error && videos.length === 0 && (
          <div className={styles.noVideos}>
            Geen video's beschikbaar voor deze les.
          </div>
        )}

        {!loading && !error && videos.map(v => (
          <div key={v.id} className={styles.videoCard}>
            <span className={styles.videoName}>{v.name}</span>
            <button
              className={styles.viewBtn}
              onClick={() => setModalVideo(v)}
            >
              Bekijken
            </button>
          </div>
        ))}
      </div>

      {modalVideo && (
        <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
      )}
    </div>
  );
}
