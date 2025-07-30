import Image from 'next/image';
import TextField from '../TextField/TextField';
import styles from './DimensionInput.module.css';

interface DimensionInputProps {
  label: string;
  valueX: number;
  valueY: number;
  onXChange: (newValue: number) => void;
  onYChange: (newValue: number) => void;
  onConfirm: () => void;
}

export default function DimensionInput({ 
  label, 
  valueX, 
  valueY, 
  onXChange, 
  onYChange, 
  onConfirm 
}: DimensionInputProps) {
  return (
    <div className={styles.container}>
      <div className={styles.labelWrapper}>
        <span className={styles.label}>{label}</span>
      </div>
      
      <TextField
        label="X"
        value={valueX}
        onChange={onXChange}
      />
      
      <div className={styles.divider}></div>
      
      <TextField
        label="Y"
        value={valueY}
        onChange={onYChange}
      />
      
      <div className={styles.confirmButton} onClick={onConfirm}>
        <Image
          src="/assets/state/state-layer.png"
          alt="Confirm"
          width={16}
          height={16}
        />
      </div>
    </div>
  );
} 