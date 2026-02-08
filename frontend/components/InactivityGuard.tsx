'use client';

import { useInactivityLogout } from '@/hooks/useInactivityLogout';

export default function InactivityGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  useInactivityLogout(() => {
    localStorage.removeItem('token');
    window.location.href = '/';
  });

  return <>{children}</>;
}
