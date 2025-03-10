import {
  deleteTasQuery,
  taskQuery,
  tasksWithProjectsQuery,
  updateTaskQuery,
} from '@/utils/supaQueries'
import type { Task, TasksWithProjects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import { showToast } from '@/utils/sweetalert'

export const useTaskStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadTasks = useMemoize(async (key: string) => await tasksWithProjectsQuery)
  const loadTask = useMemoize(async (id: string) => await taskQuery(id))

  interface ValidateCacheParams {
    ref: typeof tasks | typeof task
    query: typeof tasksWithProjectsQuery | typeof taskQuery
    key: string
    loaderFn: typeof loadTasks | typeof loadTask
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

  const getTasks = async () => {
    tasks.value = null

    const { data, error, status } = await loadTasks('tasks')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) tasks.value = data

    validateCache({
      ref: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks',
      loaderFn: loadTasks,
    })
  }

  const getSingleTask = async (id: string) => {
    task.value = null

    const { data, error, status } = await loadTask(id)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) task.value = data

    validateCache({
      ref: task,
      query: taskQuery,
      key: id,
      loaderFn: loadTask,
    })
  }

  const updateTask = async () => {
    if (!task.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProperties } = task.value

    const { error } = await updateTaskQuery(taskProperties, task.value.id)

    if (error) {
      showToast('error', 'Oops! That didn’t work. Let’s try that again!')
      console.error(error)
    } else showToast('success', 'Task updated! Let’s keep the momentum going!')
  }

  const deleteTask = async () => {
    if (!task.value) return

    const { error } = await deleteTasQuery(task.value.id)

    if (error) {
      showToast('error', 'Oops! That didn’t work. Let’s try that again!')
      console.error(error)
    } else showToast('success', 'Poof! Task is gone!')
  }

  return {
    tasks,
    getTasks,
    task,
    getSingleTask,
    updateTask,
    deleteTask,
  }
})
