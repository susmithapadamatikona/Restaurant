function initMenuInteractions() {
  const grid = document.querySelector("#menuGrid");
  if (!grid) return;
  const filters = document.querySelector("#filters");
  const cats = ["All", "Veg", "Non-Veg", "Chinese", "Italian", "Indian", "Mexican", "Desserts", "Beverages"];
  let state = { cat:"All", q:"", sort:"featured", page:1 };
  filters.innerHTML = cats.map(c => `<button class="chip ${c === "All" ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  const render = () => {
    let items = DATA.dishes.filter(d => (state.cat === "All" || d.cat === state.cat) && d.name.toLowerCase().includes(state.q));
    if (state.sort === "priceAsc") items.sort((a,b)=>a.price-b.price);
    if (state.sort === "priceDesc") items.sort((a,b)=>b.price-a.price);
    const per = 6, pages = Math.max(1, Math.ceil(items.length / per));
    state.page = Math.min(state.page, pages);
    grid.innerHTML = items.slice((state.page-1)*per, state.page*per).map(dishCard).join("");
    document.querySelector("#pagination").innerHTML = Array.from({length:pages},(_,i)=>`<button class="chip ${state.page===i+1?"active":""}" data-page-no="${i+1}">${i+1}</button>`).join("");
    attachFavorites();
    document.querySelectorAll("[data-page-no]").forEach(b => b.onclick = () => { state.page = Number(b.dataset.pageNo); render(); });
  };
  filters.querySelectorAll("[data-cat]").forEach(btn => btn.onclick = () => { state.cat = btn.dataset.cat; state.page = 1; filters.querySelectorAll(".chip").forEach(x => x.classList.remove("active")); btn.classList.add("active"); render(); });
  document.querySelector("#menuSearch").oninput = e => { state.q = e.target.value.toLowerCase(); state.page = 1; render(); };
  document.querySelector("#menuSort").onchange = e => { state.sort = e.target.value; render(); };
  document.querySelector("#clearMenu").onclick = () => { state = { cat:"All", q:"", sort:"featured", page:1 }; document.querySelector("#menuSearch").value = ""; document.querySelector("#menuSort").value = "featured"; filters.querySelectorAll(".chip").forEach((x,i)=>x.classList.toggle("active", i===0)); render(); };
  render();
}
