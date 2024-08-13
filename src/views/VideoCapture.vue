<!-- src/views/VideoCapture.vue -->
<template>
  <div class="video-capture">
    <div class="sidebar">
      <button @click="navigateTo('video')">Video</button>
      <button @click="navigateTo('image')">Image</button>
    </div>
    <div class="content">
      <video ref="videoElement" width="640" height="480" autoplay></video>
      <div class="buttons">
        <button @click="startVideo">Start</button>
        <button @click="stopVideo">Stop</button>
        <button @click="captureImage">Capture</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoCapture",
  methods: {
    navigateTo(page) {
      this.$router.push({ name: page });
    },
    startVideo() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.$refs.videoElement.srcObject = stream;
          this.stream = stream;
        })
        .catch((error) => {
          console.error("Error accessing webcam: ", error);
        });
    },
    stopVideo() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
      }
    },
    captureImage() {
      const video = this.$refs.videoElement;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `capture_${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      });
    },
  },
  beforeUnmount() {
    this.stopVideo();
  },
};
</script>

<style scoped>
.video-capture {
  display: flex;
  height: 100%;
  background-color: #121212;
}

.sidebar {
  width: 100px;
  display: flex;
  flex-direction: column;
}

.sidebar button {
  margin: 10px;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.buttons {
  margin-top: 20px;
}

.buttons button {
  margin: 5px;
  padding: 10px;
  background-color: #555;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
