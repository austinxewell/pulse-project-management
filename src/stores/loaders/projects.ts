import { projectQuery, projectsQuery, updateProjectQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import type { Project, Projects } from '@/utils/supaQueries'
import { showToast } from '@/utils/sweetalert'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug))

  interface ValidateCacheParams {
    ref: typeof projects | typeof project
    query: typeof projectsQuery | typeof projectQuery
    key: string
    loaderFn: typeof loadProjects | typeof loadProject
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getProjects = async () => {
    projects.value = null

    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) projects.value = data

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loaderFn: loadProjects,
    })
  }

  const getSingleProject = async (slug: string) => {
    project.value = null

    const { data, error, status } = await loadProject(slug)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) project.value = data

    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loaderFn: loadProject,
    })
  }

  const updateProject = async () => {
    if (!project.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tasks, id, ...projectProperties } = project.value

    const { error } = await updateProjectQuery(projectProperties, project.value.id)

    if (error) {
      showToast('error', 'Oops! That didn’t work. Let’s try that again!')
      console.error(error)
    } else showToast('success', 'Project updated! Let’s keep the momentum going!')
  }

  return {
    projects,
    getProjects,
    getSingleProject,
    project,
    updateProject,
  }
})
