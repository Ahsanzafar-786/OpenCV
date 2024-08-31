<template>
  <div class="image-display-container">
    <div class="image-display-header">
      <h1 style="margin: 0; text-align: left;">Image Display</h1>
    </div>
    <div class="image-display-content">
      <div class="image-display">
        <div v-if="images.length === 0" class="no-images">No images captured.</div>
        <div v-else class="image-container">
          <img :src="currentImage" alt="Displayed Image" class="image-element">
          <div class="image-info">
            Image #{{ currentIndex + 1 }} of {{ totalImages }}
          </div>
        </div>
      </div>
      <div class="control-buttons-container">
        <div class="control-buttons">
          <button @click="firstImage">First</button>
          <button @click="previousImage">Previous</button>
          <button @click="nextImage">Next</button>
          <button @click="lastImage">Last</button>
        </div>
      </div>
    </div>
    <div class="image-display-footer">
      Image #{{ currentIndex + 1 }} of {{ totalImages }}
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
  justify-content: center;
  height: 100%;
  /* Ensures the container takes up the full height */
  width: 100%;
  /* Ensures the container takes up the full width */
  position: relative;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* Ensures no overflow from the image */
}

.image-element {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  /* Ensures the image fits within the container without cropping */
}

.image-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Semi-transparent background for readability */
  color: white;
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
  font-size: 16px;
}

.no-images {
  color: white;
  font-size: 18px;
  text-align: center;
}

.image-display-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1e1e1e;
  /* Background color similar to video capture area */
}

.image-display-header {
  border:1px solid white;
  background-color: #333;
  color: white;
  padding: 5px 5px 5px 25px;
  text-align: center;
}

.image-display-content {
  display: flex;
  flex: 1;
  /* This makes sure the content section takes up the remaining height */
}



.image-element {
  width: 100%;
  object-fit: contain;
  /* Ensures the image fits within the container, maintaining aspect ratio */
}



.control-buttons-container {
  border:1px solid white;
  width: 90px;
  /* Set a fixed width for the control buttons area */
  background-color: #333;
  /* Background color for the control buttons area */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.control-buttons {
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Center the buttons vertically */
}

button {
  margin: 5px 0;
  padding: 10px;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #666;
}
.image-display-footer {
  border:1px solid white;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #333;
  width: 100%;
  height: 50px;
  color: white;
  border:1px solid white;
 
  text-align: center;
}
</style>
