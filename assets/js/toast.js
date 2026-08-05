function toast(message, type = "success") {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    document.body.appendChild(wrap);
  }
  const item = document.createElement("div");
  item.className = `toast ${type}`;
  item.textContent = message;
  wrap.appendChild(item);
  setTimeout(() => item.remove(), 3400);
}
