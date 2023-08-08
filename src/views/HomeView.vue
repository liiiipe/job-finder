<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import IconMapPinLine from '../components/icons/IconMapPinLine.vue'
import IconClock from '../components/icons/IconClock.vue'
import IconCurrencyDollar from '../components/icons/IconCurrencyDollar.vue'
import IconSubtract from '../components/icons/IconSubtract.vue'
import PaginationControl from '../components/PaginationControl.vue'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()

const searchStringsNewPost = ['hour', 'hours', 'days', 'day']

const initialStateFilters = {
  type: [],
  experience: [],
  salary: '',
  location: []
}

function getProgressJob(number_of_vacancies: number, number_of_vacancies_filled: number) {
  return (number_of_vacancies_filled * 100) / number_of_vacancies
}

function getParsedDate(updated_at: string) {
  let differenceHours = Math.floor(
    (new Date().getTime() - new Date(updated_at).getTime()) / 1000 / 60 / 60
  )
  let differenceDays = Math.floor(differenceHours / 24)
  let differenceMonth = Math.floor(differenceDays / 30)
  return differenceHours < 24
    ? `${differenceHours} hour${differenceHours > 1 ? 's' : ''}`
    : differenceDays < 31
    ? `${differenceDays} day${differenceDays > 1 ? 's' : ''}`
    : `${differenceMonth} month${differenceMonth > 1 ? 's' : ''}`
}

type Job = {
  id: number
  title: string
  company: string
  company_id: number
  location: string
  type: string
  salary: string
  updated_at: string
  number_of_vacancies: number
  number_of_vacancies_filled: number
  logo_url: string
}
const jobs = ref<Job[]>([])

const pageSelected = ref(1)
const filters = ref({ ...initialStateFilters })

searchStore.performSearch = () => {
  jobs.value = jobs.value.filter(job => job.title.includes(searchStore.search) || job.company.includes(searchStore.search))
};

function clearFilters() {
  filters.value = { ...initialStateFilters }
}

function buildFilterUrl(typeFilter: 'type' | 'experience' | 'location' | 'salary') {
  if (typeFilter !== 'salary') {
    return filters.value[typeFilter].reduce((previousValue, currentValue: never) => {
      let url = `&${typeFilter}=${currentValue}`
      return `${previousValue}${url}`
    }, '')
  }

  if (['', 'Any'].includes(filters.value.salary)) {
    return ''
  }
  const salary = filters.value.salary.split(',')[0]
  return `salary_floor_gte=0&salary_floor_lte=${salary}`
}

watchEffect(async () => {
  let filters_type_url = buildFilterUrl('type')
  let filters_experience_url = buildFilterUrl('experience')
  let filters_location_url = buildFilterUrl('location')
  let filters_salary_url = buildFilterUrl('salary')

  const url = `http://localhost:3000/jobs?_page=${pageSelected.value}${filters_type_url}${filters_experience_url}${filters_location_url}${filters_salary_url}`
  jobs.value = await (await fetch(url)).json()
  jobs.value = jobs.value.map((job) => ({ ...job, updated_at: getParsedDate(job.updated_at) }))
})
</script>

<template>
  <div class="page-home">
    <aside>
      <header>
        <h1>Filters</h1>
        <button @click="clearFilters">Clear</button>
      </header>
      <div>
        <h2>Type of employment</h2>
        <div>
          <input type="checkbox" id="type-full-time" value="Full-time" v-model="filters.type" />
          <label for="type-full-time">Full-time</label>
        </div>
        <div>
          <input type="checkbox" id="type-temporary" value="Temporary" v-model="filters.type" />
          <label for="type-temporary">Temporary</label>
        </div>
        <div>
          <input type="checkbox" id="type-part-time" value="Part-time" v-model="filters.type" />
          <label for="type-part-time">Part-time</label>
        </div>
      </div>
      <div>
        <h2>Work experience</h2>
        <div>
          <input
            type="checkbox"
            id="experience-any"
            value="Any experience"
            v-model="filters.experience"
          />
          <label for="experience-any">Any experience</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="experience-intership"
            value="Intership"
            v-model="filters.experience"
          />
          <label for="experience-intership">Intership</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="experience-work-remotely"
            value="Work remotely"
            v-model="filters.experience"
          />
          <label for="experience-work-remotely">Work remotely</label>
        </div>
      </div>
      <div>
        <h2>Salary</h2>
        <div>
          <input type="radio" id="salary-any" value="Any" v-model="filters.salary" />
          <label for="salary-any">Any</label>
        </div>
        <div>
          <input type="radio" id="salary-10000" value="10,000" v-model="filters.salary" />
          <label for="salary-10000">&lt; 10,000</label>
        </div>
        <div>
          <input type="radio" id="salary-30000" value="30,000" v-model="filters.salary" />
          <label for="salary-30000">&lt; 30,000</label>
        </div>
        <div>
          <input type="radio" id="salary-50000" value="50,000" v-model="filters.salary" />
          <label for="salary-50000">&lt; 50,000</label>
        </div>
        <div>
          <input type="radio" id="salary-80000" value="80,000" v-model="filters.salary" />
          <label for="salary-80000">&lt; 80,000</label>
        </div>
      </div>
      <div>
        <h2>Location</h2>
        <div>
          <input
            type="checkbox"
            id="location-remote"
            value="Remote Job"
            v-model="filters.location"
          />
          <label for="location-remote">Remote Job</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="location-exact"
            value="Exact Location"
            v-model="filters.location"
          />
          <label for="location-exact">Exact Location</label>
        </div>
        <div>
          <input type="checkbox" id="location-near-me" value="Near me" v-model="filters.location" />
          <label for="location-near-me">Near me</label>
        </div>
      </div>
    </aside>

    <main>
      <div v-if="jobs.length > 0" class="jobs">
        <div
          class="job"
          v-for="{
            id,
            title,
            company,
            location,
            logo_url,
            type,
            salary,
            number_of_vacancies,
            number_of_vacancies_filled,
            updated_at
          } in jobs"
          :key="id"
        >
          <header>
            <img class="logo-company" :src="logo_url" alt="logo company" />
            <div>
              <h1>{{ title }}</h1>
              <div class="number-of-jobs">
                <h2>{{ company }}</h2>
                <div v-if="searchStringsNewPost.includes(updated_at.split(' ')[1])">New post</div>
              </div>
            </div>
          </header>
          <div class="location">
            <IconMapPinLine />
            {{ location }}
          </div>
          <div class="job-info">
            <h3><IconClock /> {{ type }}</h3>
            <h3><IconCurrencyDollar /> {{ salary }}</h3>
          </div>
          <div class="job-info-progress">
            <progress
              :value="getProgressJob(number_of_vacancies, number_of_vacancies_filled)"
              max="100"
            />
            <div>
              <h4>{{ number_of_vacancies_filled }} of {{ number_of_vacancies }} filled</h4>
              <h4>Update {{ updated_at }} ago</h4>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="alert">Nothing to show</p>
      <PaginationControl
        v-if="jobs.length > 0"
        :pageSelected="pageSelected"
        :setPageSelected="(page: number) => pageSelected = page"
      />
    </main>
  </div>

  <div class="banner">
    <IconSubtract />
    <div>
      <h1>Never Miss to The Latest Jobs</h1>
      <h2>
        Explore The Latest Job Openings and apply for the best job opportunities available today!
      </h2>
      <button>Keep me updated</button>
    </div>
  </div>
</template>

<style>
.page-home {
  margin-top: 40px;
  display: flex;
  gap: 15px;
}
.page-home aside {
  width: 305px;
  background-color: #ffffff;
}
.page-home aside :is(h1, h2) {
  color: #141414;
}
.page-home aside header {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
}
.page-home aside header h1 {
  font-size: 22px;
  font-weight: bold;
}

.page-home aside header button {
  border: none;
  background-color: transparent;
  color: #2b85ff;
  cursor: pointer;
  font-size: 16px;
}
.page-home aside > div {
  margin: 0 30px;
  padding: 30px 0;
  color: #393f47;
  border-bottom: 1px solid #f2f2f2;
}
.page-home aside > div h2 {
  font-size: 18px;
  font-weight: 500;
}
.page-home aside > div > div {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
}
.page-home aside input {
  height: 16px;
  width: 16px;
}

.page-home aside :is(input, label) {
  cursor: pointer;
}
.page-home main {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.page-home main .jobs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
}
.page-home main .jobs .job {
  background-color: #ffffff;
  padding: 25px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  cursor: pointer;
  transition: 0.4s all;
  width: 313px;
}
.page-home main .jobs .job:hover {
  background-color: #f6f6f6;
}
.page-home main .alert {
  color: #565656;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  font-style: italic;
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

.banner {
  background-color: var(--color-primary);
  width: 778px;
  position: relative;
  height: 241px;
  color: #ffffff;
  margin: 50px auto;
}
.banner > div {
  padding: 40px 45px;
  position: relative;
}

.banner > div h1 {
  font-size: 20px;
  font-weight: bold;
}

.banner > div h2 {
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 40px;
}

.banner > svg {
  position: absolute;
}

.banner > div button {
  color: #ffffff;
  font-size: 18px;
  padding: 15px 30px;
  border: 1px solid #ffffff;
  background-color: transparent;
  cursor: pointer;
}
</style>
