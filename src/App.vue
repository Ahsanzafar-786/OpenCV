<template>
  <div id="app">
      
    <sidebar />
    <div class="content">
    
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/AppSidebar.vue';

export default {
  components: {
    Sidebar
  }
};
</script>

<style>
#app {
  display: flex;            /* Use flexbox for layout */
  height: 100%;            /* Full view height */
  width: 100%;             /* Full view width */
  background-color: #121212;
  overflow: hidden;         /* Prevents any scroll on the #app level */
}

/* Adjust the sidebar width and fix its position */
sidebar {
  width: 10%;               /* Sidebar takes up 10% of the view width */
  min-width: 150px;         /* Minimum width to prevent collapse on small screens */
  height: 100%;             /* Full height */
  position: fixed;          /* Fixed position */
  top: 0;                   /* Align top */
  left: 0;               /* Allows vertical scrolling inside the sidebar */
}

/* Adjust the main content area */
.content {        /* Offset by the width of the sidebar */
  width: 90%;               /* Remaining width */
  height: 100%;             /* Scrollable content */
}
</style>
