import Image from 'next/image';
import styles from './BoardSquare.module.css';

interface BoardSquareProps {
  isLight: boolean;
  pieceImage?: string;
  labelX?: string;
  labelY?: string;
  isSelected?: boolean;
  isValidMove?: boolean;
  onClick?: () => void;
}

export default function BoardSquare({ 
  isLight, 
  pieceImage, 
  labelX, 
  labelY, 
  isSelected = false,
  isValidMove = false,
  onClick 
}: BoardSquareProps) {
  const getSquareClass = () => {
    let className = `${styles.square} ${isLight ? styles.light : styles.dark}`;
    
    if (isSelected) {
      className += ` ${styles.selected}`;
    } else if (isValidMove) {
      className += ` ${styles.validMove}`;
    }
    
    return className;
  };

  return (
    <div className={getSquareClass()} onClick={onClick}>
      {pieceImage && (
        <Image
          src={pieceImage}
          alt="Chess piece"
          width={48}
          height={48}
          className={styles.piece}
        />
      )}
      {labelY && <span className={styles.labelY}>{labelY}</span>}
      {labelX && <span className={styles.labelX}>{labelX}</span>}
    </div>
  );
} 