const videoElemenet = document.querySelector("#video");
const button = document.querySelector("#button");

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElemenet.srcObject = mediaStream;
    videoElemenet.onloadedmetadata = () => {
      videoElemenet.play();
    };
  } catch (err) {
    // Catch error here
    console.log("Error", err);
  }
}

// Load
selectMediaStream();
