'use client';

import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// import { firebaseConfig } from './config';
import {
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
} from './provider';

import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';

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
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
  useCollection,
  useDoc,
};

export { FirebaseProvider } from './provider';
