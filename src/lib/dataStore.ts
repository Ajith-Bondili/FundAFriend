
// dataStore.ts - Your TypeScript data store
import { User, Project, Contribution, Update, DataSchema, CreateUserInput, CreateProjectInput, CreateContributionInput, CreateUpdateInput, CreatorDashboard } from './types';
import { getPlaceholderImage } from './imageUtils';

class DataStore {
    private data: DataSchema;
    
    constructor() {
      this.data = {
        users: [
          {
            id: "user_001",
            email: "john@example.com",
            name: "John Smith",
            avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            created_at: "2024-01-15T10:30:00Z",
            updated_at: "2024-08-10T14:22:00Z"
          },
          {
            id: "user_002",
            email: "sarah@example.com",
            name: "Sarah Johnson",
            avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
            created_at: "2024-02-20T15:45:00Z",
            updated_at: "2024-08-12T09:30:00Z"
          }
        ],
        
        projects: [
          {
            id: "project_001",
            creator_id: "user_001",
            title: "My Food Truck Dream",
            description: "Starting a sustainable street food business focused on locally sourced ingredients and eco-friendly packaging.",
            goals: [
              "Purchase and customize a food truck",
              "Obtain necessary permits and licenses",
              "Build initial inventory and equipment",
              "Launch in downtown area by spring 2025"
            ],
            why_funding_helpful: "Your support will help me cover the initial startup costs including the truck down payment, commercial kitchen equipment, and the first month of ingredients.",
            funding_goal: 25000,
            current_funding: 8750,
            currency: "USD",
            status: "active",
            created_at: "2024-07-01T09:00:00Z",
            updated_at: "2024-08-15T16:45:00Z",
            slug: "johns-food-truck-dream",
            cover_image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=300&fit=crop",
            category: "business",
            visibility: "public"
          }
        ],
        
        contributions: [
          {
            id: "contribution_001",
            project_id: "project_001",
            supporter_id: "user_002",
            amount: 250,
            currency: "USD",
            message: "So excited to support your dream! Can't wait to try your tacos!",
            is_anonymous: false,
            status: "completed",
            created_at: "2024-08-01T11:15:00Z"
          }
        ],
        
        updates: [
          {
            id: "update_001",
            project_id: "project_001",
            creator_id: "user_001",
            title: "Found the Perfect Truck!",
            content: "Amazing news everyone! I found a 2019 Ford Transit that's been converted into a food truck.",
            images: ["https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop"],
            is_milestone: true,
            created_at: "2024-08-10T13:30:00Z",
            updated_at: "2024-08-10T13:30:00Z"
          }
        ],
        
        project_supporters: [
          {
            project_id: "project_001",
            supporter_id: "user_002",
            total_contributed: 250,
            first_contribution_date: "2024-08-01T11:15:00Z",
            last_contribution_date: "2024-08-01T11:15:00Z",
            contribution_count: 1,
            is_following: true
          }
        ],
        
        categories: [
          { id: "business", name: "Business & Entrepreneurship", description: "Start your own business or expand an existing one" },
          { id: "creative", name: "Creative Projects", description: "Art, music, writing, and other creative endeavors" },
          { id: "education", name: "Education & Learning", description: "Courses, certifications, and educational pursuits" },
          { id: "personal", name: "Personal Goals", description: "Personal development and life goals" }
        ]
      };
    }

    // Export data as JSON string for localStorage persistence
    exportData(): string {
      return JSON.stringify(this.data);
    }

    // Load data from parsed JSON object
    loadData(data: DataSchema): void {
      this.data = data;
    }

    // Return all projects (for listings)
    getAllProjects(): Project[] {
      return this.data.projects;
    }

    // Find project by slug
    getProjectBySlug(slug: string): Project | undefined {
      return this.data.projects.find(project => project.slug === slug);
    }

    // Find user by ID
    getUserById(id: string): User | undefined {
      return this.data.users.find(user => user.id === id);
    }

    // Create a new project
    createProject(input: CreateProjectInput): Project {
      const projectId = `project_${Date.now()}`;
      const slug = input.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .substring(0, 50);
      
      const now = new Date().toISOString();
      
      const newProject: Project = {
        id: projectId,
        creator_id: input.creator_id,
        title: input.title,
        description: input.description,
        goals: input.goals || [],
        why_funding_helpful: input.why_funding_helpful,
        funding_goal: input.funding_goal,
        current_funding: 0,
        currency: input.currency || 'USD',
        status: 'active',
        created_at: now,
        updated_at: now,
        slug: slug,
        cover_image_url: input.cover_image_url || getPlaceholderImage(input.category || 'default'),
        category: input.category || 'personal',
        visibility: input.visibility || 'public'
      };
      
      this.data.projects.push(newProject);
      return newProject;
    }

    // Get all projects
    getAllProjects(): Project[] {
      return this.data.projects;
    }

    // Get projects by creator
    getProjectsByCreator(creatorId: string): Project[] {
      return this.data.projects.filter(project => project.creator_id === creatorId);
    }

    // Get updates for a project
    getProjectUpdates(projectId: string): Update[] {
      return this.data.updates
        .filter(update => update.project_id === projectId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    // Get contributions for a project
    getProjectContributions(projectId: string): Contribution[] {
      return this.data.contributions.filter(contribution => contribution.project_id === projectId);
    }

    // Get supporter count for a project
    getProjectSupporterCount(projectId: string): number {
      const contributions = this.getProjectContributions(projectId)
        .filter(contribution => contribution.status === 'completed');
      return new Set(contributions.map(c => c.supporter_id)).size;
    }

    // Count supporters for a project (alternative method from main)
    getProjectSupportersCount(projectId: string): number {
      return this.data.project_supporters?.filter(ps => ps.project_id === projectId).length || 0;
    }

    // Get the most recent update for a project
    getLatestUpdate(projectId: string): Update | undefined {
      const updates = this.data.updates
        .filter(u => u.project_id === projectId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return updates[0];
    }

    // Generate creator dashboard data
    getCreatorDashboard(userId: string): CreatorDashboard {
      const userProjects = this.data.projects.filter(project => project.creator_id === userId);
      
      const dashboardProjects = userProjects.map(project => {
        const projectContributions = this.data.contributions.filter(
          contribution => contribution.project_id === project.id && contribution.status === 'completed'
        );
        
        const supporters = new Set(projectContributions.map(c => c.supporter_id)).size;
        const contributionsCount = projectContributions.length;
        
        const recentUpdates = this.data.updates
          .filter(update => update.project_id === project.id)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3);

        return {
          ...project,
          contributions: contributionsCount,
          supporters: supporters,
          recent_updates: recentUpdates
        };
      });

      const totalFunding = userProjects.reduce((sum, project) => sum + project.current_funding, 0);
      const allContributions = this.data.contributions.filter(
        contribution => userProjects.some(p => p.id === contribution.project_id) && contribution.status === 'completed'
      );
      const totalSupporters = new Set(allContributions.map(c => c.supporter_id)).size;

      return {
        projects: dashboardProjects,
        total_funding: totalFunding,
        total_supporters: totalSupporters
      };
    }
}


let dataStoreInstance: DataStore;

export function getDataStore(): DataStore {
  if (!dataStoreInstance) {
    dataStoreInstance = new DataStore();
  }
  return dataStoreInstance;
}

export default DataStore;