import { useState, useEffect } from 'react';
import styles from './TextField.module.css';

interface TextFieldProps {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  variant?: 'enabled' | 'active' | 'filled' | 'error';
}

export default function TextField({ 
  label, 
  value, 
  onChange, 
  variant = 'enabled' 
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(value.toString());

  // Sincroniza o displayValue com o value externo
  useEffect(() => {
    setDisplayValue(value.toString());
  }, [value]);

  const getVariant = () => {
    if (variant === 'error') return 'error';
    if (isFocused) return 'active'; // Prioridade para o estado active quando em foco
    if (value !== 0) return 'filled';
    return 'enabled';
  };

  const currentVariant = getVariant();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);
    
    // Se o campo estiver vazio, define como 0
    if (newValue === '') {
      onChange(0);
    } else {
      const numValue = Number(newValue);
      if (!isNaN(numValue)) {
        onChange(numValue);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Se o valor for 0, limpa o campo quando foca
    if (value === 0) {
      setDisplayValue('');
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Se o campo estiver vazio ao perder o foco, volta para 0
    if (displayValue === '') {
      setDisplayValue('0');
      onChange(0);
    }
  };

  return (
    <div className={`${styles.textField} ${styles[currentVariant]}`}>
      <div className={styles.label}>
        {label}
      </div>
      <div className={styles.field}>
        <input
          type="number"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.input}
        />
        {currentVariant === 'active' && (
          <div className={styles.caret}></div>
        )}
      </div>
    </div>
  );
} 