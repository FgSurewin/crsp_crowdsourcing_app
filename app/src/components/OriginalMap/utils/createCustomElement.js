export function createOverlayElement() {
  const el = document.createElement("div");
  el.style.position = "absolute";
  el.style.cursor = "pointer";
  return el;
}
