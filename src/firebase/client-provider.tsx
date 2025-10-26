'use client';

import React, { useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

export const FirebaseClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { firebaseApp, auth, firestore } = useMemo(
    () => initializeFirebase(),
    []
  );

  if (!firebaseApp || !auth || !firestore) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Firebase...
      </div>
    );
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
};
