<template>
  <div class="image-display">
    <div class="image-area">
      <!-- Place for the image or video display -->
    </div>
    <div class="navigation">
      <button @click="first">First</button>
      <button @click="previous">Pre.</button>
      <button @click="next">Next</button>
      <button @click="last">Last</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageDisplay",
  methods: {
    first() {},
    previous() {},
    next() {},
    last() {},
  },
};
</script>

<style scoped>
.image-display {
  display: flex;
  justify-content: space-between;
}

.image-area {
  flex-grow: 1;
}

.navigation {
  display: flex;
  flex-direction: column;
}

button {
  padding: 10px;
  margin: 5px;
  background-color: #eee;
}
</style>
