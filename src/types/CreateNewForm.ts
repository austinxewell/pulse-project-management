export interface CreateNewTask {
  name: string
  description: string
  project_id: number
  profile_id: string
}

export interface CreateNewProject {
  name: string
  description: string
  slug: string
}
