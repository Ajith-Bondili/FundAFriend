import type { ProjectFormData } from "@/components/ui/NewProjectModal";
import type { CreateProjectInput } from "./types";

/**
 * Convert ProjectFormData from the modal to CreateProjectInput for the dataStore
 */
export function convertProjectFormToInput(
  formData: ProjectFormData,
  creatorId: string
): CreateProjectInput {
  return {
    creator_id: creatorId,
    title: formData.projectName,
    description: formData.shortDescription,
    why_funding_helpful: formData.supportReason,
    funding_goal: formData.donationGoal,
    goals: [], // We can add this field to the modal later if needed
    category: "personal", // Default category, could be made selectable
    currency: "USD",
    visibility: "public"
  };
}

/**
 * Generate a slug from a project title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 50);
}
