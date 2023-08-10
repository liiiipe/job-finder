<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import IconMapPinLine from '../components/icons/IconMapPinLine.vue'
import IconJob from '../components/icons/IconJob.vue'

type Company = {
  id: number
  company: string
  location: string
  number_of_jobs: number
  logo_url: string
}

const companies = ref<Company[]>([])

watchEffect(async () => {
  const url = `http://localhost:3000/companies`
  companies.value = await (await fetch(url)).json()
})
</script>

<template>
  <div class="page-companies">
    <router-link
      :to="'/companies/' + id"
      class="company"
      v-for="{ id, company, location, number_of_jobs, logo_url } in companies"
      :key="id"
    >
      <header>
        <img class="logo-company" :src="logo_url" alt="logo company" />
        <div>
          <h1>{{ company }}</h1>
          <div class="number-of-jobs">
            <IconJob />
            <h2>{{ number_of_jobs }} open jobs</h2>
          </div>
        </div>
      </header>
      <div class="location">
        <IconMapPinLine />
        {{ location }}
      </div>
    </router-link>
  </div>
</template>

<style>
.page-companies {
  margin-top: 40px;
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
}
.company {
  background-color: #ffffff;
  padding: 25px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  cursor: pointer;
  transition: 0.4s all;
  text-decoration: none;
  width: 388px;
}
.company:hover {
  background-color: #f6f6f6;
}

.company header {
  display: flex;
  gap: 15px;
}

.company header .logo-company {
  width: 65px;
  height: 65px;
}

.company header h1 {
  font-size: 20px;
  color: #141414;
  font-weight: bold;
}
.company header h2,
.company .location {
  font-size: 15px;
  color: #565656;
}

.company .location,
.company header .number-of-jobs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.company .location {
  font-style: italic;
}
</style>
