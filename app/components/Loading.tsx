'use client';

import React from 'react';
import { useTranslationContext } from '../i18n/TranslationProvider';
import styles from '../styles/Loading.module.scss';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  text,
  className 
}) => {
  const { t } = useTranslationContext();
  
  const loadingText = text || t('common.loading');

  return (
    <div className={`${styles.container} ${styles[size]} ${className || ''}`}>
      <div className={styles.spinner} />
      <span className={styles.text}>{loadingText}</span>
    </div>
  );
};

export default Loading;
