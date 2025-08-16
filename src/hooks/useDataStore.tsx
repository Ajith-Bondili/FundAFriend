import { useState, useEffect } from 'react';
import { getDataStore } from '@/lib/dataStore';
import type { Project, User, CreatorDashboard, SupporterDashboard } from '@/lib/types';

export function useDataStore() {
  const [db] = useState(() => getDataStore());

  // Persistence helper
  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fundingPlatformData', db.exportData());
    }
  };

  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fundingPlatformData');
      if (saved) {
        db.loadData(JSON.parse(saved));
      }
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return {
    db,
    saveToLocalStorage,
    loadFromLocalStorage
  };
}

// Specific hooks for common operations
export function useProject(slug: string) {
  const { db } = useDataStore();
  const [project, setProject] = useState<Project | null>(null);
  const [creator, setCreator] = useState<User | null>(null);

  useEffect(() => {
    const foundProject = db.getProjectBySlug(slug);
    setProject(foundProject || null);
    
    if (foundProject) {
      const foundCreator = db.getUserById(foundProject.creator_id);
      setCreator(foundCreator || null);
    }
  }, [slug, db]);

  return { project, creator };
}

export function useCreatorDashboard(userId: string) {
  const { db } = useDataStore();
  const [dashboard, setDashboard] = useState<CreatorDashboard | null>(null);

  useEffect(() => {
    const dashboardData = db.getCreatorDashboard(userId);
    setDashboard(dashboardData);
  }, [userId, db]);

  return dashboard;
}