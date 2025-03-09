<script setup lang="ts">
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'

const emit = defineEmits<{
  (event: 'updateDate', value: DateValue): void
}>()

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>()

watch(value, (newValue) => {
  if (newValue) emit('updateDate', newValue)
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Select a Date' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent
      class="w-auto p-0 popover-content"
      :trap-focus="false"
      :disable-interaction="false"
    >
      <Calendar v-model="value" initial-focus style="pointer-events: auto" />
    </PopoverContent>
  </Popover>
</template>
