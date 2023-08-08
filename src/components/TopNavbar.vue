<script setup lang="ts">
import { RouterLink } from 'vue-router'
import EllipseIcon from './icons/IconEllipse.vue'
import SearchIcon from './icons/IconSearch.vue';
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()

</script>

<template>
  <header>
    <div class="logo">
      <div>
        <EllipseIcon color="#58A3F7" />
        <EllipseIcon color="#2789F5" />
      </div>
      <h1>Job Search</h1>
    </div>

    <nav>
      <RouterLink to="/">Jobs</RouterLink>
      <RouterLink to="/companies">Companies</RouterLink>
      <RouterLink to="/about">How It Works</RouterLink>
    </nav>
    <div class="search">
      <input type="search" placeholder="Search" :value="searchStore.search" @input="event => searchStore.search = event.target.value"/>
      <button @click="searchStore.performSearch">
        <SearchIcon />
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  display: flex;
  gap: 25px;
  align-items: center;
}
.logo > div {
  display: flex;
  position: relative;
}
.logo > div > svg:last-child {
  position: absolute;
  left: 10px;
  top: 5px
}

.logo h1{
  color: var(--color-primary);
  font-size: 24px;
  font-weight: bold;
}

nav {
  font-size: 16px;
  text-align: center;
}

nav a {
  text-decoration: none;
  color: #9b9b9b;
  transition: 0.4s;
  display: inline-block;
  padding: 0.5rem 2rem;
  border-left: 1px solid var(--color-border);
}

nav a:hover {
  color: var(--color-primary);
}

nav a.router-link-exact-active {
  color: var(--color-primary);
  font-weight: bold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}
.search {
  display: flex;
}
.search > input {
  padding: 0.8rem 1.2rem;
  font-size: 0.9rem;
  background-color: #ffffff;
  border: none;
  width: 400px;
}

.search button {
  padding: 0 0.7rem;
  border: none;
  background-color: var(--color-primary);
  transition: 0.2s;
  cursor: pointer;
}

.search button:hover {
  opacity: 0.8;
}
.search button:active {
  opacity: 0.6;

}

@media (min-width: 1024px) {

}
</style>