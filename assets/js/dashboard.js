function initDashboardInteractions() {
  // Dashboards ship as static HTML, so the signed-in identity is filled in here.
  const user = currentUser();
  document.querySelectorAll("[data-user-email]").forEach(el => { el.textContent = user?.email || "guest@stackly.com"; });
  document.querySelectorAll("[data-user-name]").forEach(el => { el.textContent = user?.name || "Demo User"; });
}
function dashNavs(role) {
  if (role === "admin") return ["Dashboard","Customers","Reservations","Orders","Revenue","Menu Categories","Food Management","Chef Management","Branch Management","Gallery","Offers","Blog","Messages","Notifications","Reports","Analytics","Settings"];
  if (role === "chef") return ["Dashboard","Today's Orders","Pending Orders","Completed Orders","Menu Management","Add Dish","Edit Dish","Delete Dish","Inventory Status","Customer Reviews","Messages","Reports","Profile"];
  return ["Dashboard","Reservations","Favorite Dishes","Order History","Coupons","Notifications","Messages","Profile","Settings"];
}
function dashSlug(name) {
  return name.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function dashFile(role, name) {
  return name === "Dashboard" ? `${role}-dashboard.html` : `${role}-${dashSlug(name)}.html`;
}
function renderDashboard(app, role, view) {
  const user = currentUser();
  const navs = dashNavs(role);
  const active = navs.includes(view) ? view : "Dashboard";
  const roleLabel = role[0].toUpperCase() + role.slice(1);
  app.innerHTML = `<div class="dashboard-layout"><aside class="sidebar"><a class="dash-brand" href="index.html"><img src="assets/images/stackly-logo.webp" alt="Stackly"></a><span class="eyebrow">${role} Portal</span><h3 data-user-name>${user?.name || "Demo User"}</h3><span class="sidebar-email" data-user-email>${user?.email || "guest@stackly.com"}</span><nav class="dash-nav">${navs.map(n=>`<a class="${n===active?"active":""}" href="${dashFile(role,n)}"><i class="fa-solid fa-${dashIcon(n)}"></i>${n}</a>`).join("")}</nav><div class="dash-side-foot"><a href="index.html"><i class="fa-solid fa-arrow-left"></i> Back to site</a><button data-logout><i class="fa-solid fa-right-from-bracket"></i> Sign out</button></div></aside><div class="dashboard-main"><div class="inline-actions"><div><span class="eyebrow">${roleLabel} Portal</span><h1>${active}</h1></div><div class="dash-actions"><div class="dash-user"><i class="fa-solid fa-circle-user"></i><div><strong data-user-name>${user?.name || "Demo User"}</strong><span data-user-email>${user?.email || "guest@stackly.com"}</span></div></div><a class="btn btn-primary" href="404.html"><i class="fa-solid fa-plus"></i> New Booking</a></div></div><div id="dashPanel">${dashboardPanel(active, role)}</div>${active === "Dashboard" ? dashboardExtras(role) : ""}</div></div>`;
}
function dashboardExtras(role) {
  const head = (eyebrow, title) => `<div class="inline-actions"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2></div></div>`;
  const cards = items => `<div class="grid grid-3">${items.map(x => `<article class="card card-body"><span class="tag">${x.tag}</span><h3>${x.title}</h3><p>${x.copy}</p></article>`).join("")}</div>`;
  if (role === "admin") {
    return `<section class="section mt-0">${head("Branch Performance", "Last seven days, all rooms.")}<div class="table-wrap"><table><thead><tr><th>Room</th><th>Covers</th><th>Revenue</th><th>Avg Spend</th><th>Occupancy</th><th>Trend</th></tr></thead><tbody>
      <tr><td>Astor Flagship, New York</td><td>1,480</td><td>$186,400</td><td>$126</td><td>94%</td><td><span class="status success">Up 6%</span></td></tr>
      <tr><td>Marylebone House, London</td><td>1,120</td><td>$138,900</td><td>$124</td><td>91%</td><td><span class="status success">Up 3%</span></td></tr>
      <tr><td>Marina Terrace, Dubai</td><td>1,640</td><td>$201,200</td><td>$123</td><td>88%</td><td><span class="status warning">Down 2%</span></td></tr>
      <tr><td>Colaba Pavilion, Mumbai</td><td>1,390</td><td>$96,300</td><td>$69</td><td>96%</td><td><span class="status success">Up 9%</span></td></tr>
      <tr><td>Aoyama Counter, Tokyo</td><td>364</td><td>$88,700</td><td>$244</td><td>99%</td><td><span class="status success">Full</span></td></tr>
    </tbody></table></div></section>
    <section class="section mt-0">${head("Needs Attention", "Three things worth opening today.")}${cards([
      { tag:"Staffing", title:"Dubai is two chefs short", copy:"Marina Terrace has run the last four services below brigade strength. Occupancy is holding but the covers trend has turned negative." },
      { tag:"Supply", title:"Wren day boats cancelled", copy:"Weather has stopped two of four boats for the week. New York and London need the seafood course swapped before Thursday service." },
      { tag:"Reviews", title:"Pacing flagged at Marina", copy:"Six survey responses this week mention waits between courses three and four. Same pattern that preceded the London fix in March." }
    ])}</section>
    <section class="section mt-0">${head("Team Activity", "Recent changes across the group.")}<div class="table-wrap"><table><thead><tr><th>When</th><th>Who</th><th>Action</th><th>Scope</th><th>Status</th></tr></thead><tbody>
      <tr><td>Today, 09:14</td><td>R. Moreau</td><td>Menu revision published</td><td>All rooms</td><td><span class="status success">Live</span></td></tr>
      <tr><td>Today, 08:02</td><td>E. Sordi</td><td>Reserve list repriced</td><td>New York, London</td><td><span class="status success">Live</span></td></tr>
      <tr><td>Yesterday</td><td>Events desk</td><td>Buyout confirmed, 110 guests</td><td>Astor Flagship</td><td><span class="status info">Scheduled</span></td></tr>
      <tr><td>Yesterday</td><td>A. Rao</td><td>Masterclass seats released</td><td>New York</td><td><span class="status warning">4 left</span></td></tr>
      <tr><td>2 days ago</td><td>M. Bellini</td><td>Lisbon build sign-off</td><td>Pre-opening</td><td><span class="status info">In progress</span></td></tr>
    </tbody></table></div></section>`;
  }
  if (role === "chef") {
    return `<section class="section mt-0">${head("Today's Prep", "Ordered by when it has to be finished.")}<div class="table-wrap"><table><thead><tr><th>Task</th><th>Station</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody>
      <tr><td>Skim and pass the veal stock</td><td>Sauce</td><td>L. Fontaine</td><td>08:30</td><td><span class="status success">Done</span></td></tr>
      <tr><td>Laminate the morning pastry</td><td>Pastry</td><td>A. Rao</td><td>09:00</td><td><span class="status success">Done</span></td></tr>
      <tr><td>Split and season fruitwood</td><td>Fire</td><td>T. Ilić</td><td>10:30</td><td><span class="status warning">In progress</span></td></tr>
      <tr><td>Portion lobster for 40 covers</td><td>Garde manger</td><td>P. Nandan</td><td>11:00</td><td><span class="status warning">In progress</span></td></tr>
      <tr><td>Taste and log September ferments</td><td>Garde manger</td><td>P. Nandan</td><td>15:00</td><td><span class="status info">Not started</span></td></tr>
      <tr><td>Rewrite specials board</td><td>Pass</td><td>Head chef</td><td>17:30</td><td><span class="status info">Not started</span></td></tr>
    </tbody></table></div></section>
    <section class="section mt-0">${head("Inventory Watch", "What could stop a dish tonight.")}${cards([
      { tag:"Critical", title:"Lobster, 12 portions left", copy:"Enough for first seating only. Either cap the veloute on the board or pull it after 8 PM. Next delivery is Thursday morning." },
      { tag:"Low", title:"Black truffle, 180g", copy:"Two services at current pace. The risotto is the only dish drawing on it, so it holds unless the counter runs long." },
      { tag:"Watch", title:"Cultured butter, Thursday churn", copy:"Wren Valley churns to order. Confirm tomorrow's quantity before four or we cook Friday without it." }
    ])}</section>
    <section class="section mt-0">${head("Tonight's Stations", "Brigade assignments for dinner service.")}<div class="table-wrap"><table><thead><tr><th>Station</th><th>Chef</th><th>Covers</th><th>Dishes</th><th>Status</th></tr></thead><tbody>
      <tr><td>Sauce</td><td>L. Fontaine</td><td>All</td><td>Wagyu, lobster, risotto</td><td><span class="status success">Ready</span></td></tr>
      <tr><td>Fire</td><td>T. Ilić</td><td>All</td><td>Wagyu, paneer, leek</td><td><span class="status success">Ready</span></td></tr>
      <tr><td>Garde manger</td><td>P. Nandan</td><td>All</td><td>Tartare, burrata, consomme</td><td><span class="status warning">Prep running</span></td></tr>
      <tr><td>Pastry</td><td>A. Rao</td><td>All</td><td>Panna cotta, petit fours</td><td><span class="status success">Ready</span></td></tr>
      <tr><td>Counter</td><td>Head chef</td><td>24</td><td>Two seatings, no printed menu</td><td><span class="status info">7 PM and 9 PM</span></td></tr>
    </tbody></table></div></section>`;
  }
  return `<section class="section mt-0">${head("Coming Up", "What is already in your name.")}${cards([
    { tag:"14 Aug", title:"Table for two, 7:30 PM", copy:"Astor Flagship, counter seats 7 and 8 as usual. Reference RSV-4821. Free to change or cancel until 12 August." },
    { tag:"14 Aug", title:"Barolo Cellar Residency", copy:"Six pours, twenty-four seats, one long table. Paid in full and transferable to another guest until the day before." },
    { tag:"27 Sep", title:"Pastry Masterclass, waitlist", copy:"Sixteen places and you are fourth in line. We release waitlist seats seventy-two hours out as cancellations come in." }
  ])}</section>
  <section class="section mt-0">${head("Your Membership", "Cellar Member, since March 2023.")}<div class="grid grid-2"><div class="surface-pad"><h3>Using this year</h3><p><i class="fa-solid fa-check gold"></i> 14 of 24 guaranteed weekend tables used</p><p><i class="fa-solid fa-check gold"></i> 10% reserve list discount, applied automatically</p><p><i class="fa-solid fa-check gold"></i> 2 residency evenings booked on priority access</p><p class="muted mt-2">Six more visits unlocks Counter Circle, which adds a standing counter reservation and waived private room hire twice a year.</p></div><div class="surface-pad"><h3>Worth knowing</h3><p>Your shellfish allergy is on every booking and reaches the brigade at the morning briefing.</p><p>Counter seats 7 and 8 are now your default whenever the counter is free on your date.</p><p>Elena has you noted for low intervention reds, which is why your pairing flight is never quite the printed one.</p></div></div></section>
  <section class="section mt-0">${head("Picked For You", "Based on what you have favourited.")}<div class="grid grid-3">${DATA.dishes.slice(0, 3).map(dishCard).join("")}</div></section>`;
}
function dashIcon(n) {
  if (n.includes("Order")) return "bell-concierge";
  if (n.includes("Reservation")) return "calendar-check";
  if (n.includes("Menu") || n.includes("Dish") || n.includes("Food")) return "utensils";
  if (n.includes("Revenue") || n.includes("Analytics") || n.includes("Reports")) return "chart-line";
  if (n.includes("Message")) return "message";
  if (n.includes("Settings")) return "gear";
  if (n.includes("Profile") || n.includes("Chef") || n.includes("Customer")) return "user";
  return "diamond";
}
function dashboardPanel(view, role) {
  const reservations = TastyStorage.get("reservations", []);
  const orders = TastyStorage.get("orders", []);
  const users = TastyStorage.get("users", []);
  if (view !== "Dashboard") return `<section class="section mt-0"><div class="surface-pad"><h2>${view}</h2><p class="lead">${view} tools are functional demo panels backed by LocalStorage data for Stackly ${role} operations.</p>${view.includes("Reservation") ? reservationTable(reservations) : view.includes("Order") ? orderTable(orders) : editableList(view)}</div></section>`;
  return `<div class="widget-grid"><div class="widget"><span>Reservations</span><strong>${reservations.length}</strong></div><div class="widget"><span>Orders</span><strong>${orders.length}</strong></div><div class="widget"><span>Revenue</span><strong>$42.8k</strong></div><div class="widget"><span>Guests</span><strong>${users.length * 248}</strong></div></div><div class="chart-grid"><div class="chart-card"><h3>Monthly Revenue</h3>${barChart([32,55,46,68,72,88,78])}</div><div class="chart-card"><h3>Popular Dishes</h3>${barChart([86,64,42,38,92,34,24])}</div></div><section class="section mt-0"><div class="grid grid-2"><div>${reservationTable(reservations)}</div><div>${orderTable(orders)}</div></div></section>`;
}
function barChart(values) { return `<div class="bar-chart">${values.map(v => `<div class="bar" style="height:${v}%"><span>${v}</span></div>`).join("")}</div>`; }
function reservationTable(rows) { return `<div class="table-wrap"><table><thead><tr><th>ID</th><th>Guest</th><th>Date</th><th>Time</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.id}</td><td>${r.name}</td><td>${r.date}</td><td>${r.time}</td><td><span class="status ${r.status==="Confirmed"?"success":"warning"}">${r.status}</span></td></tr>`).join("")}</tbody></table></div>`; }
function orderTable(rows) { return `<div class="table-wrap"><table><thead><tr><th>ID</th><th>Guest</th><th>Dish</th><th>Total</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.id}</td><td>${r.guest}</td><td>${r.dish}</td><td>$${r.total}</td><td><span class="status ${r.status==="Completed"?"success":r.status==="Pending"?"warning":"info"}">${r.status}</span></td></tr>`).join("")}</tbody></table></div>`; }
function editableList(view) { return `<form class="form mt-2" onsubmit="event.preventDefault(); toast('${view} saved.');"><div class="form-grid"><input required placeholder="Title"><input required placeholder="Status or category"></div><textarea placeholder="Notes"></textarea><button class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save ${view}</button></form>`; }
