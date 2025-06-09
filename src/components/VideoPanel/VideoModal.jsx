import React from 'react';
import styles from './VideoModal.module.css';

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  const src = video.url;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <div className={styles.header}>
          <span className={styles.timestamp}>{video.timestamp}</span>
          <span className={styles.analysisLabel}>AI Analyse</span>
        </div>

        <div className={styles.body}>
          <div className={styles.videoContainer}>
            {src ? (
              <video
                src={src}
                controls
                playsInline
                webkit-playsinline="true"
                width="100%"
                height="100%"
                style={{ background: '#000' }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Video niet beschikbaar</p>
            )}
          </div>

          <div className={styles.analysisContainer}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
