'use client';

import React from 'react';
import Image from 'next/image';
import { useRouteProtection } from '../hooks/useRouteProtection';
import { useAuthActions } from '../hooks/useAuthActions';
import { useTranslationContext } from '../i18n/TranslationProvider';
import Button from '../components/Button';
import styles from '../styles/Dashboard.module.scss';
import Loading from '../components/Loading';

const DashboardPage: React.FC = () => {
  const { user, isLoading } = useRouteProtection({ requireAuth: true });
  const { logout } = useAuthActions();
  const { t } = useTranslationContext();

  const handleLogout = () => {
    logout();
  };

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('dashboard.title')}</h1>
          <Button
            variant="outline"
            size="small"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            {t('auth.logout.button')}
          </Button>
        </header>

        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <Image
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              width={80}
              height={80}
              className={styles.avatarImage}
            />
          </div>
          
          <div className={styles.userDetails}>
            <h2 className={styles.userName}>
              {user.name.first} {user.name.last}
            </h2>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userLocation}>
              {user.location.city}, {user.location.country}
            </p>
          </div>
        </div>

        <div className={styles.welcomeMessage}>
          <p>
            {t('dashboard.welcome', { name: user.name.first })}
            {t('dashboard.description')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
