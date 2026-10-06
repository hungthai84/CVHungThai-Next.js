'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { db, auth } from '../../src/lib/firebase';
import { collection, addDoc, onSnapshot, query, where, updateDoc, doc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../../src/lib/firestore-utils';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { 
  Filter, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Layers, 
  ChevronDown,
  ArrowRight,
  LogOut,
  ShieldAlert,
  SlidersHorizontal,
  RefreshCw,
  Sparkles
} from 'lucide-react';

type ErrorStatus = 'pending' | 'in_progress' | 'fixed';
type FilterStatus = 'all' | ErrorStatus;

interface TabErrorRecord {
  id: string;
  title: string;
  description: string;
  status: ErrorStatus | string;
  createdAt: string;
  userId?: string;
}

export default function TabErrorsPage() {
  const [errors, setErrors] = useState<TabErrorRecord[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(auth.currentUser);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'tabErrors'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedErrors = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as TabErrorRecord));
      setErrors(fetchedErrors);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'tabErrors');
    });
    return () => unsubscribe();
  }, [user]);

  const addError = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !description.trim()) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'tabErrors'), {
        title: title.trim(),
        description: description.trim(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: user.uid,
        tabId: 'general',
        category: 'UI/Layout',
        severity: 'medium'
      });
      setTitle('');
      setDescription('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'tabErrors');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStatus = async (id: string, newStatus: ErrorStatus) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, 'tabErrors', id), { status: newStatus });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `tabErrors/${id}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Status Counts
  const counts = useMemo(() => {
    const pending = errors.filter(e => e.status === 'pending' || e.status === 'open').length;
    const inProgress = errors.filter(e => e.status === 'in_progress' || e.status === 'investigating').length;
    const fixed = errors.filter(e => e.status === 'fixed' || e.status === 'resolved').length;
    return {
      all: errors.length,
      pending,
      in_progress: inProgress,
      fixed
    };
  }, [errors]);

  // Filtered List
  const filteredErrors = useMemo(() => {
    return errors.filter(err => {
      // Status filtering logic
      let matchesStatus = true;
      if (statusFilter === 'pending') {
        matchesStatus = err.status === 'pending' || err.status === 'open';
      } else if (statusFilter === 'in_progress') {
        matchesStatus = err.status === 'in_progress' || err.status === 'investigating';
      } else if (statusFilter === 'fixed') {
        matchesStatus = err.status === 'fixed' || err.status === 'resolved';
      }

      // Search query filtering
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        err.title.toLowerCase().includes(q) || 
        err.description.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [errors, statusFilter, searchQuery]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6 font-sans">
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Tab Error Management</h1>
            <p className="text-xs text-slate-400 mt-1">
              Sign in with Google to view and manage application errors and resolution workflows.
            </p>
          </div>
          <button 
            onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} 
            className="w-full py-3 px-5 bg-indigo-600 hover:bg-indigo-500 active:scale-98 rounded-xl font-bold text-sm text-white shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Sign In with Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Tab Error Management</h1>
                <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                  Firebase Sync
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Track, filter, and resolve reported application tab errors and technical bugs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-200 truncate max-w-[160px]">{user.displayName || user.email}</div>
              <div className="text-3xs font-mono text-slate-500 truncate max-w-[160px]">{user.email}</div>
            </div>
            <button
              onClick={() => signOut(auth)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Add Error Form Card */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl">
          <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Create New Error Report</span>
          </h2>
          <form onSubmit={addError} className="space-y-3">
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Error summary (e.g. Navigation tab fails to load on mobile)" 
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors" 
              required 
            />
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Detailed description of the bug, steps to reproduce, or observed symptoms..." 
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none" 
              required 
            />
            <div className="flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                <span>Submit Error</span>
              </button>
            </div>
          </form>
        </div>

        {/* FILTER CONTROLS: Tabbed System + Dropdown Filter */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white tracking-tight">Filter Error Reports</h2>
              <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {filteredErrors.length} of {errors.length}
              </span>
            </div>

            {/* Dropdown Selector (Syncs with Tabbed System) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Status Dropdown:</span>
              <div className="relative w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
                  aria-label="Filter errors by status"
                  className="w-full sm:w-48 appearance-none px-3.5 py-2 pr-9 bg-slate-950 border border-slate-700/80 rounded-xl text-xs font-bold text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-inner"
                >
                  <option value="all">All Errors ({counts.all})</option>
                  <option value="pending">Pending Only ({counts.pending})</option>
                  <option value="in_progress">In Progress Only ({counts.in_progress})</option>
                  <option value="fixed">Fixed Only ({counts.fixed})</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Tabbed Navigation Bar (Clickable Filter Tabs) */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { 
                id: 'all' as FilterStatus, 
                label: 'All Errors', 
                count: counts.all, 
                color: 'slate',
                icon: Layers 
              },
              { 
                id: 'pending' as FilterStatus, 
                label: 'Pending', 
                count: counts.pending, 
                color: 'amber',
                badgeBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
                icon: Clock 
              },
              { 
                id: 'in_progress' as FilterStatus, 
                label: 'In Progress', 
                count: counts.in_progress, 
                color: 'blue',
                badgeBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
                icon: AlertCircle 
              },
              { 
                id: 'fixed' as FilterStatus, 
                label: 'Fixed', 
                count: counts.fixed, 
                color: 'emerald',
                badgeBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                icon: CheckCircle2 
              },
            ].map((tab) => {
              const isSelected = statusFilter === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? tab.id === 'pending'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                        : tab.id === 'in_progress'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-md shadow-blue-500/10'
                        : tab.id === 'fixed'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                        : 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  <span className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded-md ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}

            {/* Quick Search Box */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search error title or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Error Items List */}
        <div className="space-y-3">
          {filteredErrors.length === 0 ? (
            <div className="py-16 text-center p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-500 mx-auto">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-300">
                {statusFilter === 'all' 
                  ? 'No error reports recorded yet.' 
                  : `No '${statusFilter}' errors found.`}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {statusFilter !== 'all' 
                  ? 'Try selecting a different filter tab or clearing your search term.' 
                  : 'Use the form above to add a new error report.'}
              </p>
              {statusFilter !== 'all' && (
                <button
                  onClick={() => setStatusFilter('all')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-600/30 transition-all cursor-pointer"
                >
                  View All Errors
                </button>
              )}
            </div>
          ) : (
            filteredErrors.map((err) => {
              const isPending = err.status === 'pending' || err.status === 'open';
              const isInProgress = err.status === 'in_progress' || err.status === 'investigating';
              const isFixed = err.status === 'fixed' || err.status === 'resolved';

              return (
                <div 
                  key={err.id} 
                  className={`p-4 sm:p-5 rounded-2xl bg-slate-900/90 border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md ${
                    isPending
                      ? 'border-amber-500/30 hover:border-amber-500/50'
                      : isInProgress
                      ? 'border-blue-500/30 hover:border-blue-500/50'
                      : 'border-emerald-500/30 hover:border-emerald-500/50'
                  }`}
                >
                  {/* Left: Info */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-3xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                        isPending
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          : isInProgress
                          ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                          : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {isPending && <Clock className="w-3 h-3" />}
                        {isInProgress && <AlertCircle className="w-3 h-3" />}
                        {isFixed && <CheckCircle2 className="w-3 h-3" />}
                        <span>{err.status}</span>
                      </span>

                      <span className="text-3xs font-mono text-slate-500">
                        {new Date(err.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white tracking-tight break-words">
                      {err.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed break-words whitespace-pre-wrap">
                      {err.description}
                    </p>
                  </div>

                  {/* Right: Status Transition Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-slate-800 w-full md:w-auto justify-end">
                    <span className="text-3xs text-slate-500 mr-1 hidden sm:inline">Set status:</span>
                    
                    {/* Button: Pending */}
                    <button 
                      onClick={() => updateStatus(err.id, 'pending')}
                      disabled={isPending || updatingId === err.id}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        isPending
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 opacity-70 cursor-default'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-amber-400 hover:border-amber-500/30'
                      }`}
                      title="Mark as pending"
                    >
                      Pending
                    </button>

                    {/* Button: In Progress */}
                    <button 
                      onClick={() => updateStatus(err.id, 'in_progress')}
                      disabled={isInProgress || updatingId === err.id}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        isInProgress
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 opacity-70 cursor-default'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-blue-400 hover:border-blue-500/30'
                      }`}
                      title="Mark as in progress"
                    >
                      In Progress
                    </button>

                    {/* Button: Fixed */}
                    <button 
                      onClick={() => updateStatus(err.id, 'fixed')}
                      disabled={isFixed || updatingId === err.id}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        isFixed
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 opacity-70 cursor-default'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-emerald-400 hover:border-emerald-500/30'
                      }`}
                      title="Mark as fixed"
                    >
                      Fixed
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
