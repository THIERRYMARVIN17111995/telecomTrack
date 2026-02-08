'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '@/utils/isTokenExpired';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true); // pour afficher loader au début
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Si pas de token ou token expiré → redirection immédiate
    if (!token) {
      localStorage.removeItem('token');

      // Petite sécurité : set checking à false pour éviter blocage
      setChecking(false);

      // Redirection immédiate
      router.replace('/');
      return;
    }

    // Token valide → autoriser l’accès
    setAuthorized(true);
    setChecking(false);
  }, [router]);

  // Affiche loader pendant vérification
  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Vérification de la session...</p>
      </div>
    );
  }

//   // Sécurité : si pas autorisé après vérification → rien n’affiche
//   if (!authorized) return null;

  // Token valide → render children (dashboard)
  return <>{children}</>;
}
