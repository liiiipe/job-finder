<script setup lang="ts">
import EllipseIcon from '../components/icons/IconEllipse.vue'
</script>

<template>
  <div class="about">
    <div class="logo">
      <div>
        <EllipseIcon color="#58A3F7" />
        <EllipseIcon color="#2789F5" />
      </div>
      <h1>Job Search</h1>
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
      <img src="/src/assets/imgs/company-2.jpg" alt="company-img" />
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
      Praesent varius tincidunt imperdiet. Etiam quam nibh, molestie non felis ac, lacinia aliquam
      ante. Morbi semper sit amet mauris et gravida. Nunc quis convallis dui, in interdum ligula.
      Nunc posuere orci vitae dignissim mollis. Aenean lobortis tellus diam, dapibus tempor erat
      feugiat vitae. Donec id cursus urna. Mauris sodales mauris nec ullamcorper bibendum. Mauris
      pharetra erat tortor, nec elementum turpis pretium et. Cras faucibus auctor elit. Donec felis
      turpis, malesuada congue sapien vel, placerat mattis arcu. Donec ultrices tortor sit amet
      nulla scelerisque, non imperdiet nunc dignissim. Nunc fermentum tellus odio, id lobortis
      lectus tempor id. Phasellus faucibus mauris vitae lorem vestibulum cursus. Sed vitae
      consectetur ex. Aliquam erat volutpat. Praesent condimentum velit ac molestie euismod.
      Nam interdum venenatis ligula quis tincidunt. Nulla sed velit pharetra, iaculis libero eu,
      mollis felis. Sed eu varius dolor. Maecenas libero libero, volutpat eget fermentum vel,
      sagittis non nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia curae; Duis vel mollis sapien. Vivamus venenatis orci tellus, at convallis turpis
      tristique sit amet.
      <img src="/src/assets/imgs/company-1.jpg" alt="company-img" />
    </p>
  </div>
</template>

<style>
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 80px 0;
}

.about img {
  height: 450px;
  width: 650px;
}

.logo {
  display: flex;
  gap: 25px;
  align-items: center;
  text-decoration: none;
}
.logo > div {
  display: flex;
  position: relative;
}
.logo > div > svg:last-child {
  position: absolute;
  left: 10px;
  top: 5px;
}

.logo h1 {
  color: var(--color-primary);
  font-size: 54px;
  font-weight: bold;
}

p {
  margin-top: 30px;
  font-size: 18px;
  color: #141414;
  font-weight: bold;
  width: 80%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}
</style>
