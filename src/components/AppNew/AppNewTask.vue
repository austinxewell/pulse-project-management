<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm'
import { createNewTaskQuery, profilesQuery, projectsQuery } from '@/utils/supaQueries'
import { getLocalTimeZone } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'

const sheetOpen = defineModel<boolean>()

type SelectOption = { label: string; value: number | string }

const selectOptions = ref({
  projects: [] as SelectOption[],
  profiles: [] as SelectOption[],
})

const getProjectOptions = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.forEach((project) => {
    selectOptions.value.projects.push({
      label: project.name,
      value: project.id,
    })
  })
}

const getProfileOptions = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  allProfiles.forEach((profile) => {
    selectOptions.value.profiles.push({
      label: profile.full_name,
      value: profile.id,
    })
  })
}

const getOptions = async () => {
  await Promise.all([getProjectOptions(), getProfileOptions()])
}

getOptions()

const { profile } = storeToRefs(useAuthStore())

const selectedDate = ref<DateValue | null>(null)

const handleDateUpdate = (date: DateValue) => {
  selectedDate.value = date
}

const createTask = async (formData: CreateNewTask) => {
  const dueDate = selectedDate.value
    ? selectedDate.value.toDate(getLocalTimeZone()).toISOString().split('T')[0].replace(/-/g, '/')
    : null

  const task = {
    ...formData,
    due_date: dueDate,
    collaborators: [profile.value!.id],
  }

  const { error } = await createNewTaskQuery(task)

  if (error) {
    console.log(error)
  }

  sheetOpen.value = false
}
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create New Task</SheetTitle>
      </SheetHeader>

      <FormKit
        type="form"
        @submit="createTask"
        submit-label="Create Task"
        :config="{
          validationVisibility: 'submit',
        }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="My New Task"
          validation="required|length:1,255"
        />

        <FormKit
          type="select"
          name="profile_id"
          id="profile_id"
          label="User"
          placeholder="Assign a User"
          :options="selectOptions.profiles"
          validation="required|length:1,255"
        />

        <FormKit
          type="select"
          name="project_id"
          id="project_id"
          label="Project"
          placeholder="Assign a Project"
          :options="selectOptions.projects"
          validation="required"
        />

        <div class="flex flex-col mb-4">
          <label class="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">
            Due Date
          </label>
          <div>
            <DatePicker v-model="selectedDate" @update-date="handleDateUpdate" />
          </div>
        </div>

        <FormKit
          type="textarea"
          name="description"
          label="Description"
          placeholder="Task Description"
          validation="length:0,500"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
