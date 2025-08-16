"use client";

import React, { useState } from "react";
import { Button } from "./ui/Button";
import { NewProjectModal, type ProjectFormData } from "./ui/NewProjectModal";
import { useDataStore } from "@/hooks/useDataStore";
import { convertProjectFormToInput } from "@/lib/projectUtils";

interface NewProjectExampleProps {
  currentUserId?: string; // In a real app, this would come from auth context
}

const NewProjectExample: React.FC<NewProjectExampleProps> = ({ 
  currentUserId = "user_001" // Default to first user for demo
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { db, saveToLocalStorage } = useDataStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitProject = async (projectData: ProjectFormData) => {
    try {
      // Convert form data to the format expected by dataStore
      const projectInput = convertProjectFormToInput(projectData, currentUserId);
      
      // Create the project in the dataStore
      const newProject = db.createProject(projectInput);
      
      // Save to localStorage for persistence
      saveToLocalStorage();
      
      console.log("New project created:", newProject);
      
      // Show success message
      alert(`Project "${projectData.projectName}" created successfully!\nProject ID: ${newProject.id}\nSlug: ${newProject.slug}`);
      
      // You could redirect to the project page here
      // router.push(`/projects/${newProject.slug}`);
      
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
      throw error; // Re-throw so the modal can handle the loading state
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Create Your Project</h2>
        <p className="text-gray-600 mb-6">
          Ready to start fundraising? Click the button below to create your new project.
        </p>
        
        <Button 
          onClick={handleOpenModal}
          size="lg"
          className="w-full"
        >
          New Project
        </Button>

        <div className="mt-6 text-sm text-gray-500">
          <p>Current Projects in Store: {db.getAllProjects().length}</p>
          <p>Your Projects: {db.getProjectsByCreator(currentUserId).length}</p>
        </div>
      </div>

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProject}
      />
    </div>
  );
};

export { NewProjectExample };
