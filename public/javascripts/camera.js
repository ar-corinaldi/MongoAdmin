const openCamera = async () => {
  // { facingMode: { exact: "environment" } }
  let myConstraints = { video: true };
  let mediaStream = await navigator.mediaDevices.getUserMedia(myConstraints);
  console.log(mediaStream);
  const video = document.querySelector("video");

  // console.log(window.URL.createObjectURL);
  // const url = window.URL.createObjectURL(mediaStream);
  // console.log(url);
  video.srcObject = mediaStream;
  video.onloadedmetadata = function (e) {

  };
};

document.querySelector("#camera").addEventListener("click", openCamera);

