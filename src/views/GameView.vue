<template>
  <div>
    <span>{{ id }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

defineProps<{
  id: string;
}>();
</script>
