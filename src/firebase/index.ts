'use client';

import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// import { firebaseConfig } from './config';

function initializeFirebase() {
  const apps = getApps();
  // The firebaseConfig is not available while authentication is disabled.
  // const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
  // const auth = getAuth(app);
  // const firestore = getFirestore(app);

  // return { app, auth, firestore };
  return {};
}

export {
  initializeFirebase,
};
