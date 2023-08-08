<script setup lang="ts">
import { type Job } from '@/types/Job'
import IconMapPinLine from '../components/icons/IconMapPinLine.vue'
import IconClock from '../components/icons/IconClock.vue'
import IconCurrencyDollar from '../components/icons/IconCurrencyDollar.vue'

defineProps<{
  job: Job
}>()
const searchStringsNewPost = ['hour', 'hours', 'days', 'day']

function getProgressJob(number_of_vacancies: number, number_of_vacancies_filled: number) {
  return (number_of_vacancies_filled * 100) / number_of_vacancies
}
</script>

<template>
  <div
    class="job"
  >
    <header>
      <img class="logo-company" :src="job.logo_url" alt="logo company" />
      <div>
        <h1>{{ job.title }}</h1>
        <div class="number-of-jobs">
          <h2>{{ job.company }}</h2>
          <div v-if="searchStringsNewPost.includes(job.updated_at.split(' ')[1])">New post</div>
        </div>
      </div>
    </header>
    <div class="location">
      <IconMapPinLine />
      {{ job.location }}
    </div>
    <div class="job-info">
      <h3><IconClock /> {{ job.type }}</h3>
      <h3><IconCurrencyDollar /> {{ job.salary }}</h3>
    </div>
    <div class="job-info-progress">
      <progress
        :value="getProgressJob(job.number_of_vacancies, job.number_of_vacancies_filled)"
        max="100"
      />
      <div>
        <h4>{{ job.number_of_vacancies_filled }} of {{ job.number_of_vacancies }} filled</h4>
        <h4>Update {{ job.updated_at }} ago</h4>
      </div>
    </div>
  </div>
</template>

<style>

.job {
  background-color: #ffffff;
  padding: 25px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  cursor: pointer;
  transition: 0.4s all;
  width: 313px;
}
.job:hover {
  background-color: #f6f6f6;
}

.job header {
  display: flex;
  gap: 15px;
}

.job header .logo-company {
  width: 65px;
  height: 65px;
}

.job header h1 {
  font-size: 20px;
  color: #141414;
  font-weight: bold;
}
.job header h2,
.job h3,
.job .location {
  font-size: 15px;
  color: #565656;
}

.job .location,
.job header .number-of-jobs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.job .location {
  font-style: italic;
}

.job .job-info {
  display: flex;
  gap: 22px;
}
.job .job-info > h3 {
  display: flex;
  align-items: center;
  gap: 7px;
}
.job .job-info-progress progress {
  width: 260px;
  height: 6px;
  background-color: #f5f5f5;
  border-radius: 5px;
  border: none;
}

.job .job-info-progress progress::-moz-progress-bar,
.job .job-info-progress progress::-webkit-progress-value {
  background-color: var(--color-primary);
}

.job .job-info-progress > div {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.job .job-info-progress > div h4 {
  color: #14141475;
  font-size: 14px;
}

.job header .number-of-jobs {
  display: flex;
  justify-content: space-between;
}

.job header .number-of-jobs > div {
  border-radius: 3px;
  background-color: rgba(43, 133, 255, 0.1);
  color: var(--color-primary);
  padding: 2px 6px;
  font-size: 12px;
  width: 67px;
}
</style>