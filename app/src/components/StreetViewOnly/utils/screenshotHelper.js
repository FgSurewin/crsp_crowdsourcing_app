export function detectBrowser() {
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) !== -1
  ) {
    return "Opera";
  } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
    return "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") !== -1) {
    return "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
    return "Firefox";
  } else if (
    navigator.userAgent.indexOf("MSIE") !== -1 ||
    !!document.documentMode === true
  ) {
    return "IE"; //crap
  } else {
    return "Unknown";
  }
}

export function stopCapture(videoElem) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
}

export async function startCapture(displayMediaOptions) {
  let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    console.log("CAPTURE...");
  } catch (err) {
    console.error("Error: " + err);
    return err;
  }
  return captureStream;
}

export function takeScreenShot(canvasElem, videoElem) {
  canvasElem.width = videoElem.videoWidth;
  canvasElem.height = videoElem.videoHeight;
  const cutHeight = canvasElem.height * 0.085;
  canvasElem
    .getContext("2d")
    .drawImage(
      videoElem,
      0,
      cutHeight,
      canvasElem.width,
      canvasElem.height - 2.25 * cutHeight,
      0,
      0,
      canvasElem.width,
      canvasElem.height
    );
  const imgSrc = canvasElem.toDataURL("image/webp", 0.92);
  stopCapture(videoElem);
  return {
    imgSrc,
    imgSize: [canvasElem.width, canvasElem.height],
  };
}
