'use client';

import { useRouteProtection } from './hooks/useRouteProtection';
import { useTranslationContext } from './i18n/TranslationProvider';
import { ROUTES } from './constants/routes';

export default function Home() {
  const { isLoading } = useRouteProtection({
    redirectTo: ROUTES.DASHBOARD,
  });
  const { t } = useTranslationContext();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontSize: '1.125rem',
      color: '#6b7280'
    }}>
      {isLoading ? t('common.loading') : t('messages.redirecting')}
    </div>
  );
}
