import styles from './PlayButton.module.css';

interface PlayButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isPlaying?: boolean;
}

export default function PlayButton({ onClick, disabled = false, isPlaying = false }: PlayButtonProps) {
  return (
    <button 
      className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      Play
    </button>
  );
} 