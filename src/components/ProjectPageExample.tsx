"use client";

import React, { useState } from "react";
import { ProjectPage } from "./ProjectPage";
import { NewProjectExample } from "./NewProjectExample";
import { useDataStore } from "@/hooks/useDataStore";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

const ProjectPageExample: React.FC = () => {
  const { db } = useDataStore();
  const [currentView, setCurrentView] = useState<'list' | 'project'>('list');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);

  const projects = db.getAllProjects();

  const handleViewProject = (slug: string) => {
    setSelectedProjectSlug(slug);
    setCurrentView('project');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedProjectSlug(null);
  };

  if (currentView === 'project' && selectedProjectSlug) {
    return (
      <ProjectPage
        projectSlug={selectedProjectSlug}
        onBack={handleBackToList}
        onViewUpdate={(updateId) => console.log('View update:', updateId)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Projects</h1>
        <p className="text-gray-600 mb-8">
          View existing projects or create a new one
        </p>
      </div>

      {/* Create New Project Section */}
      <NewProjectExample currentUserId="user_001" />

      {/* Projects List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">All Projects</h2>
        
        {projects.length > 0 ? (
          <div className="grid gap-6">
            {projects.map((project) => {
              const creator = db.getUserById(project.creator_id);
              const progressPercentage = (project.current_funding / project.funding_goal) * 100;
              const supporterCount = db.getProjectSupporterCount(project.id);
              
              return (
                <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <p className="text-gray-600 mt-1">by {creator?.name || 'Unknown'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{project.status}</div>
                        <div className="text-sm text-gray-500">{project.category}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex space-x-4 text-sm">
                        <span className="text-green-600 font-semibold">
                          ${project.current_funding} raised
                        </span>
                        <span className="text-gray-600">
                          {supporterCount} supporters
                        </span>
                        <span className="text-gray-600">
                          Goal: ${project.funding_goal}
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {Math.round(progressPercentage)}% of goal reached
                      </span>
                      <Button 
                        onClick={() => handleViewProject(project.slug)}
                        variant="outline"
                      >
                        View Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-600 mb-4">No projects yet</p>
              <p className="text-sm text-gray-500">Create the first project using the form above!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export { ProjectPageExample };
