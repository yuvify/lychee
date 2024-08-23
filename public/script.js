let currentWindow = null;

function toggleWindow(url, title) {
  const webosWindow = document.getElementById("webos-window");
  const iframe = document.getElementById("window-content");
  const windowTitle = document.getElementById("window-title");

  if (currentWindow === title) {
    if (webosWindow.classList.contains("hidden")) {
      webosWindow.classList.remove("hidden");
    }
    return;
  }

  iframe.src = url;
  windowTitle.textContent = title;
  webosWindow.classList.remove("hidden");
  currentWindow = title;
}

function minimizeWindow() {
  const webosWindow = document.getElementById("webos-window");
  webosWindow.classList.add("hidden");
}

function closeWindow() {
  const webosWindow = document.getElementById("webos-window");
  webosWindow.classList.add("hidden");
  document.getElementById("window-content").src = "";
  currentWindow = null;
}

document.addEventListener("DOMContentLoaded", () => {
  dragElement(document.getElementById("webos-window"));
  resizeElement(document.getElementById("webos-window"));
});

function dragElement(el) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  el.querySelector(".window-header").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = el.offsetTop - pos2 + "px";
    el.style.left = el.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function resizeElement(el) {
  const handle = el.querySelector(".resize-handle");

  handle.onmousedown = initResize;

  function initResize(e) {
    e.preventDefault();
    document.onmousemove = resize;
    document.onmouseup = stopResize;
  }

  function resize(e) {
    el.style.width = e.clientX - el.offsetLeft + "px";
    el.style.height = e.clientY - el.offsetTop + "px";
  }

  function stopResize() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
