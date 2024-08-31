<!-- Sidebar.vue -->
<template>
    <div class="sidebar">
      <button @click="navigateTo('video')">Video</button>
      <button @click="navigateTo('image')">Image</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(page) {
        this.$router.push({ name: page });
      },
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    border:1px solid white;
    display: flex;
    flex-direction: column;
    width: 100px;
    background-color: #333;
    color: #fff;
  }
  .sidebar button {
    margin: 10px;
    padding: 10px;
    background-color: #444;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  