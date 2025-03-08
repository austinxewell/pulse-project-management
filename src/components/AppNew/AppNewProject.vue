<script setup lang="ts">
import type { CreateNewProject } from '@/types/CreateNewForm'
import { createNewProjectQuery } from '@/utils/supaQueries'

const { profile } = storeToRefs(useAuthStore())

const sheetOpen = defineModel<boolean>()

const createProject = async (formData: CreateNewProject) => {
  const project = {
    ...formData,
    slug: formData.name.toLocaleLowerCase().replace(/ /g, '-'),
    collaborators: [profile.value!.id],
  }

  const { error } = await createNewProjectQuery(project)

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
        <SheetTitle>Create New Project</SheetTitle>
      </SheetHeader>
      <FormKit
        type="form"
        @submit="createProject"
        submit-label="Create Project"
        :config="{
          validationVisibility: 'submit',
        }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="My New Project"
          validation="required|length:1,255"
        />
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
