// types.ts - Define all your types
export interface User {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Project {
    id: string;
    creator_id: string;
    title: string;
    description: string;
    goals: string[];
    why_funding_helpful: string;
    funding_goal: number;
    current_funding: number;
    currency: string;
    status: 'active' | 'completed' | 'paused' | 'cancelled';
    created_at: string;
    updated_at: string;
    slug: string;
    cover_image_url?: string;
    category: string;
    visibility: 'public' | 'private';
  }
  
  export interface Contribution {
    id: string;
    project_id: string;
    supporter_id: string;
    amount: number;
    currency: string;
    message?: string;
    is_anonymous: boolean;
    payment_method?: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    created_at: string;
    processed_at?: string;
  }
  
  export interface Update {
    id: string;
    project_id: string;
    creator_id: string;
    title: string;
    content: string;
    images: string[];
    is_milestone: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface ProjectSupporter {
    project_id: string;
    supporter_id: string;
    total_contributed: number;
    first_contribution_date: string;
    last_contribution_date: string;
    contribution_count: number;
    is_following: boolean;
  }
  
  export interface Category {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface DataSchema {
    users: User[];
    projects: Project[];
    contributions: Contribution[];
    updates: Update[];
    project_supporters: ProjectSupporter[];
    categories: Category[];
  }
  
  // Extended types for API responses
  export interface ProjectWithRecentUpdate extends Project {
    recent_update: Update | null;
  }
  
  export interface ContributionWithSupporter extends Contribution {
    supporter: User;
  }
  
  export interface CreatorDashboardProject extends Project {
    contributions: number;
    supporters: number;
    recent_updates: Update[];
  }
  
  export interface CreatorDashboard {
    projects: CreatorDashboardProject[];
    total_funding: number;
    total_supporters: number;
  }
  
  export interface SupporterDashboardProject extends Project {
    my_contribution: number;
    my_contribution_count: number;
    recent_update: Update | null;
  }
  
  export interface SupporterDashboard {
    supported_projects: SupporterDashboardProject[];
    total_contributed: number;
    projects_count: number;
  }
  
  // Input types for creating new records
  export type CreateUserInput = Omit<User, 'id' | 'created_at' | 'updated_at'>;
  export type CreateProjectInput = Omit<Project, 'id' | 'current_funding' | 'status' | 'created_at' | 'updated_at'>;
  export type CreateContributionInput = Omit<Contribution, 'id' | 'status' | 'created_at' | 'processed_at'>;
  export type CreateUpdateInput = Omit<Update, 'id' | 'created_at' | 'updated_at'>;