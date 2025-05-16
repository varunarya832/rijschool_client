import React from 'react'
import { FiChevronRight, FiVideo } from 'react-icons/fi'
import styles from './LessonItem.module.css'

/**
 * Props:
 *  - lesson: { date: string, start: string, end: string, videos: number }
 *  - isActive: boolean
 *  - onClick: () => void
 */
const LessonItem = ({ lesson, isActive, onClick }) => (
  <div
    className={`${styles.item} ${isActive ? styles.active : ''}`}
    onClick={onClick}
  >
    {/* Left: date + time */}
    <div className={styles.info}>
      <div className={styles.date}>Les van {lesson.date}</div>
      <div className={styles.time}>
        {lesson.start} – {lesson.end}
      </div>
    </div>

    {/* Right: video count + chevron */}
    <div className={styles.meta}>
      <div className={styles.videos}>
        <FiVideo size={16} className={styles.videoIcon} />
        <span>{lesson.videos}</span>
      </div>
      <FiChevronRight size={20} className={styles.arrow} />
    </div>
  </div>
)

export default LessonItem
