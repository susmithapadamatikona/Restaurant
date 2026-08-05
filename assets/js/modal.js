function openModal(title, body) {
  const modal = document.querySelector(".modal-backdrop");
  if (!modal) return;
  modal.querySelector(".modal-title").textContent = title;
  modal.querySelector(".modal-body").innerHTML = body;
  modal.classList.add("active");
}
function closeModal() {
  document.querySelector(".modal-backdrop")?.classList.remove("active");
}
