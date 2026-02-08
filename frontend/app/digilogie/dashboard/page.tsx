'use client'

import Statistiques from '@/components/Statistiques';
import { useCurrentUser } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function Home() {
const { data: user, isLoading, isError } = useCurrentUser();

  return (
    <div className='p-4'>
        <Statistiques />
    </div>
  );
}
