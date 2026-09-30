'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { auth, googleAuthProvider, testConnection, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { dataSyncService, SyncStats } from '../services/dataSyncService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSyncing: boolean;
  syncStats: SyncStats | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  triggerSync: () => Promise<SyncStats>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isSyncing: false,
  syncStats: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  triggerSync: async () => dataSyncService.getSyncStats(),
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStats, setSyncStats] = useState<SyncStats | null>(null);

  useEffect(() => {
    // Validate Firestore connection on boot
    testConnection().catch(() => {});

    // Listen to sync events from dataSyncService
    const handleSyncCompleted = (e: CustomEvent<SyncStats>) => {
      setSyncStats(e.detail);
      setIsSyncing(false);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('thai_portfolio_cloud_sync_completed', handleSyncCompleted as EventListener);
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        setIsSyncing(true);
        // Sync or register user profile in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email || '',
              createdAt: serverTimestamp(),
            });
          }
        } catch (error) {
          console.warn('User profile sync notice:', error);
        }

        // Tự động đẩy dữ liệu từ localStorage lên Database ngay khi người dùng đăng nhập
        try {
          const stats = await dataSyncService.syncLocalStorageToDatabase(currentUser);
          setSyncStats(stats);
        } catch (syncErr) {
          console.error('Auto sync error:', syncErr);
        } finally {
          setIsSyncing(false);
        }
      } else {
        setSyncStats(null);
        setIsSyncing(false);
      }
    });

    return () => {
      unsubscribe();
      if (typeof window !== 'undefined') {
        window.removeEventListener('thai_portfolio_cloud_sync_completed', handleSyncCompleted as EventListener);
      }
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error: any) {
      console.error('Google Sign-In failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (error: any) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  const triggerSync = async () => {
    setIsSyncing(true);
    try {
      const stats = await dataSyncService.triggerManualSync();
      setSyncStats(stats);
      return stats;
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isSyncing, syncStats, signInWithGoogle, signOut, triggerSync }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
