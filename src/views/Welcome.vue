<template>
    <div class="welcome">
      <h3>Welcome</h3>
      <p>欢迎{{useUsername().username}}!</p>
    </div>
  </template>
  <script setup>
  import {useUsername} from '../stores/username.js'
  </script>