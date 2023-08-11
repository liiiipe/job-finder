<script setup lang="ts">
import type { Job } from '@/types/Job'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import IconMapPinLine from '../components/icons/IconMapPinLine.vue'
import IconClock from '../components/icons/IconClock.vue'
import IconCurrencyDollar from '../components/icons/IconCurrencyDollar.vue'
const route = useRoute()

const job = ref<Job>()

watchEffect(async () => {
  job.value = await (await fetch(`https://job-finder-json-server.vercel.app/jobs?id=${route.params.id}`)).json()
  // @ts-ignore
  job.value = job.value[0]
})
</script>

<template>
  <main class="page-job">
    <header>
      <img class="logo-company" :src="job?.logo_url" alt="logo company" />
      <div>
        <h1>{{ job?.title }}</h1>
        <router-link :to="'/companies/' + job?.company_id">
          <h2>{{ job?.company }}</h2>

        </router-link>
      </div>
    </header>
    <div class="info">
      <h3><IconMapPinLine />{{ job?.location }}</h3>
      <h3><IconClock /> {{ job?.type }}</h3>
      <h3><IconCurrencyDollar /> {{ job?.salary }}</h3>
    </div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae sagittis dolor. Praesent
      rhoncus vehicula aliquet. Cras non vestibulum mi. Sed lobortis urna at luctus porttitor. Donec
      vestibulum, magna in tempus posuere, enim lectus pharetra elit, sed aliquet risus nisl et
      ipsum. Nunc euismod nunc hendrerit, porttitor magna sit amet, lacinia elit. Vestibulum sed
      arcu dictum, ultrices tortor eget, fermentum nulla. Donec posuere tortor nec risus venenatis
      finibus. Sed a scelerisque lorem. Pellentesque arcu nunc, vulputate at nunc nec, vulputate
      porttitor justo. Praesent pulvinar tristique orci, ut maximus justo vulputate vel. Etiam
      mollis interdum posuere. Nulla tempus aliquam metus. Nam in auctor magna. Sed condimentum
      venenatis tincidunt. Nunc blandit risus nibh, eu malesuada enim suscipit eget. Nullam semper
      bibendum placerat. Nullam nisl orci, cursus non porta eu, aliquet a nunc. Sed auctor nisl
      tortor, at aliquet augue consequat eget. In tortor sem, dignissim in neque sit amet, semper
      aliquam felis.
      <br />
      <br />
      Fusce ultrices semper porttitor. Praesent venenatis tellus euismod porta iaculis. Sed
      ullamcorper semper aliquet. Sed suscipit nisl quis eros sollicitudin semper. Aenean vestibulum
      maximus volutpat. Donec sit amet nisi et tortor convallis tempor. In tempus euismod diam,
      vitae placerat neque dapibus quis. Quisque ac odio at purus viverra sodales. Aenean metus
      felis, eleifend vitae vulputate sit amet, commodo nec diam. Ut ante erat, dignissim eget
      pellentesque ac, tincidunt et magna. Nullam in urna felis. Maecenas ac tempor lacus. Phasellus
      lobortis lacus et velit dictum scelerisque. Sed a quam placerat, tristique dolor a, dapibus
      ex. Donec nec orci in sapien efficitur lobortis a et risus. Donec arcu lacus, bibendum sed est
      sed, vestibulum lacinia nisi. Cras vitae faucibus mauris. Sed mi nibh, dignissim a massa et,
      gravida egestas enim. Aliquam erat volutpat.
      <br />
      <br />
      Praesent varius tincidunt imperdiet. Etiam quam nibh, molestie non felis ac, lacinia aliquam
      ante. Morbi semper sit amet mauris et gravida. Nunc quis convallis dui, in interdum ligula.
      Nunc posuere orci vitae dignissim mollis. Aenean lobortis tellus diam, dapibus tempor erat
      feugiat vitae. Donec id cursus urna. Mauris sodales mauris nec ullamcorper bibendum. Mauris
      pharetra erat tortor, nec elementum turpis pretium et. Cras faucibus auctor elit. Donec felis
      turpis, malesuada congue sapien vel, placerat mattis arcu. Donec ultrices tortor sit amet
      nulla scelerisque, non imperdiet nunc dignissim. Nunc fermentum tellus odio, id lobortis
      lectus tempor id. Phasellus faucibus mauris vitae lorem vestibulum cursus. Sed vitae
      consectetur ex. Aliquam erat volutpat. Praesent condimentum velit ac molestie euismod.
      <br />
      <br />
      Nam interdum venenatis ligula quis tincidunt. Nulla sed velit pharetra, iaculis libero eu,
      mollis felis. Sed eu varius dolor. Maecenas libero libero, volutpat eget fermentum vel,
      sagittis non nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia curae; Duis vel mollis sapien. Vivamus venenatis orci tellus, at convallis turpis
      tristique sit amet.
    </p>
    <div class="btn-apply">
      <button>Apply now</button>
    </div>
  </main>
</template>

<style>
.page-job {
  margin-top: 40px;
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

main .info {
  display: flex;
  gap: 25px;
  color: #141414;
  margin-top: 20px;
  font-size: 12px;
  align-items: center;
}

main .info h3 {
  display: flex;
  align-items: center;
  gap: 8px;
}
main .info h3 {
  background-color: #cfcfcf;
  padding: 10px 20px;
  border-radius: 26px;
}
main p {
  margin-top: 30px;
  font-size: 18px;
  color: #141414;
  font-weight: bold;
}
main .btn-apply {
  display: flex;
  justify-content: center;
  margin: 60px 0;
}
main .btn-apply button {
  border: none;
  font-size: 20px;
  font-weight: bold;
  padding: 15px 70px;
  border-radius: 26px;
  cursor: pointer;
  background-color: var(--color-primary);
  color: #ffffff;
}
main .btn-apply button:hover {
  transition: 0.4s;
  opacity: 0.85;
}
</style>
