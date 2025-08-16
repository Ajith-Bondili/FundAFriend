"use client";

import React, { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Label } from "./Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";
import { X } from "lucide-react";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (projectData: ProjectFormData) => void;
}

export interface ProjectFormData {
  projectName: string;
  shortDescription: string;
  supportReason: string;
  donationGoal: number;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    shortDescription: "",
    supportReason: "",
    donationGoal: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "donationGoal" ? parseFloat(value) || 0 : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ProjectFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProjectFormData, string>> = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required";
    } else if (formData.shortDescription.length > 200) {
      newErrors.shortDescription = "Description must be less than 200 characters";
    }

    if (!formData.supportReason.trim()) {
      newErrors.supportReason = "Please explain why you need support";
    }

    if (formData.donationGoal <= 0) {
      newErrors.donationGoal = "Please enter a valid donation goal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Call the onSubmit callback if provided
      if (onSubmit) {
        await onSubmit(formData);
      }
      
      // Reset form and close modal on successful submission
      handleClose();
    } catch (error) {
      console.error("Error submitting project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      projectName: "",
      shortDescription: "",
      supportReason: "",
      donationGoal: 0,
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-2xl">
      <Card className="border-0 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <CardTitle className="text-2xl font-bold">Create New Project</CardTitle>
            <CardDescription className="mt-2">
              Share your vision and start raising funds for your project
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="projectName">
                Project Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="Enter your project name"
                value={formData.projectName}
                onChange={handleInputChange}
                className={errors.projectName ? "border-destructive" : ""}
              />
              {errors.projectName && (
                <p className="text-sm text-destructive">{errors.projectName}</p>
              )}
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Label htmlFor="shortDescription">
                Short Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                placeholder="Briefly describe your project (max 200 characters)"
                value={formData.shortDescription}
                onChange={handleInputChange}
                rows={3}
                maxLength={200}
                className={errors.shortDescription ? "border-destructive" : ""}
              />
              <div className="flex justify-between items-center">
                {errors.shortDescription && (
                  <p className="text-sm text-destructive">{errors.shortDescription}</p>
                )}
                <p className="text-sm text-muted-foreground ml-auto">
                  {formData.shortDescription.length}/200
                </p>
              </div>
            </div>

            {/* Why Support */}
            <div className="space-y-2">
              <Label htmlFor="supportReason">
                Why are you looking for support? <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="supportReason"
                name="supportReason"
                placeholder="Explain why you need funding and how it will help your project"
                value={formData.supportReason}
                onChange={handleInputChange}
                rows={4}
                className={errors.supportReason ? "border-destructive" : ""}
              />
              {errors.supportReason && (
                <p className="text-sm text-destructive">{errors.supportReason}</p>
              )}
            </div>

            {/* Donation Goal */}
            <div className="space-y-2">
              <Label htmlFor="donationGoal">
                Donation Goal <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="donationGoal"
                  name="donationGoal"
                  type="number"
                  placeholder="0.00"
                  value={formData.donationGoal || ""}
                  onChange={handleInputChange}
                  min="1"
                  step="0.01"
                  className={`pl-8 ${errors.donationGoal ? "border-destructive" : ""}`}
                />
              </div>
              {errors.donationGoal && (
                <p className="text-sm text-destructive">{errors.donationGoal}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};

export { NewProjectModal };
export type { NewProjectModalProps };
