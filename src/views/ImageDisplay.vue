<template>
  <div class="image-display">
    
    <div class="main-container">
      <div v-if="images.length === 0">No images captured.</div> <!-- Make sure images is always an array -->
      <img v-else :src="currentImage" alt="Displayed Image" class="main-image">
      <div class="image-info">
        <!-- Safeguard access to currentIndex and images.length -->
        Image #{{ currentIndex + 1 }} of {{ totalImages }}
      </div>
      <div class="controls">
        <button @click="firstImage">First</button>
        <button @click="previousImage">Previous</button>
        <button @click="nextImage">Next</button>
        <button @click="lastImage">Last</button>
      </div>
    </div>
    <div style="border: 1px solid white;display: block;">
    <h1 style="text-align: center;color:white;width: 100%;">Image Display</h1>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['allImages']),
    currentImage() {
      // Check if the index is within the bounds of the array
      return this.images.length ? this.images[this.currentIndex] : null;
    },
    images() {
      return this.allImages || []; // Default to an empty array if undefined
    },
    totalImages() {
      return this.images.length;
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    firstImage() {
      this.currentIndex = 0;
    },
    lastImage() {
      this.currentIndex = this.images.length - 1;
    },
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      }
    },
    previousImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }
  }
};
</script>
<style scoped>
.image-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.main-container {
  width: 100%;
  height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-image {
  max-width: 640px; /* Optimal for responsiveness */
  max-height: 480px;
}

.image-info {
  margin-top: 10px;
  font-size: 18px;
  color: #fff;
}

.controls {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
}

.controls button {
  margin: 5px 0;
  padding: 10px;
  background-color: #555;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
