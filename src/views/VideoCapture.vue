<template>
 <div class="video-capture-container">
  <div class="video-capture-header">
    <h1 style="margin: 0;text-align: left;">Video Capture</h1>
  </div>
  <div class="video-capture-content">
    <div class="video-capture">
      <video ref="videoElement" autoplay class="video-element"></video>
      <canvas ref="canvasElement" style="display:none;"></canvas>
    </div>
    <div class="control-buttons-container">
      <div class="control-buttons">
        <button @click="startVideo">Start</button>
        <button @click="stopVideo">Stop</button>
        <button @click="captureImage">Capture</button>
      </div>
    </div>
  </div>
  <div class="Video-display-footer">
     Video
    </div>
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
.video-capture-container {
  display: flex;
  
  flex-direction: column;
  height: 100vh;
  background-color: #1e1e1e; /* Background color of the video capture area */
}

.video-capture-header {
  border:1px solid white;
  background-color: #333;
  color: white;
  padding: 5px 5px 5px 25px;
  text-align: center;
}

.video-capture-content {
  display: flex;
  flex: 1; /* This makes sure the content section takes up the remaining height */
}

.video-capture {
  flex: 1; /* Take up all available space on the left */
  position: relative;
}

.video-element {
  width: 100%;
  height: 100vh;
  object-fit: cover; /* Ensures the video covers the area, potentially cropping if aspect ratio differs */
}

.control-buttons-container {
  border:1px solid white;
  width: 80px; /* Set a fixed width for the control buttons area */
  background-color: #333; /* Background color for the control buttons area */
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center the buttons vertically */
}

button {
  margin: 5px 0;
  padding: 10px;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
}
.Video-display-footer {
  border:1px solid white;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #333;
  width: 100%;
  height: 50px;
  color: white;
 
  text-align: center;
}

button:hover {
  background-color: #666;
}
</style>

