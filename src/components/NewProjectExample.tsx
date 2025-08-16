"use client";

import React, { useState } from "react";
import { Button } from "./ui/Button";
import { NewProjectModal, type ProjectFormData } from "./ui/NewProjectModal";

const NewProjectExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitProject = async (projectData: ProjectFormData) => {
    // Here you would typically send the data to your backend
    console.log("New project data:", projectData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message or redirect
    alert(`Project "${projectData.projectName}" created successfully!`);
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
