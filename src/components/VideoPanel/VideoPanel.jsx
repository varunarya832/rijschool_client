import React, { useState } from 'react';
import styles from './VideoPanel.module.css';
import VideoModal from './VideoModal';

export default function VideoPanel({ selectedLesson }) {
  const [modalVideo, setModalVideo] = useState(null);

  if (!selectedLesson) {
    return (
      <div className={styles.placeholder}>
        <p>Selecteer een les om video's te bekijken</p>
      </div>
    );
  }

  // const videos = selectedLesson.videosData || [];

  const videos = [

    {
      id: 7,
      date: '4/8/2025',
      start: '03:02 PM',
      end: '03:23 PM',
      videos: 1,
      videosData: [
        {
          id: 'vid1',
          timestamp: '8 april 2025 om 11:24',
          url: 'https://www.youtube.com/watch?v=bp6hhq8DdgU',
        },
      ]
    }
    
  ]

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  
  return (
    <div className={styles.panel}>
      {/* ——— Header with date ——— */}
      <div className={styles.header}>
        <h2>Lesdetails</h2>
        <span className={styles.lessonDate}>{selectedLesson.date}</span>
      </div>

      {/* ——— Start / End times ——— */}
      <div className={styles.times}>
        <div className={styles.timeBox}>
          <label>Starttijd</label>
          <div className={styles.timeValue}>{selectedLesson.start}</div>
        </div>
        <div className={styles.timeBox}>
          <label>Eindtijd</label>
          <div className={styles.timeValue}>{selectedLesson.end}</div>
        </div>
      </div>

      {/* ——— Videos list ——— */}
      <div className={styles.videosSection}>
        <label className={styles.videosLabel}>Video’s van deze les</label>
        {videos.length === 0 ? (
          <div className={styles.noVideos}>
            Geen video's beschikbaar voor deze les.
          </div>
        ) : (
          videos.map(video => (
            <div key={video.id} className={styles.videoCard}>
              <span className={styles.timestamp}>{formatDate(video.date)}</span>
              <button
                className={styles.viewBtn}
                onClick={() => setModalVideo(video)}
              >
                Bekijken
              </button>
            </div>
          ))
        )}
      </div>

      {modalVideo && (
        <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
      )}
    </div>
  );
}
