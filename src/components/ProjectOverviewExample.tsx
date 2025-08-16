"use client";

import React, { useState } from "react";
import { ProjectsOverview } from "./ProjectOverview";
import { ProjectPage } from "./ProjectPage";
import { NewProjectModal, type ProjectFormData } from "./ui/NewProjectModal";
import { useDataStore } from "@/hooks/useDataStore";
import { convertProjectFormToInput } from "@/lib/projectUtils";

type ViewType = 'overview' | 'project';

const ProjectOverviewExample: React.FC = () => {
  const { db, saveToLocalStorage } = useDataStore();
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleViewProject = (projectSlug: string) => {
    setSelectedProjectSlug(projectSlug);
    setCurrentView('project');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedProjectSlug(null);
  };

  const handleCreateProject = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSubmitProject = async (projectData: ProjectFormData) => {
    try {
      // Convert form data to dataStore format
      const projectInput = convertProjectFormToInput(projectData, "user_001"); // Default user
      
      // Create the project in the dataStore
      const newProject = db.createProject(projectInput);
      
      // Save to localStorage for persistence
      saveToLocalStorage();
      
      console.log("New project created:", newProject);
      
      // Automatically view the new project
      setSelectedProjectSlug(newProject.slug);
      setCurrentView('project');
      
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  };

  const handleViewUpdate = (updateId: string) => {
    console.log("View update:", updateId);
    // Could navigate to update detail view
  };

  if (currentView === 'project' && selectedProjectSlug) {
    return (
      <ProjectPage
        projectSlug={selectedProjectSlug}
        onBack={handleBackToOverview}
        onViewUpdate={handleViewUpdate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <ProjectsOverview
          onViewProject={handleViewProject}
          onViewUpdate={handleViewUpdate}
          onCreateProject={handleCreateProject}
        />

        <NewProjectModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onSubmit={handleSubmitProject}
        />

        {/* Project Count Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm">
            <span className="text-sm text-gray-600">
              Total Projects: <span className="font-semibold text-gray-900">{db.getAllProjects().length}</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-600">
              Active Projects: <span className="font-semibold text-green-600">
                {db.getAllProjects().filter(p => p.status === 'active').length}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProjectOverviewExample };
