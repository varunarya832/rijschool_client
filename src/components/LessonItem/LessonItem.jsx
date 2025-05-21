
import React from 'react'
import { FiChevronRight, FiVideo } from 'react-icons/fi'
import styles from './LessonItem.module.css'


const LessonItem = ({ lesson, isActive, onClick }) => {
  const dateStr = lesson.date.toLocaleDateString('nl-NL', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  });
  const startStr = lesson.start.toLocaleTimeString('nl-NL', {
    hour:   '2-digit',
    minute: '2-digit',
  });
  const endStr = lesson.end.toLocaleTimeString('nl-NL', {
    hour:   '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <div className={styles.info}>
        <div className={styles.date}>Les van {dateStr}</div>
        <div className={styles.time}>{startStr} – {endStr}</div>
      </div>

      <div className={styles.meta}>
        <div className={styles.videos}>
          <FiVideo size={16} className={styles.videoIcon} />
          <span>{lesson.videos}</span>
        </div>
        <FiChevronRight size={20} className={styles.arrow} />
      </div>
    </div>
  )
}

export default LessonItem
