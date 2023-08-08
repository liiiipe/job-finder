<script setup lang="ts">
import IconChevronLeft from '../components/icons/IconChevronLeft.vue'
import IconChevronRight from '../components/icons/IconChevronRight.vue'

const props = defineProps({
  setPageSelected: { type: Function, required: true },
  pageSelected: { type: Number, required: true },
})

function goToPreviousPage() {
  if (props.pageSelected > 1) {
    props.setPageSelected(props.pageSelected - 1)
  }
}
function goToNextPage() {
  if (props.pageSelected < 3) {
    props.setPageSelected(props.pageSelected + 1)
  }
}
</script>

<template>
  <div class="pagination">
    <IconChevronLeft @click="goToPreviousPage"/>
    <div :class="`item${pageSelected === 1 ? ' selected' : ''}`" @click="() => setPageSelected(1)">1</div>
    <div :class="`item${pageSelected === 2 ? ' selected' : ''}`" @click="() => setPageSelected(2)">2</div>
    <div :class="`item${pageSelected === 3 ? ' selected' : ''}`" @click="() => setPageSelected(3)">3</div>
    <IconChevronRight @click="goToNextPage"/>
  </div>
</template>

<style>
.pagination {
  display: flex;
  gap: 40px;
  align-items: center;
}
.pagination .item {
  padding: 10px;
  cursor: pointer;
  color: #111111;
}
.pagination .item.selected {
  color: var(--color-primary);
  font-weight: bold;
}
.pagination > svg {
  cursor: pointer;
}
</style>
