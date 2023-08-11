<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import { type Job } from '@/types/Job'
import IconMapPinLine from '../components/icons/IconMapPinLine.vue'
import JobBox from '../components/JobBox.vue'

const route = useRoute()

type Company = {
  id: number
  company: string
  location: string
  number_of_jobs: number
  logo_url: string
}

const company = ref<Company>()
const jobs = ref<Job[]>([])

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

watchEffect(async () => {
  company.value = await (
    await fetch(`https://job-finder-json-server.vercel.app/companies?id=${route.params.id}`)
  ).json()
  // @ts-ignore
  company.value = company.value[0]

  jobs.value = await (
    await fetch(`https://job-finder-json-server.vercel.app/jobs?company_id=${route.params.id}`)
  ).json()
  jobs.value = jobs.value.map((job) => ({ ...job, updated_at: getParsedDate(job.updated_at) }))
})
</script>

<template>
  <div class="page-company">
    <main>
      <header>
        <img class="logo-company" :src="company?.logo_url" alt="logo company" />
        <div>
          <h1>{{ company?.company }}</h1>
          <div class="location">
            <IconMapPinLine />
            <h2>{{ company?.location }}</h2>
          </div>
        </div>
      </header>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae sagittis dolor. Praesent
        rhoncus vehicula aliquet. Cras non vestibulum mi. Sed lobortis urna at luctus porttitor.
        Donec vestibulum, magna in tempus posuere, enim lectus pharetra elit, sed aliquet risus nisl
        et ipsum. Nunc euismod nunc hendrerit, porttitor magna sit amet, lacinia elit. Vestibulum
        sed arcu dictum, ultrices tortor eget, fermentum nulla. Donec posuere tortor nec risus
        venenatis finibus. Sed a scelerisque lorem. Pellentesque arcu nunc, vulputate at nunc nec,
        vulputate porttitor justo. Praesent pulvinar tristique orci, ut maximus justo vulputate vel.
        Etiam mollis interdum posuere. Nulla tempus aliquam metus. Nam in auctor magna. Sed
        condimentum venenatis tincidunt. Nunc blandit risus nibh, eu malesuada enim suscipit eget.
        Nullam semper bibendum placerat. Nullam nisl orci, cursus non porta eu, aliquet a nunc. Sed
        auctor nisl tortor, at aliquet augue consequat eget. In tortor sem, dignissim in neque sit
        amet, semper aliquam felis. Fusce ultrices semper porttitor. Praesent venenatis tellus
        euismod porta iaculis. Sed ullamcorper semper aliquet. Sed suscipit nisl quis eros
        sollicitudin semper. Aenean vestibulum maximus volutpat. Donec sit amet nisi et tortor
        convallis tempor. In tempus euismod diam, vitae placerat neque dapibus quis. Quisque ac odio
        at purus viverra sodales. Aenean metus felis, eleifend vitae vulputate sit amet, commodo nec
        diam. Ut ante erat, dignissim eget pellentesque ac, tincidunt et magna. Nullam in urna
        felis. Maecenas ac tempor lacus. Phasellus lobortis lacus et velit dictum scelerisque. Sed a
        quam placerat, tristique dolor a, dapibus ex. Donec nec orci in sapien efficitur lobortis a
        et risus. Donec arcu lacus, bibendum sed est sed, vestibulum lacinia nisi. Cras vitae
        faucibus mauris. Sed mi nibh, dignissim a massa et, gravida egestas enim. Aliquam erat
        volutpat. Praesent varius tincidunt imperdiet. Etiam quam nibh, molestie non felis ac,
        lacinia aliquam ante. Morbi semper sit amet mauris et gravida. Nunc quis convallis dui, in
        interdum ligula. Nunc posuere orci vitae dignissim mollis. Aenean lobortis tellus diam,
        dapibus tempor erat feugiat vitae. Donec id cursus urna. Mauris sodales mauris nec
        ullamcorper bibendum. Mauris pharetra erat tortor, nec elementum turpis pretium et. Cras
        faucibus auctor elit. Donec felis turpis, malesuada congue sapien vel, placerat mattis arcu.
        Donec ultrices tortor sit amet nulla scelerisque, non imperdiet nunc dignissim. Nunc
        fermentum tellus odio, id lobortis lectus tempor id. Phasellus faucibus mauris vitae lorem
        vestibulum cursus. Sed vitae consectetur ex. Aliquam erat volutpat. Praesent condimentum
        velit ac molestie euismod. Nam interdum venenatis ligula quis tincidunt. Nulla sed velit
        pharetra, iaculis libero eu, mollis felis. Sed eu varius dolor. Maecenas libero libero,
        volutpat eget fermentum vel, sagittis non nibh. Vestibulum ante ipsum primis in faucibus
        orci luctus et ultrices posuere cubilia curae; Duis vel mollis sapien. Vivamus venenatis
        orci tellus, at convallis turpis tristique sit amet.
      </p>
    </main>
    <aside>
      <JobBox v-for="job in jobs" :key="job.id" :job="job" />
    </aside>
  </div>
</template>

<style>
.page-company {
  display: flex;
  gap: 100px;
  margin-top: 40px;
}

aside {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

main header {
  display: flex;
  gap: 35px;
  align-items: center;
}

main header .logo-company {
  width: 135px;
  height: 135px;
}

main header h1 {
  font-size: 32px;
  color: #141414;
  font-weight: bold;
}
main header h2 {
  font-size: 22px;
  color: #565656;
}

main header .location {
  display: flex;
  align-items: center;
  gap: 8px;
}
main p {
  margin-top: 30px;
  font-size: 18px;
  color: #141414;
  font-weight: bold;
}
</style>
