<template>
  
  <div class="video-capture">
  
    <video ref="videoElement" autoplay class="video-element"></video>
    <canvas ref="canvasElement" style="display:none;"></canvas>
    <div class="control-buttons">
      <button @click="startVideo">Start</button>
      <button @click="stopVideo">Stop</button>
      <button @click="captureImage">Capture</button>
    </div>
  </div>
  <div style="border: 1px solid white;">
    <h1 style="text-align: center;color:white;">Video Capture</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoStream: null,
    };
  },
  methods: {
    async startVideo() {
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.$refs.videoElement.srcObject = this.videoStream;
      } catch (error) {
        console.error("Error accessing webcam: ", error);
      }
    },
    stopVideo() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => track.stop());
        this.videoStream = null;
      }
    },
    captureImage() {
      const canvas = this.$refs.canvasElement;
      const context = canvas.getContext('2d');
      const video = this.$refs.videoElement;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL('image/png');
      this.saveImage(imageDataUrl);
    },
    saveImage(imageDataUrl) {
      // Dispatch action to add image to Vuex store
      this.$store.dispatch('addImage', imageDataUrl);

      // Optionally download the image
      const link = document.createElement('a');
      link.href = imageDataUrl;
      link.download = 'captured.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
.video-capture {
  display: flex;
  height: 500px;
  position: relative; /* Establishes a positioning context for absolute children */
  background-color: #1e1e1e;
  color: white;
  padding: 20px;
  overflow: hidden; /* Prevents scrollbars */
}

.video-element {
  max-width: 100%;
  height: 80%; /* Ensures the video does not exceed the container width */
  aspect-ratio: 16 / 9; /* Maintains video aspect ratio */
}

.control-buttons {
  position: fixed; /* Fixed position relative to the viewport */
  right: 20px; /* Positioned 20px from the right edge of the viewport */
  top: 50%; /* Positioned at the center vertically */
  transform: translateY(-50%); /* Centers the buttons vertically */
  display: flex;
  flex-direction: column;
}

button {
  margin: 10px 0;
  padding: 10px;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #666;
}
</style>
