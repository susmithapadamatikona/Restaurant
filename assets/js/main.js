const IMG = "https://images.unsplash.com/";
/* Every delivered image is WebP and under 100 KB. Compressibility varies
   enormously between photos, so width and quality are tuned per photo rather
   than globally - regenerate with: node tools/tune-images.js
   Each entry is [width, quality] per display role. */
const IMG_Q = {
  "photo-1414235077428-338989a2e8c0": { hero: [1280,44], card: [760,80], chef: [600,80], panel: [900,80] },
  "photo-1466978913421-dad2ebd01d17": { hero: [900,38], card: [760,50], chef: [600,80], panel: [900,38] },
  "photo-1476124369491-e7addf5db371": { hero: [1280,80], card: [760,80], chef: [600,80], panel: [900,80] },
  "photo-1488477181946-6428a0291777": { hero: [1280,44], card: [760,80], chef: [600,80], panel: [900,68] },
  "photo-1504674900247-0877df9cc836": { hero: [900,32], card: [760,44], chef: [600,74], panel: [900,32] },
  "photo-1512621776951-a57141f2eefd": { hero: [1280,26], card: [760,56], chef: [600,80], panel: [900,44] },
  "photo-1514933651103-005eec06c04b": { hero: [900,38], card: [760,44], chef: [600,80], panel: [900,38] },
  "photo-1517248135467-4c7edcad34c4": { hero: [900,44], card: [760,56], chef: [600,80], panel: [900,44] },
  "photo-1540420773420-3366772f4999": { hero: [600,32], card: [600,32], chef: [600,32], panel: [760,26] },
  "photo-1544025162-d76694265947": { hero: [1280,32], card: [760,80], chef: [600,80], panel: [900,56] },
  "photo-1544145945-f90425340c7e": { hero: [1280,44], card: [760,80], chef: [600,80], panel: [900,68] },
  "photo-1550966871-3ed3cdb5ed0c": { hero: [1280,68], card: [760,80], chef: [600,80], panel: [900,80] },
  "photo-1551218808-94e220e084d2": { hero: [900,32], card: [760,38], chef: [600,56], panel: [900,32] },
  "photo-1551632436-cbf8dd35adfa": { hero: [1280,44], card: [760,80], chef: [600,80], panel: [900,74] },
  "photo-1552566626-52f8b828add9": { hero: [900,38], card: [760,50], chef: [600,80], panel: [900,38] },
  "photo-1555396273-367ea4eb4db5": { hero: [900,32], card: [760,44], chef: [600,68], panel: [900,32] },
  "photo-1559339352-11d035aa65de": { hero: [900,44], card: [760,56], chef: [600,80], panel: [900,44] },
  "photo-1563245372-f21724e3856d": { hero: [1280,74], card: [760,80], chef: [600,80], panel: [900,80] },
  "photo-1574966739987-65e38db0f7ce": { hero: [1280,62], card: [760,80], chef: [600,80], panel: [900,80] },
  "photo-1577219491135-ce391730fb2c": { hero: [1280,26], card: [760,50], chef: [600,74], panel: [900,44] },
  "photo-1578474846511-04ba529f0b88": { hero: [1280,38], card: [760,80], chef: [600,80], panel: [900,56] },
  "photo-1583394293214-28ded15ee548": { hero: [1280,50], card: [760,80], chef: [600,80], panel: [900,80] },
  "photo-1631452180519-c014fe946bc7": { hero: [1280,26], card: [760,50], chef: [600,80], panel: [900,44] }
};
function img(id, role = "card", extra = "") {
  const spec = (IMG_Q[id] && IMG_Q[id][role]) || [760, 56];
  return `${IMG}${id}?fm=webp&fit=crop&w=${spec[0]}&q=${spec[1]}${extra}`;
}
const DATA = {
  dishes: [
    { id:1, name:"Saffron Lobster Veloute", cat:"Non-Veg", price:86, time:"28 min", img:img("photo-1551218808-94e220e084d2", "card"), desc:"Butter-poached lobster, saffron cream, fennel pollen, and smoked caviar." },
    { id:2, name:"Truffle Morel Risotto", cat:"Italian", price:64, time:"24 min", img:img("photo-1476124369491-e7addf5db371", "card"), desc:"Carnaroli rice folded with black truffle, morels, parmesan, and aged balsamic." },
    { id:3, name:"Charcoal Paneer Royal", cat:"Indian", price:42, time:"22 min", img:img("photo-1631452180519-c014fe946bc7", "card"), desc:"Tandoor paneer, cashew silk curry, fenugreek, and edible gold dust." },
    { id:4, name:"Jade Dumpling Consomme", cat:"Chinese", price:38, time:"18 min", img:img("photo-1563245372-f21724e3856d", "card"), desc:"Crystal dumplings in clarified mushroom tea with ginger and chive oil." },
    { id:5, name:"Mole Wagyu Short Rib", cat:"Mexican", price:92, time:"36 min", img:img("photo-1544025162-d76694265947", "card"), desc:"Slow glazed wagyu, cacao mole, blue corn, and pickled heirloom onion." },
    { id:6, name:"Garden Jewel Tartare", cat:"Veg", price:34, time:"16 min", img:img("photo-1512621776951-a57141f2eefd", "card"), desc:"Compressed beetroot, avocado cream, citrus pearls, and toasted seeds." },
    { id:7, name:"Rose Gold Panna Cotta", cat:"Desserts", price:24, time:"12 min", img:img("photo-1488477181946-6428a0291777", "card"), desc:"Vanilla bean custard with rose gelee, pistachio dust, and gold leaf." },
    { id:8, name:"Smoked Fig Elixir", cat:"Beverages", price:18, time:"8 min", img:img("photo-1544145945-f90425340c7e", "card"), desc:"Fig, thyme smoke, citrus bitters, and sparkling botanical tonic." },
    { id:9, name:"Burrata Amalfi", cat:"Italian", price:36, time:"14 min", img:img("photo-1540420773420-3366772f4999", "card"), desc:"Burrata, Amalfi lemon oil, basil salt, roasted tomato, and focaccia glass." }
  ],
  chefs: [
    { name:"Rafael Moreau", role:"Executive Chef", img:img("photo-1583394293214-28ded15ee548", "chef"), note:"French technique with coastal Indian spice architecture." },
    { name:"Anika Rao", role:"Pastry Director", img:img("photo-1577219491135-ce391730fb2c", "chef"), note:"Architectural desserts, floral infusions, and precise plated drama." },
    { name:"Marco Bellini", role:"Chef de Cuisine", img:img("photo-1574966739987-65e38db0f7ce", "chef"), note:"Modern Italian tasting menus shaped by fire and fermentation." }
  ],
  gallery: [
    "photo-1414235077428-338989a2e8c0", "photo-1559339352-11d035aa65de", "photo-1517248135467-4c7edcad34c4",
    "photo-1514933651103-005eec06c04b", "photo-1550966871-3ed3cdb5ed0c", "photo-1552566626-52f8b828add9",
    "photo-1555396273-367ea4eb4db5", "photo-1466978913421-dad2ebd01d17", "photo-1551632436-cbf8dd35adfa"
  ].map(id => img(id, "card")),
  branches: [
    { city:"New York", room:"Astor Flagship", address:"12 Astor Lane, Manhattan", phone:"+1 212 555 0198", hours:"12:00 PM - 12:00 AM", seats:120, note:"The original room, the chef counter, and the cellar library downstairs." },
    { city:"London", room:"Marylebone House", address:"48 Wigmore Street, W1U", phone:"+44 20 7946 0821", hours:"12:30 PM - 11:30 PM", seats:96, note:"A quieter salon built for long dinners and rare pours by the glass." },
    { city:"Dubai", room:"Marina Terrace", address:"Level 34, Marina Gate", phone:"+971 4 555 0142", hours:"1:00 PM - 1:00 AM", seats:140, note:"Open-fire kitchen with a terrace running the full length of the room." },
    { city:"Mumbai", room:"Colaba Pavilion", address:"9 Mandlik Road, Colaba", phone:"+91 22 5550 8834", hours:"12:00 PM - 12:30 AM", seats:110, note:"Coastal spice, monsoon produce, and our most theatrical dessert trolley." },
    { city:"Singapore", room:"Keong Saik Salon", address:"27 Keong Saik Road", phone:"+65 6555 0176", hours:"12:00 PM - 11:00 PM", seats:88, note:"Twelve counter seats, one fermentation room, and a very short menu." },
    { city:"Paris", room:"Rue Saint-Marc", address:"6 Rue Saint-Marc, 2e", phone:"+33 1 55 50 62 10", hours:"12:00 PM - 11:00 PM", seats:74, note:"Classical technique, market menus, and a cheese cart worth the detour." },
    { city:"Tokyo", room:"Aoyama Counter", address:"3-12-4 Minami-Aoyama", phone:"+81 3 5555 0117", hours:"5:00 PM - 12:00 AM", seats:52, note:"Dinner only. Fourteen courses, served in near silence between plates." }
  ],
  events: [
    { name:"Barolo Cellar Residency", tag:"Wine", date:"Fri 14 Aug", time:"7:30 PM", price:"$180", seats:"24 seats", desc:"Six pours from three Piedmont houses, matched to a short fire-led menu." },
    { name:"Jazz Service: Late Set", tag:"Music", date:"Sat 22 Aug", time:"9:00 PM", price:"$95", seats:"60 seats", desc:"A trio at the pass, a supper menu, and service that runs past midnight." },
    { name:"Four Hands with Chef Ito", tag:"Collaboration", date:"Thu 04 Sep", time:"7:00 PM", price:"$240", seats:"32 seats", desc:"Rafael cooks alongside Aoyama's head chef for one ten-course evening." },
    { name:"Harvest Table", tag:"Seasonal", date:"Sun 14 Sep", time:"1:00 PM", price:"$120", seats:"40 seats", desc:"A long shared table built entirely from the week's market delivery." },
    { name:"Pastry Masterclass", tag:"Workshop", date:"Sat 27 Sep", time:"11:00 AM", price:"$150", seats:"16 seats", desc:"Anika walks through tempering, gelee, and plated dessert architecture." },
    { name:"New Year Tasting Gala", tag:"Celebration", date:"Wed 31 Dec", time:"8:00 PM", price:"$395", seats:"Full room", desc:"Twelve courses, a midnight pour, and the kitchen brigade on the floor." }
  ],
  posts: [
    { id:1, title:"The Architecture of a Tasting Menu", tag:"Kitchen", date:"28 Jul 2026", read:"7 min", author:"Rafael Moreau", excerpt:"A composed menu works like a room: entrance, tension, release, and memory. Here is how we sequence a night." },
    { id:2, title:"Reading a Cellar Before You Buy It", tag:"Cellar", date:"12 Jul 2026", read:"5 min", author:"Elena Sordi", excerpt:"Our sommelier on tasting young vintages, tracking storage history, and why label prestige is the weakest signal." },
    { id:3, title:"Why We Ferment Everything in September", tag:"Technique", date:"29 Jun 2026", read:"6 min", author:"Marco Bellini", excerpt:"Late summer gluts become winter depth. A look inside the fermentation room and the eleven jars we never sell." },
    { id:4, title:"Designing Light for a Dark Room", tag:"Design", date:"08 Jun 2026", read:"4 min", author:"Studio Kavan", excerpt:"Every plate is lit twice: once for the guest, once for the memory. Notes from the lighting rebuild." },
    { id:5, title:"The Case for a Shorter Menu", tag:"Kitchen", date:"21 May 2026", read:"5 min", author:"Rafael Moreau", excerpt:"We cut the menu from thirty-two dishes to nine. Waste fell by a third and the room got quieter." },
    { id:6, title:"Field Notes: Kerala Pepper Harvest", tag:"Travel", date:"03 May 2026", read:"8 min", author:"Anika Rao", excerpt:"Two weeks on the Malabar coast tracing the pepper, cardamom, and vanilla that anchor our spice pantry." }
  ],
  reviews: [
    { name:"Maya Lin", city:"New York", rating:5, occasion:"Chef counter", text:"The team read the table beautifully. Every course arrived with purpose, and nothing felt rushed or performed." },
    { name:"Arjun Mehta", city:"Mumbai", rating:5, occasion:"Anniversary", text:"Our anniversary dinner felt personal from the first glass to the final dessert plate. They remembered details we never mentioned twice." },
    { name:"Sofia Grant", city:"London", rating:5, occasion:"Tasting menu", text:"Watching the menu come together beside the pass made the whole night feel alive. Worth booking the counter seats." },
    { name:"Daniel Okafor", city:"Dubai", rating:4, occasion:"Business dinner", text:"I have hosted four client dinners here. The pacing lets a conversation happen, which is rarer than it should be." },
    { name:"Yuki Tanaka", city:"Tokyo", rating:5, occasion:"Solo dining", text:"Dining alone at the counter never felt like an afterthought. The kitchen talked me through every plate without hovering." },
    { name:"Camille Roux", city:"Paris", rating:5, occasion:"Private salon", text:"We took the salon for twenty guests. Custom menu, one host all evening, and not a single thing we had to chase." }
  ],
  rooms: [
    { name:"The Cellar Library", seats:"6 - 12 guests", price:"From $180 per guest", desc:"A vaulted room lined with the reserve list. Best for close celebrations and quiet negotiations." },
    { name:"Astor Salon", seats:"14 - 28 guests", price:"From $155 per guest", desc:"Our largest private room, with its own bar, service door, and full AV rig for presentations." },
    { name:"The Pass", seats:"4 - 8 guests", price:"From $240 per guest", desc:"Seats directly at the kitchen counter. The brigade cooks and narrates the menu in front of you." },
    { name:"Full Room Buyout", seats:"Up to 120 guests", price:"On request", desc:"The whole floor, a bespoke menu, floral direction, and a dedicated event lead from first call to last pour." }
  ],
  faqs: [
    { group:"Before You Arrive", items:[
      { q:"What is the dress code?", a:"Smart casual. Jackets are welcome but never required, and we ask guests to avoid sportswear and beachwear in the evening service." },
      { q:"Can you handle dietary requirements?", a:"Yes. Tell us at least 48 hours ahead and the kitchen will rebuild the menu rather than remove courses. We cook full vegetarian, vegan, and gluten-free tasting menus nightly." },
      { q:"Are children welcome?", a:"Children are welcome before 7 PM at every branch. After 7 PM we keep the room adults-only so the pacing holds." },
      { q:"Is parking available?", a:"Valet runs from 6 PM at the Astor, Marina, and Colaba rooms. All other branches sit within a short walk of public parking." }
    ]},
    { group:"Reservations", items:[
      { q:"How far ahead should I book?", a:"Two to three weeks for weekends, and roughly six weeks for the chef counter. Weekday tables often open the same day." },
      { q:"Do you take deposits?", a:"A deposit applies to the chef table and all private dining bookings. It comes straight off your final bill." },
      { q:"What is the cancellation window?", a:"Cancel or amend free of charge up to 48 hours before service. Inside that window the deposit is retained." },
      { q:"Can I request a specific table?", a:"Leave a note on your booking and the concierge will do their best. Counter and window seats are allocated on the day." }
    ]},
    { group:"Events & Private Dining", items:[
      { q:"What is the minimum spend?", a:"It varies by room, night, and season. The events team will quote a firm figure with your menu proposal." },
      { q:"Can we bring our own wine?", a:"Yes, up to two bottles per table with a corkage fee, provided the label is not already on our list." },
      { q:"Do you cater outside the restaurant?", a:"For full buyouts and partner venues only. Send the brief to the concierge desk and we will tell you honestly if it fits." },
      { q:"Is the room accessible?", a:"Every branch has step-free access, accessible restrooms, and adjustable seating. Tell us in advance and we will set the room accordingly." }
    ]}
  ]
};

function initChrome() {
  initThirdPartyEnhancements();
  const app = document.querySelector("#app");
  if (!document.querySelector(".loader")) document.body.insertAdjacentHTML("afterbegin", `<div class="loader"><div class="loader-inner"><img class="loader-logo" src="assets/images/stackly-logo.webp" alt="Stackly"><span class="loader-bar"><span></span></span></div></div>`);
  if (!document.querySelector(".progress")) document.body.insertAdjacentHTML("afterbegin", `<div class="progress"></div>`);
  const page = document.body.dataset.page || "";
  // Auth and dashboard pages render standalone, without the site header/footer.
  const bareChrome = page === "auth" || page.includes("dashboard");
  if (!bareChrome && !document.querySelector(".site-header")) app.insertAdjacentHTML("beforebegin", headerHtml());
  if (!bareChrome && !document.querySelector(".site-footer")) document.body.insertAdjacentHTML("beforeend", footerHtml());
  if (!document.querySelector(".modal-backdrop")) document.body.insertAdjacentHTML("beforeend", modalHtml());
  if (!document.querySelector(".back-top")) document.body.insertAdjacentHTML("beforeend", `<button class="back-top" title="Back to top"><i class="fa-solid fa-arrow-up"></i></button>`);
  if (!document.querySelector(".lightbox")) document.body.insertAdjacentHTML("beforeend", `<div class="lightbox"><img alt="Stackly gallery preview"></div>`);
  if (!document.querySelector(".cursor-dot")) document.body.insertAdjacentHTML("beforeend", `<div class="cursor-dot"></div>`);
  setTimeout(() => document.querySelector(".loader")?.classList.add("hide"), 450);
  const nav = document.querySelector(".nav-links");
  document.querySelector(".hamburger")?.addEventListener("click", () => nav.classList.toggle("open"));
  document.body.classList.remove("light-mode");
  localStorage.removeItem("theme");
  const profile = document.querySelector(".profile-menu");
  profile?.querySelector("button")?.addEventListener("click", () => profile.classList.toggle("open"));
  document.querySelectorAll("[data-logout]").forEach(btn => btn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    toast("Signed out.");
    setTimeout(() => location.href = "login.html", 400);
  }));
  document.addEventListener("click", e => {
    if (!profile?.contains(e.target)) profile?.classList.remove("open");
  });
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    document.querySelector(".progress").style.width = `${max > 0 ? Math.max(0, scrollY / max) * 100 : 0}%`;
    document.querySelector(".back-top").classList.toggle("show", scrollY > 520);
  });
  document.querySelector(".back-top").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  document.addEventListener("mousemove", e => { const c = document.querySelector(".cursor-dot"); c.style.left = `${e.clientX}px`; c.style.top = `${e.clientY}px`; });
  markActive();
  revealOnScroll();
}

function initThirdPartyEnhancements() {
  const aosCss = document.createElement("link");
  aosCss.rel = "stylesheet";
  aosCss.href = "https://unpkg.com/aos@2.3.4/dist/aos.css";
  document.head.appendChild(aosCss);
  [
    "https://unpkg.com/aos@2.3.4/dist/aos.js",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
  ].forEach(src => {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.onload = () => {
      if (window.AOS) AOS.init({ duration: 750, once: true, offset: 80 });
      if (window.gsap) gsap.from(".hero-panel", { y: 26, opacity: 0, duration: .9, ease: "power3.out" });
    };
    document.head.appendChild(script);
  });
}

function headerHtml() {
  const user = currentUser();
  return `<header class="site-header"><div class="container nav">
    <a class="brand" href="index.html"><img src="assets/images/stackly-logo.webp" alt="Stackly"></a>
    <nav class="nav-links">
      <a href="index.html">Home</a><a href="about.html">About</a><a href="menu.html">Menu</a><a href="reservation.html">Reservations</a><a href="gallery.html">Gallery</a><a href="blog.html">Blog</a><a href="contact.html">Contact</a>
      <div class="nav-auth-mobile">${user
        ? `<a href="${roleHome(user.role)}">Dashboard</a><a href="profile.html">Profile</a><a href="settings.html">Settings</a><button class="btn btn-ghost" data-logout><i class="fa-solid fa-right-from-bracket"></i> Logout</button>`
        : `<a class="btn btn-ghost" href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a><a class="btn btn-primary" href="register.html"><i class="fa-solid fa-user-plus"></i> Register</a>`}</div>
    </nav>
    <div class="nav-actions">
      ${user
        ? `<span class="profile-menu"><button class="icon-btn" title="Profile"><i class="fa-solid fa-user"></i></button><span class="profile-dropdown glass"><a href="${roleHome(user.role)}">Dashboard</a><a href="profile.html">Profile</a><a href="settings.html">Settings</a><button data-logout>Logout</button></span></span>`
        : `<a class="btn btn-ghost nav-auth" href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a><a class="btn btn-primary nav-auth" href="register.html"><i class="fa-solid fa-user-plus"></i> Register</a>`}
      <button class="icon-btn hamburger" title="Menu"><i class="fa-solid fa-bars"></i></button>
    </div></div></header>`;
}
const SOCIALS = [
  { id: "Instagram", icon: "fa-instagram" },
  { id: "Facebook", icon: "fa-facebook-f" },
  { id: "X", icon: "fa-x-twitter" },
  { id: "YouTube", icon: "fa-youtube" },
  { id: "TikTok", icon: "fa-tiktok" }
];
function socialLinks() {
  return SOCIALS.map(s => `<a class="social" href="404.html" aria-label="Stackly on ${s.id}" title="${s.id}"><i class="fa-brands ${s.icon}"></i></a>`).join("");
}
function footerHtml() {
  const column = (title, links) => `<div class="footer-col"><h4>${title}</h4>${links.map(([href, label]) => `<a href="404.html">${label}</a>`).join("")}</div>`;
  return `<footer class="site-footer">
    <div class="container footer-cta">
      <div><span class="eyebrow">The Guest List</span><h3>Kitchen notes, and residency seats before they go public.</h3></div>
      <form class="newsletter" data-newsletter><input name="email" type="email" placeholder="Your email address" required><button class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> Subscribe</button></form>
    </div>
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="brand" href="404.html"><img src="assets/images/stackly-logo.webp" alt="Stackly"></a>
        <p>Luxury fine dining, cinematic tasting menus, private salons, and chef-led hospitality across seven city rooms.</p>
        <div class="socials">${socialLinks()}</div>
      </div>
      ${column("Restaurant", [["about.html","About Us"],["our-story.html","Our Story"],["our-chefs.html","Our Chefs"],["branches.html","Branches"]])}
      ${column("Experience", [["menu.html","Our Menu"],["reservation.html","Reservations"],["events.html","Events"],["private-dining.html","Private Dining"]])}
      ${column("Support", [["contact.html","Contact"],["faq.html","FAQ"],["blog.html","Journal"],["offers.html","Offers"]])}
      <div class="footer-col footer-contact">
        <h4>Visit Us</h4>
        <p><i class="fa-solid fa-location-dot"></i><span>12 Astor Lane, New York</span></p>
        <p><i class="fa-solid fa-phone"></i><span>+1 212 555 0198</span></p>
        <p><i class="fa-solid fa-envelope"></i><span>concierge@stackly.example</span></p>
        <p><i class="fa-regular fa-clock"></i><span>Open daily, 12 PM - 12 AM</span></p>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© 2026 Stackly. Crafted for fine dining.</span>
      <span class="footer-legal"><a href="404.html">Privacy</a><a href="404.html">Terms</a><a href="404.html">Press</a></span>
    </div>
  </footer>`;
}
function modalHtml() { return `<div class="modal-backdrop" onclick="if(event.target===this)closeModal()"><div class="modal glass"><div class="inline-actions"><h3 class="modal-title"></h3><button class="icon-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button></div><div class="modal-body"></div></div></div>`; }
function markActive() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === page));
}
function revealOnScroll() {
  // assets/js/animations.js owns scroll reveals when it is loaded; running both
  // would leave two observers fighting over opacity and transform on the same
  // elements. This simpler pass stays as the fallback if it is ever removed.
  if (window.StacklyMotion) return;
  const obs = new IntersectionObserver(items => items.forEach(i => i.target.classList.toggle("visible", i.isIntersecting)), { threshold:.13 });
  document.querySelectorAll(".section, .card, .surface-pad").forEach(el => { el.classList.add("reveal"); obs.observe(el); });
}
function initCommonForms() {
  document.querySelectorAll("[data-newsletter]").forEach(form => form.addEventListener("submit", e => { e.preventDefault(); toast("You are on the private list."); form.reset(); }));
  document.querySelectorAll("[data-reservation]").forEach(form => form.addEventListener("submit", e => {
    e.preventDefault();
    const reservation = { id:`RSV-${Date.now().toString().slice(-4)}`, name:form.name.value, date:form.date.value, time:form.time.value, guests:form.guests.value, status:"Pending", request:form.request?.value || "" };
    const reservations = TastyStorage.get("reservations", []);
    reservations.unshift(reservation); TastyStorage.set("reservations", reservations);
    openModal("Reservation Request Received", `<p>Your ${reservation.time} table for ${reservation.guests} is in our concierge queue.</p><p class="gold">${reservation.id}</p>`);
    form.reset();
  }));
  document.querySelectorAll("[data-contact]").forEach(form => form.addEventListener("submit", e => { e.preventDefault(); toast("Message sent to the concierge desk."); form.reset(); }));
}
function heroImage(url) {
  // Page heroes reuse card URLs; swap in the hero-sized, size-capped variant.
  const id = (url.match(/photo-[a-z0-9-]+/) || [])[0];
  return id ? img(id, "hero") : url;
}
function pageHero(title, copy, img) {
  return `<section class="page-hero"><img src="${heroImage(img)}" alt="${title}"><div class="container"><span class="eyebrow">Stackly</span><h1>${title}</h1><p class="lead">${copy}</p></div></section>`;
}
function dishCard(d) {
  const fav = TastyStorage.get("favorites", []).includes(d.id);
  return `<article class="card image-card menu-card" data-dish="${d.id}"><img src="${d.img}" alt="${d.name}"><div class="card-body"><div class="menu-title-row"><div><span class="tag">${d.cat}</span><h3>${d.name}</h3></div><button class="favorite" data-fav="${d.id}" title="Favorite"><i class="fa-${fav ? "solid" : "regular"} fa-heart"></i></button></div><p>${d.desc}</p><div class="dish-meta"><span><i class="fa-regular fa-clock"></i> ${d.time}</span><span><i class="fa-solid fa-star"></i> Chef pick</span></div><div class="inline-actions"><span class="price">$${d.price}</span><a class="btn btn-ghost" href="404.html">Details</a></div></div></article>`;
}
function reservationForm(compact = false) {
  return `<form class="${compact ? "quick-reserve glass" : "form surface-pad"}" data-reservation>
    <input name="name" placeholder="Guest name" required><input name="date" type="date" required><input name="time" type="time" required><input name="guests" type="number" min="1" max="18" placeholder="Guests" required>${compact ? "" : `<textarea name="request" maxlength="240" aria-describedby="requestHint" placeholder="Occasion, allergies, seating preference"></textarea><p class="hint" id="requestHint">Optional. Up to 240 characters for occasions, allergies, accessibility needs, or seating preferences.</p>`}<button class="btn btn-primary"><i class="fa-solid fa-calendar-check"></i> Reserve</button>
  </form>`;
}
function attachFavorites() {
  document.querySelectorAll("[data-fav]").forEach(btn => btn.addEventListener("click", () => {
    const id = Number(btn.dataset.fav); let favs = TastyStorage.get("favorites", []);
    favs = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id];
    TastyStorage.set("favorites", favs); btn.innerHTML = `<i class="fa-${favs.includes(id) ? "solid" : "regular"} fa-heart"></i>`; toast(favs.includes(id) ? "Added to favorites." : "Removed from favorites.");
  }));
}
function initPage() {
  const page = document.body.dataset.page || "home";
  const app = document.querySelector("#app");
  if (!app.children.length) {
    if (page === "home") renderHome(app);
    else if (page === "menu") renderMenu(app);
    else if (page === "menu-details") renderMenuDetails(app);
    else if (page === "reservation") renderReservation(app);
    else if (page.includes("dashboard")) renderDashboard(app, page.split("-")[0], document.body.dataset.view || "Dashboard");
    else if (page === "auth") renderAuth(app, document.body.dataset.auth);
    else renderStandard(app, page);
  }
  initCommonForms(); attachFavorites(); handleAuthForms(); initGallery(); initMenuInteractions(); initDashboardInteractions(); animateCounters();
}
/* Single full-bleed background for the home hero: the dining room with the
   gold screens. Held as one constant so the markup and this renderer stay in
   step. */
const HERO_IMAGE = img("photo-1517248135467-4c7edcad34c4", "hero");

/** Static background layer for the home hero. */
function heroBackground() {
  return `<img class="hero-bg hero-bg-clear" src="${HERO_IMAGE}" alt="" aria-hidden="true">`;
}
function renderHome(app) {
  app.innerHTML = `<section class="hero home-hero">${heroBackground()}<div class="container hero-content"><div class="hero-panel"><span class="eyebrow">Luxury Fine Dining</span><h1>Stackly</h1><div class="lux-line"></div><p class="lead">A dark, cinematic dining house where tasting menus, private rituals, and chef-led service meet modern luxury.</p><div class="hero-actions"><a class="btn btn-primary" href="404.html"><i class="fa-solid fa-calendar-check"></i> Reserve Table</a><a class="btn btn-ghost" href="404.html"><i class="fa-solid fa-utensils"></i> Explore Menu</a></div><ul class="hero-meta"><li><i class="fa-solid fa-star"></i> <strong>4.9</strong> / 5 &middot; 2,400+ guests</li><li><i class="fa-solid fa-utensils"></i> 7-course tasting menu</li><li><i class="fa-solid fa-location-dot"></i> 7 city branches</li><li><i class="fa-solid fa-clock"></i> Dinner 6pm &ndash; 11:30pm</li></ul></div></div></section><div class="reservation-ribbon"><div class="container">${reservationForm(true)}</div></div>
  ${homeSections()}`;
}
function homeSections() {
  return `<section class="section"><div class="container section-head"><div><span class="eyebrow">Today's Special</span><h2>Popular Dishes</h2></div><p>Signature plates balancing fire, fragrance, texture, and service theatre.</p></div><div class="container grid grid-3">${DATA.dishes.slice(0,6).map(dishCard).join("")}</div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">Experience</span><h2>Private, polished, and deeply personal.</h2><p class="lead">From champagne carts to tableside carving, the room moves around your evening with quiet precision.</p><div class="stat-row mt-2"><div class="stat"><strong data-count="24">0</strong><span>Chef seats</span></div><div class="stat"><strong data-count="18">0</strong><span>Course pairings</span></div><div class="stat"><strong data-count="96">0</strong><span>Guest rating</span></div><div class="stat"><strong data-count="7">0</strong><span>Branches</span></div></div></div><div class="media-stack"><img src="${img("photo-1559339352-11d035aa65de")}" alt="Fine dining plate"><img src="${img("photo-1550966871-3ed3cdb5ed0c")}" alt="Luxury service"></div></div></section>
  <section class="section"><div class="container section-head"><div><span class="eyebrow">Meet Our Chef</span><h2>Chef Recommendations</h2></div><a class="btn btn-ghost" href="404.html">All Chefs</a></div><div class="container grid grid-3">${DATA.chefs.map(c => `<article class="card chef-card"><img src="${c.img}" alt="${c.name}"><div class="card-body"><h3>${c.name}</h3><span class="tag">${c.role}</span><p>${c.note}</p></div></article>`).join("")}</div></section>
  <section class="section alt"><div class="container section-head"><div><span class="eyebrow">Tasting Journey</span><h2>Evenings built course by course.</h2></div><p>Each menu moves through texture, temperature, aroma, and a final quiet finish.</p></div><div class="container grid grid-4"><article class="card card-body"><span class="tag">01</span><h3>Arrival Bite</h3><p>A bright first taste with citrus, herbs, and crisp texture to open the palate.</p></article><article class="card card-body"><span class="tag">02</span><h3>Fire Course</h3><p>Charcoal, smoke, and slow reductions anchor the center of the evening.</p></article><article class="card card-body"><span class="tag">03</span><h3>Cellar Pairing</h3><p>Wine and zero-proof pairings are matched by weight, spice, and finish.</p></article><article class="card card-body"><span class="tag">04</span><h3>Sweet Close</h3><p>Floral desserts, warm service, and a final pour finish the room gently.</p></article></div></section>
  <section class="section"><div class="container split"><div class="media-stack"><img src="${img("photo-1414235077428-338989a2e8c0")}" alt="Private dining room"><img src="${img("photo-1514933651103-005eec06c04b")}" alt="Restaurant table setting"></div><div><span class="eyebrow">Private Dining</span><h2>Rooms for moments that need their own rhythm.</h2><p class="lead">Host proposals, launch dinners, leadership tables, and milestone celebrations with dedicated service, custom menus, and a room planned around your guest list.</p><div class="hero-actions"><a class="btn btn-primary" href="404.html"><i class="fa-solid fa-champagne-glasses"></i> Plan Event</a><a class="btn btn-ghost" href="404.html"><i class="fa-solid fa-calendar-days"></i> View Events</a></div></div></div></section>
  <section class="section alt"><div class="container section-head"><div><span class="eyebrow">Guest Notes</span><h2>Evenings guests remember.</h2></div><a class="btn btn-ghost" href="404.html">More Reviews</a></div><div class="container grid grid-3"><article class="card card-body"><h3>Flawless pacing.</h3><p>The team read the table beautifully. Every course arrived with purpose, and nothing felt rushed.</p><span class="tag">Maya Lin</span></article><article class="card card-body"><h3>Private room magic.</h3><p>Our anniversary dinner felt personal from the first glass to the final dessert plate.</p><span class="tag">Arjun Mehta</span></article><article class="card card-body"><h3>Chef table theatre.</h3><p>Watching the menu come together beside the pass made the whole night feel alive.</p><span class="tag">Sofia Grant</span></article></div></section>
  <section class="section alt"><div class="container section-head"><div><span class="eyebrow">Gallery Preview</span><h2>Cinematic Dining</h2></div><a class="btn btn-primary" href="404.html">View Gallery</a></div><div class="container gallery-grid">${DATA.gallery.slice(0,6).map(src => `<div class="gallery-item"><img src="${src}" alt="Stackly gallery"></div>`).join("")}</div></section>
  <section class="section"><div class="container grid grid-3"><article class="offer-card card"><h3>Golden Hour Menu</h3><p>Five courses with aperitif pairings before 6 PM.</p><span class="price">25% Off</span></article><article class="offer-card card"><h3>Chef Table</h3><p>Counter seats with Rafael's unreleased test kitchen plates.</p><span class="price">$145</span></article><article class="offer-card card"><h3>Private Salon</h3><p>Full buyout planning for milestone evenings.</p><span class="price">12 Guests</span></article></div></section>`;
}
function renderReservation(app) {
  app.innerHTML = pageHero("Reservations", "Book the room, the table, and the little moments around it.", img("photo-1578474846511-04ba529f0b88", "card"))
  + `<section class="section"><div class="container split"><div><span class="eyebrow">Concierge</span><h2>Reserve an evening with intention.</h2><p class="lead">Choose your date, guest count, and special requests. Stackly stores demo bookings locally so every dashboard updates instantly.</p><p>Tell us the occasion in the notes field. It is the difference between a table and an evening that was clearly planned for you, and it costs nothing to mention.</p></div>${reservationForm()}</div></section>
  <section class="section alt">${sectionHead("Service Times", "When each sitting runs.")}<div class="container grid grid-3">${noteCards([
    { tag:"Lunch", title:"12:00 PM - 3:00 PM", copy:"A shorter four-course carte, seven days a week. The last lunch order goes in at 2:30 PM." },
    { tag:"Dinner", title:"6:00 PM - 11:15 PM", copy:"Full carte and the tasting menu. The kitchen closes at 11:15 PM but the room stays open until midnight." },
    { tag:"Chef Counter", title:"7:00 PM and 9:00 PM", copy:"Two seatings nightly, twelve seats each. Book roughly six weeks ahead for a weekend." }
  ])}</div></section>
  <section class="section">${sectionHead("Before You Book", "Four things worth knowing.")}<div class="container grid grid-4">${noteCards([
    { tag:"01", title:"Deposits", copy:"Only the chef table and private rooms take a deposit, and it comes straight off your final bill." },
    { tag:"02", title:"Cancellations", copy:"Free to change or cancel up to 48 hours ahead. Inside that window the deposit is retained." },
    { tag:"03", title:"Dietary notes", copy:"Give us 48 hours and the kitchen rebuilds the menu around you rather than removing courses." },
    { tag:"04", title:"Large parties", copy:"Nine guests or more moves to the private dining team, who will plan the menu with you directly." }
  ])}</div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">Need Something Else?</span><h2>Bigger table, private room, or a whole floor.</h2><p class="lead">Parties over eight are handled by the events desk with a dedicated lead who stays in the room for the evening.</p><div class="hero-actions"><a class="btn btn-primary" href="404.html"><i class="fa-solid fa-champagne-glasses"></i> Private Dining</a><a class="btn btn-ghost" href="404.html"><i class="fa-solid fa-location-dot"></i> Other Branches</a></div></div><div class="media-stack"><img src="${DATA.gallery[3]}" alt="Private room"><img src="${DATA.gallery[1]}" alt="Table setting"></div></div></section>
  <section class="section">${sectionHead("After You Book", "What happens between now and the table.")}<div class="container grid grid-4">${noteCards([
    { tag:"Immediately", title:"Written confirmation", copy:"A reference number, the room, and the exact time. Keep it, because every later change is handled against that reference." },
    { tag:"Morning of", title:"Kitchen briefing", copy:"Your dietary notes and occasion reach the full brigade and floor team at the eleven o'clock briefing, before anyone starts cooking." },
    { tag:"On arrival", title:"The table is already set", copy:"Seating preference applied, allergies confirmed quietly at the table rather than announced, and any occasion timed to land when you asked." },
    { tag:"Next morning", title:"One short survey", copy:"Four questions, no incentive to answer. It goes straight to the kitchen and the floor, unfiltered and with your name attached if you leave one." }
  ])}</div></section>
  <section class="section alt">${sectionHead("Availability by Room", "Roughly how far ahead to book.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Room</th><th>Weeknight</th><th>Weekend</th><th>Chef Counter</th><th>Deposit</th></tr></thead><tbody>
    <tr><td>Astor Flagship, New York</td><td>Same day</td><td>3 weeks</td><td>6 weeks</td><td>Counter only</td></tr>
    <tr><td>Marylebone House, London</td><td>Same day</td><td>2 weeks</td><td>5 weeks</td><td>Counter only</td></tr>
    <tr><td>Marina Terrace, Dubai</td><td>Same day</td><td>2 weeks</td><td>4 weeks</td><td>Counter only</td></tr>
    <tr><td>Colaba Pavilion, Mumbai</td><td>2 days</td><td>3 weeks</td><td>5 weeks</td><td>Counter only</td></tr>
    <tr><td>Keong Saik Salon, Singapore</td><td>1 week</td><td>4 weeks</td><td>8 weeks</td><td>All bookings</td></tr>
    <tr><td>Aoyama Counter, Tokyo</td><td>3 weeks</td><td>7 weeks</td><td>Counter only room</td><td>All bookings</td></tr>
  </tbody></table></div><p class="muted mt-2">Cancellations release seats constantly, so a full weekend is always worth a phone call on the day.</p></div></section>`;
}
function renderMenu(app) {
  const cats = ["All", "Veg", "Non-Veg", "Chinese", "Italian", "Indian", "Mexican", "Desserts", "Beverages"];
  app.innerHTML = pageHero("Our Menu", "Filter, search, sort, favorite, and open each crafted dish.", img("photo-1504674900247-0877df9cc836", "card")) + `<section class="section"><div class="container"><div class="menu-toolbar"><input id="menuSearch" placeholder="Search dishes"><select id="menuSort"><option value="featured">Featured</option><option value="priceAsc">Price low to high</option><option value="priceDesc">Price high to low</option></select><button class="btn btn-primary" id="clearMenu"><i class="fa-solid fa-filter-circle-xmark"></i> Clear</button></div><div class="filter-row" id="filters">${cats.map(c => `<button class="chip ${c === "All" ? "active" : ""}" data-cat="${c}">${c}</button>`).join("")}</div><div class="grid grid-3" id="menuGrid">${DATA.dishes.slice(0,6).map(dishCard).join("")}</div><div class="pagination" id="pagination"><button class="chip active" data-page-no="1">1</button><button class="chip" data-page-no="2">2</button></div></div></section>
  <section class="section alt">${sectionHead("Reading the Menu", "What the tags actually mean.")}<div class="container grid grid-4">${noteCards([
    { tag:"Veg / Non-Veg", title:"Dietary marks", copy:"Every dish carries its base classification. Vegan and gluten-free versions of most plates exist on request." },
    { tag:"Chef pick", title:"The kitchen's choice", copy:"Marked by the head chef each week. It is usually whatever arrived best from the market, not the most expensive plate." },
    { tag:"Timing", title:"Kitchen minutes", copy:"The listed time is how long the dish takes from order to pass, so you can pace a shorter lunch properly." },
    { tag:"Price", title:"Inclusive of service", copy:"Prices include service. Nothing is added at the end of the bill beyond local tax." }
  ])}</div></section>
  <section class="section"><div class="container split"><div><span class="eyebrow">Tasting Menu</span><h2>Ten courses, roughly three hours.</h2><p class="lead">The full progression is written weekly and runs for the whole table. It is the most complete argument the kitchen can make.</p><p>Pairings are offered in two forms: six glasses from the cellar, or a zero-proof flight built from house ferments, teas, and cordials. Both are matched by weight and finish rather than by colour.</p><div class="inline-actions mt-2"><span class="price">$185 per guest</span><span class="muted">Pairing from $95</span></div><div class="hero-actions mt-2"><a class="btn btn-primary" href="404.html"><i class="fa-solid fa-calendar-check"></i> Book the Tasting Menu</a><a class="btn btn-ghost" href="404.html"><i class="fa-solid fa-fire"></i> Chef Specials</a></div></div><div class="media-stack"><img src="${DATA.gallery[4]}" alt="Tasting menu course"><img src="${DATA.dishes[6].img}" alt="Dessert course"></div></div></section>
  <section class="section alt">${sectionHead("Allergens", "Ask, and we will rebuild the plate.")}<div class="container grid grid-3">${noteCards([
    { title:"Tell us in advance", copy:"48 hours for the carte and 72 for the tasting menu gives the kitchen time to plan a parallel course rather than strip one out." },
    { title:"Shared equipment", copy:"We cook in one kitchen. We manage cross-contact carefully but cannot promise a fully isolated environment for severe allergies." },
    { title:"Full alternative menus", copy:"Vegetarian, vegan, gluten-free, nut-free, and pescatarian progressions run nightly at every branch." }
  ])}</div></section>
  <section class="section">${sectionHead("Drink Alongside", "Three ways to pair, none of them compulsory.")}<div class="container grid grid-3">${noteCards([
    { tag:"From $95", title:"The cellar flight", copy:"Six glasses matched across the whole progression rather than dish by dish, so nothing peaks too early. Elena rewrites it whenever the menu moves." },
    { tag:"From $65", title:"Zero-proof flight", copy:"Built from the same pantry as the food: house kombucha, verjus, smoked teas, and clarified juices. Not an afterthought and not sweet." },
    { tag:"By the glass", title:"Fourteen bottles open", copy:"A short list, deliberately. Ask the floor team what is drinking well tonight instead of reading it top to bottom." }
  ])}</div></section>
  <section class="section alt">${sectionHead("Menu by Service", "What is available, and when.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Service</th><th>Hours</th><th>Format</th><th>Courses</th><th>From</th></tr></thead><tbody>
    <tr><td>Lunch carte</td><td>12:00 - 3:00 PM</td><td>À la carte</td><td>Choose 3 - 4</td><td>$68</td></tr>
    <tr><td>Golden Hour</td><td>Seated before 6 PM</td><td>Set menu</td><td>5</td><td>$95</td></tr>
    <tr><td>Dinner carte</td><td>6:00 - 11:15 PM</td><td>À la carte</td><td>Choose 3 - 5</td><td>$110</td></tr>
    <tr><td>Tasting menu</td><td>6:00 - 9:30 PM</td><td>Whole table</td><td>10</td><td>$185</td></tr>
    <tr><td>Chef counter</td><td>7:00 and 9:00 PM</td><td>No printed menu</td><td>10 - 14</td><td>$240</td></tr>
  </tbody></table></div><p class="muted mt-2">All prices include service. Pairings are charged separately and are never assumed.</p></div></section>`;
}
function renderMenuDetails(app) {
  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const d = DATA.dishes.find(x => x.id === id) || DATA.dishes[0];
  app.innerHTML = pageHero(d.name, d.desc, d.img) + `<section class="section"><div class="container dish-detail"><div class="dish-gallery"><img class="dish-gallery-main" src="${d.img}" alt="${d.name}"><div class="thumbs">${DATA.dishes.slice(0,4).map(x => `<img src="${x.img}" alt="${x.name}">`).join("")}</div></div><aside class="surface-pad"><span class="tag">${d.cat}</span><h2>${d.name}</h2><p>${d.desc}</p><p><strong>Ingredients:</strong> seasonal herbs, cultured butter, smoked salt, chef stock, citrus oils.</p><div class="nutrition"><div>420<br><span class="muted">kcal</span></div><div>28g<br><span class="muted">protein</span></div><div>18g<br><span class="muted">fat</span></div><div>12g<br><span class="muted">carbs</span></div></div><div class="inline-actions mt-2"><span class="price">$${d.price}</span><span><i class="fa-regular fa-clock"></i> ${d.time}</span></div><button class="btn btn-primary full mt-2" data-fav="${d.id}"><i class="fa-regular fa-heart"></i> Favorite Dish</button></aside></div></section>
  <section class="section alt">${sectionHead("From the Pass", "How this plate is built.")}<div class="container grid grid-3">${noteCards([
    { tag:"Method", title:"Where the time goes", copy:`Most of the ${d.time} listed is finishing, not cooking. The stocks, cures, and bases behind this dish are started at least a day ahead.` },
    { tag:"Pairing", title:"What to drink", copy:"The sommelier pours this against something with acid and restraint rather than weight. Ask for the zero-proof match if you would rather not drink." },
    { tag:"Allergens", title:"Adaptations", copy:"Vegetarian, vegan, and gluten-free versions of this plate exist. Flag it 48 hours ahead and the kitchen rebuilds it properly." }
  ])}</div></section>
  <section class="section">${sectionHead("Where It Comes From", "The three suppliers behind this plate.")}<div class="container grid grid-3">${noteCards([
    { tag:"Produce", title:"Halbrook Farm, Kent", copy:"Delivers twice a week in the same van they have used since 1958. If the crate is wrong at the door we send it back and change the dish rather than cook around it." },
    { tag:"Dairy", title:"Wren Valley", copy:"Cultured butter and cream churned to order for us on a Thursday. It is the single most expensive line on our purchase sheet and the least negotiable." },
    { tag:"Spice", title:"Malabar co-op, Kerala", copy:"Pepper, cardamom, and vanilla bought direct from fourteen families. Anika visits the harvest every second year and prices are agreed for the whole season." }
  ])}</div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">Guest Notes</span><h2>What people say about this one.</h2><p class="lead">Pulled from the survey we send the morning after every direct booking. Unedited apart from length.</p><div class="surface-pad"><p>"I have ordered this on all four visits and it has been slightly different every time. That is apparently the point, which I only found out by asking."</p><p class="muted">Maya Lin, New York</p></div><div class="surface-pad mt-2"><p>"Ask for the zero-proof match with it. I do not drink and it was the first time a restaurant treated that as a proper pairing rather than a consolation."</p><p class="muted">Yuki Tanaka, Tokyo</p></div><a class="btn btn-ghost mt-2" href="testimonials.html"><i class="fa-solid fa-comments"></i> All Guest Notes</a></div><div class="media-stack"><img src="${d.img}" alt="${d.name}"><img src="${DATA.gallery[5]}" alt="Kitchen pass"></div></div></section>
  <section class="section">${sectionHead("Related", "You may also enjoy")}<div class="container grid grid-3">${DATA.dishes.filter(x => x.id !== d.id).slice(0,3).map(dishCard).join("")}</div></section>`;
}
function renderStandard(app, page) {
  const content = {
    about:["About Us","Stackly blends precise hospitality with an intimate, dark-luxury dining language.","Founded for guests who want food, room, light, and sound to feel composed."],
    "our-story":["Our Story","From a twelve-seat tasting room to a multi-branch culinary house.","Every chapter is built around craft, restraint, and memorable service."],
    "special-dishes":["Special Dishes","Limited plates designed around rare harvests and chef technique.","These dishes rotate with market availability and seasonal inspiration."],
    "chef-specials":["Chef Specials","Rafael's current tasting-room edits and off-menu favorites.","A living menu guided by fire, produce, and guest mood."],
    "private-dining":["Private Dining","Salons for proposals, leadership dinners, launches, and milestone celebrations.","Dedicated hosts, bespoke menus, floral direction, and AV-ready rooms."],
    events:["Events","Immersive dining nights, jazz service, wine residencies, and chef collaborations.","Reserve individual seats or plan a full-room experience."],
    gallery:["Gallery","The rooms, plates, textures, and moments that define Stackly.","A visual archive of the restaurant experience."],
    testimonials:["Testimonials","Guest words from evenings remembered long after dessert.","Service, timing, and flavor are tuned as one experience."],
    "our-chefs":["Our Chefs","A disciplined culinary team led by fire, patience, and exacting taste.","Meet the people shaping the menu nightly."],
    offers:["Offers","Seasonal privileges, members-only tastings, and weekday dining invitations.","Luxury value without flattening the experience."],
    branches:["Branches","Seven city rooms with one shared standard of service.","Each branch carries local ingredients and the Stackly signature."],
    faq:["FAQ","Everything guests ask before a polished evening.","Dress, dietary notes, deposits, children, parking, and private dining."],
    blog:["Blog","Kitchen notes, cellar stories, chef travel, and design journals.","Read what shapes the restaurant beyond the plate."],
    "blog-details":["The Architecture of a Tasting Menu","A composed menu works like a room: entrance, tension, release, memory.","Behind the newest Stackly seasonal progression."],
    contact:["Contact","Speak with the concierge desk for reservations, events, and press.","We respond quickly during service hours."],
    profile:["Profile","Manage your guest identity, preferences, and dining notes.","Your demo profile is stored locally on this device."],
    settings:["Settings","Adjust theme, notifications, dashboard preferences, and privacy controls.","These demo settings use LocalStorage."],
    "404":["404","The page slipped off the tasting menu.","Return to the dining room and keep exploring."]
  }[page] || ["Stackly","Luxury dining page","Explore the experience."];
  app.innerHTML = pageHero(content[0], content[1], heroFor(page)) + standardBody(page, content);
}
function heroFor(page) {
  return {
    about: DATA.gallery[0],
    "our-story": DATA.gallery[2],
    "our-chefs": DATA.chefs[2].img,
    "special-dishes": DATA.dishes[4].img,
    "chef-specials": DATA.dishes[0].img,
    "private-dining": DATA.gallery[3],
    events: DATA.gallery[5],
    gallery: DATA.gallery[1],
    testimonials: DATA.gallery[4],
    offers: DATA.dishes[6].img,
    branches: DATA.gallery[7],
    faq: DATA.gallery[8],
    blog: DATA.gallery[6],
    "blog-details": DATA.dishes[1].img,
    contact: DATA.gallery[2],
    profile: DATA.gallery[4],
    settings: DATA.gallery[3],
    "404": DATA.gallery[8]
  }[page] || DATA.gallery[2];
}
function sectionHead(eyebrow, title, aside = "") {
  return `<div class="container section-head"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2></div>${aside}</div>`;
}
function noteCards(items) {
  return items.map(x => `<article class="card card-body">${x.tag ? `<span class="tag">${x.tag}</span>` : ""}<h3>${x.title}</h3><p>${x.copy}</p></article>`).join("");
}
function statRow(stats) {
  return `<div class="stat-row mt-2">${stats.map(s => `<div class="stat"><strong data-count="${s.n}">0</strong><span>${s.label}</span></div>`).join("")}</div>`;
}
function ctaBand(title, copy, primary = { href:"404.html", label:"Reserve a Table", icon:"fa-calendar-check" }, ghost = { href:"404.html", label:"Ask the Concierge", icon:"fa-comments" }) {
  return `<section class="section"><div class="container split"><div><span class="eyebrow">Next Step</span><h2>${title}</h2><p class="lead">${copy}</p><div class="hero-actions"><a class="btn btn-primary" href="${primary.href}"><i class="fa-solid ${primary.icon}"></i> ${primary.label}</a><a class="btn btn-ghost" href="${ghost.href}"><i class="fa-solid ${ghost.icon}"></i> ${ghost.label}</a></div></div><div class="media-stack"><img src="${DATA.gallery[3]}" alt="Stackly dining room"><img src="${DATA.gallery[4]}" alt="Plated course"></div></div></section>`;
}
function introSplit(eyebrow, title, lead, body, imgA = DATA.gallery[0], imgB = DATA.gallery[4]) {
  return `<section class="section"><div class="container split"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2><p class="lead">${lead}</p>${body}</div><div class="media-stack"><img src="${imgA}" alt="Stackly interior"><img src="${imgB}" alt="Stackly plate"></div></div></section>`;
}
function standardBody(page, content) {
  const body = {
    about: aboutBody, "our-story": ourStoryBody, "special-dishes": specialDishesBody, "chef-specials": chefSpecialsBody,
    "private-dining": privateDiningBody, events: eventsBody, gallery: galleryBody, testimonials: testimonialsBody,
    "our-chefs": ourChefsBody, offers: offersBody, branches: branchesBody, faq: faqBody, blog: blogBody,
    "blog-details": blogDetailsBody, contact: contactBody, profile: profileBody, settings: settingsBody, "404": notFoundBody
  }[page];
  if (body) return body();
  return introSplit("Luxury Restaurant", content[0], content[2], `<a class="btn btn-primary" href="reservation.html">Reserve Now</a>`);
}

function aboutBody() {
  return introSplit("Luxury Restaurant", "A dining room built around restraint.",
    "Founded for guests who want food, room, light, and sound to feel composed rather than loud.",
    `<p>Stackly opened in 2009 with twelve seats and a single fire. We still cook the way we did then: a short menu, produce bought the same week, and a brigade that plates every course within arm's reach of the guest. What changed is the number of rooms, not the standard inside them.</p>${statRow([{n:24,label:"Chef seats"},{n:18,label:"Course pairings"},{n:96,label:"Guest rating"},{n:7,label:"Branches"}])}`)
  + `<section class="section alt">${sectionHead("What We Stand For", "Three commitments we do not trade away.")}<div class="container grid grid-3">${noteCards([
    { tag:"01", title:"Sourcing before technique", copy:"We buy from thirty-one growers and four day boats. If the delivery is wrong, the dish comes off the menu that night rather than getting fixed in the pan." },
    { tag:"02", title:"Craft you can watch", copy:"Every branch has an open pass. Stocks run for eighteen hours, pastry is laminated in-house, and nothing arrives at the door pre-portioned." },
    { tag:"03", title:"Service without theatre", copy:"Our floor team is trained to read a table and then leave it alone. Attentive when you look up, invisible when you are mid-sentence." }
  ])}</div></section>
  <section class="section">${sectionHead("Recognition", "Quietly collected, rarely mentioned.")}<div class="container grid grid-4">${noteCards([
    { tag:"2025", title:"Two Michelin Stars", copy:"Retained at the Astor flagship for the fourth consecutive year." },
    { tag:"2024", title:"World's 50 Best, #38", copy:"Highest new entry for a multi-city group that season." },
    { tag:"2024", title:"Sommelier of the Year", copy:"Elena Sordi, for the Barolo and Burgundy reserve programme." },
    { tag:"2023", title:"Design Award, Hospitality", copy:"For the Astor lighting rebuild and the cellar library." }
  ])}</div></section>
  <section class="section alt"><div class="container split"><div class="media-stack"><img src="${DATA.gallery[3]}" alt="Dining room design"><img src="${DATA.gallery[7]}" alt="Room detail"></div><div><span class="eyebrow">The Room</span><h2>Designed to be quiet at full capacity.</h2><p class="lead">A hundred and twenty covers should not sound like it. Most of the build budget went into things guests never consciously notice.</p><p>Acoustic baffling sits above the ceiling panels, the banquettes are filled rather than sprung, and every table is weighted so it cannot rock. Lighting runs at 2200K and drops in four stages across the evening, so the room dims with the service rather than at a switch.</p><p>The bar was moved away from the dining floor in the 2023 rebuild for exactly one reason: you could hear the ice well from table nine.</p></div></div></section>
  <section class="section">${sectionHead("Responsibility", "The parts that are less photogenic.")}<div class="container grid grid-3">${noteCards([
    { tag:"Waste", title:"Under 4% food waste", copy:"Measured weekly against purchase weight. Trim becomes stock, stock becomes glaze, and what is left goes to compost through a local partner." },
    { tag:"Sourcing", title:"31 named growers", copy:"Every producer is listed on the back of the menu. If we cannot name who grew it, it does not get bought." },
    { tag:"People", title:"Four-day kitchen week", copy:"Every brigade runs a four-day rota with paid overtime. It costs more and it is the reason our chefs stay." }
  ])}</div></section>
  <section class="section alt">${sectionHead("A Week at Stackly", "The flagship, in plain numbers.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Measure</th><th>Per Week</th><th>Per Year</th><th>Note</th></tr></thead><tbody>
    <tr><td>Covers served</td><td>1,480</td><td>77,000</td><td>Astor flagship only, lunch and dinner</td></tr>
    <tr><td>Produce deliveries</td><td>11</td><td>572</td><td>Six growers, four day boats, one dairy</td></tr>
    <tr><td>Stock produced</td><td>340 litres</td><td>17,680 litres</td><td>Eighteen-hour reduction, no shortcuts</td></tr>
    <tr><td>Menu revisions</td><td>1</td><td>52</td><td>Rewritten every Monday against the market</td></tr>
    <tr><td>Brigade hours</td><td>1,120</td><td>58,240</td><td>Across a four-day rota, 28 kitchen staff</td></tr>
  </tbody></table></div></div></section>`
  + ctaBand("Come see whether we live up to any of this.", "Book a table, take the counter seats, or send the concierge desk the awkward questions first. We would rather answer them than surprise you.");
}

function ourStoryBody() {
  return introSplit("Since 2009", "It started with twelve seats and one borrowed oven.",
    "Every chapter since has been built around craft, restraint, and service that remembers you.",
    `<p>Rafael Moreau signed the lease on Astor Lane with enough money for six months. The room sat twelve, the menu ran to four courses, and the wine list was a single page taped inside a folder. The first year lost money. The second year the counter filled every night, and it has not really emptied since.</p><a class="btn btn-primary" href="our-chefs.html"><i class="fa-solid fa-users"></i> Meet the Team</a>`,
    DATA.gallery[2], DATA.gallery[1])
  + `<section class="section alt">${sectionHead("Milestones", "Seventeen years, told in five rooms.")}<div class="container grid grid-4">${noteCards([
    { tag:"2009", title:"Astor Lane opens", copy:"Twelve seats, four courses, and a kitchen small enough that the pass doubled as the prep bench." },
    { tag:"2014", title:"The cellar is dug", copy:"We took the basement, lined it with the reserve list, and started seating private dinners underground." },
    { tag:"2019", title:"First branch abroad", copy:"Marylebone House opens in London with the same menu discipline and a much better cheese cart." },
    { tag:"2026", title:"Seven city rooms", copy:"Tokyo joins as the smallest room in the group and the only one that serves dinner exclusively." }
  ])}</div></section>
  <section class="section"><div class="container split"><div class="media-stack"><img src="${DATA.chefs[0].img}" alt="Rafael Moreau"><img src="${DATA.gallery[5]}" alt="Kitchen service"></div><div><span class="eyebrow">The Founder</span><h2>Rafael Moreau on the first year.</h2><p class="lead">"We could not afford a second chef, so I cooked every service for eleven months. It taught me exactly how much a menu can carry before it breaks."</p><p>That constraint became the house rule. Nine dishes on the carte, never more. Anything that cannot be executed perfectly by a brigade under pressure does not go on the menu, however good it tastes at 3 PM in an empty kitchen.</p></div></div></section>
  <section class="section alt">${sectionHead("Philosophy", "What we kept when everything else scaled.")}<div class="container grid grid-3">${noteCards([
    { title:"One standard, seven rooms", copy:"Each branch adapts to its market and its produce, but the pacing, the training, and the pass discipline are identical." },
    { title:"Promote from inside", copy:"Four of our seven head chefs started as commis in the Astor kitchen. The fifth started as a dishwasher in Mumbai." },
    { title:"Waste is a design failure", copy:"Trim becomes stock, stock becomes glaze, glaze becomes the next menu. We measure it weekly and publish it internally." }
  ])}</div></section>
  <section class="section">${sectionHead("What We Got Wrong", "The parts nobody puts in a press release.")}<div class="container grid grid-3">${noteCards([
    { tag:"2012", title:"The thirty-two dish menu", copy:"We expanded the carte to compete with the brasserie next door. Quality dropped, waste tripled, and we spent a year quietly cutting it back to nine." },
    { tag:"2016", title:"The Berlin room", copy:"Opened on ambition rather than a plan, with no head chef ready to run it. Closed after fourteen months. It remains the most expensive lesson we have bought." },
    { tag:"2021", title:"The delivery experiment", copy:"Our food travels badly and we should have known. Six weeks in we stopped, refunded the last orders, and went back to cooking for a room." }
  ])}</div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">Then and Now</span><h2>Seventeen years, side by side.</h2><p class="lead">Almost everything scaled. The two numbers that matter most barely moved, which was the entire point.</p><div class="table-wrap mt-2"><table><thead><tr><th>Measure</th><th>2009</th><th>2026</th></tr></thead><tbody>
    <tr><td>Seats</td><td>12</td><td>680 across 7 rooms</td></tr>
    <tr><td>Dishes on the carte</td><td>4</td><td>9</td></tr>
    <tr><td>Kitchen staff</td><td>1</td><td>196</td></tr>
    <tr><td>Named growers</td><td>3</td><td>31</td></tr>
    <tr><td>Courses at the counter</td><td>10</td><td>10 to 14</td></tr>
  </tbody></table></div></div><div class="media-stack"><img src="${DATA.gallery[6]}" alt="The original room"><img src="${DATA.gallery[8]}" alt="The room today"></div></div></section>
  <section class="section">${sectionHead("In the Press", "How the story was told from outside.")}<div class="container grid grid-3">${noteCards([
    { tag:"2011", title:"\"Twelve seats, no compromise.\"", copy:"The first review we ever received, filed by a critic who had to queue on the street for it. We still have it framed by the pass." },
    { tag:"2019", title:"\"Exporting discipline, not a brand.\"", copy:"On the London opening, and the decision to send our own brigade rather than franchise the name to a local operator." },
    { tag:"2025", title:"\"The rare group that got smaller.\"", copy:"On cutting the carte across all seven rooms in the same week, three years after we could have coasted instead." }
  ])}</div></section>`
  + ctaBand("The next chapter is a table with your name on it.", "Reserve an evening, or read the kitchen journal to see what we are working on right now.", { href:"404.html", label:"Reserve a Table", icon:"fa-calendar-check" }, { href:"404.html", label:"Read the Journal", icon:"fa-book-open" });
}

function specialDishesBody() {
  return `<section class="section">${sectionHead("This Season", "Limited plates, built around rare harvests.", `<a class="btn btn-ghost" href="menu.html">Full Menu</a>`)}<div class="container grid grid-3">${DATA.dishes.slice(0,6).map(dishCard).join("")}</div></section>
  <section class="section alt">${sectionHead("How Limited Plates Work", "Short runs, honest reasons.")}<div class="container grid grid-3">${noteCards([
    { tag:"01", title:"Tied to a single delivery", copy:"Most specials exist because one grower had a good week. When that crate is gone the dish leaves the menu, usually within four or five services." },
    { tag:"02", title:"Tested at the counter first", copy:"Every special runs at the chef counter for two nights before it reaches the dining room, so the pacing and portion are already settled." },
    { tag:"03", title:"Never repeated identically", copy:"A dish that returns next season returns changed. The produce is different, so pretending otherwise would be dishonest." }
  ])}</div></section>
  <section class="section"><div class="container split"><div><span class="eyebrow">Allergens & Substitutions</span><h2>Tell us early and we will rebuild, not remove.</h2><p class="lead">Specials are the hardest dishes to adapt on the night because the produce is finite. With 48 hours of notice the kitchen can plan a parallel plate instead of striking a course from your menu.</p><div class="surface-pad"><p><strong>Full menus available:</strong> vegetarian, vegan, gluten-free, nut-free, pescatarian.</p><p><strong>Notice required:</strong> 48 hours for the carte, 72 hours for the tasting menu.</p><p><strong>Contact:</strong> concierge@stackly.example or +1 212 555 0198.</p></div></div><div class="media-stack"><img src="${DATA.gallery[6]}" alt="Seasonal produce"><img src="${DATA.dishes[8].img}" alt="Plated special"></div></div></section>
  <section class="section alt">${sectionHead("The Producers", "Three growers behind this season's plates.")}<div class="container grid grid-3">${noteCards([
    { tag:"Kent, UK", title:"Halbrook Farm", copy:"Heritage beetroot, forced rhubarb, and the sorrel that finishes the garden tartare. Family-run since 1958 and still delivering in the same van." },
    { tag:"Cornwall, UK", title:"The Wren day boats", copy:"Four boats, landed and driven the same morning. If the sea is bad we serve something else rather than buying from a market." },
    { tag:"Kerala, India", title:"Malabar pepper co-op", copy:"Pepper, cardamom, and vanilla bought direct from a fourteen-family co-operative. Anika visits the harvest every second year." }
  ])}</div></section>
  <section class="section">${sectionHead("Seasonal Calendar", "Roughly when each plate appears.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Window</th><th>Produce Peak</th><th>Likely Plates</th><th>Typical Run</th></tr></thead><tbody>
    <tr><td>Jan - Mar</td><td>Forced rhubarb, citrus, brassicas</td><td>Garden Jewel Tartare, Rose Gold Panna Cotta</td><td>5 - 7 weeks</td></tr>
    <tr><td>Apr - Jun</td><td>Asparagus, morels, early herbs</td><td>Truffle Morel Risotto, Burrata Amalfi</td><td>3 - 4 weeks</td></tr>
    <tr><td>Jul - Sep</td><td>Shellfish, stone fruit, tomatoes</td><td>Saffron Lobster Veloute, Smoked Fig Elixir</td><td>4 - 6 weeks</td></tr>
    <tr><td>Oct - Dec</td><td>Game, roots, ferments from September</td><td>Mole Wagyu Short Rib, Charcoal Paneer Royal</td><td>6 - 8 weeks</td></tr>
  </tbody></table></div></div></section>
  <section class="section alt">${sectionHead("Pairings", "What the cellar pours alongside.")}<div class="container grid grid-3">${noteCards([
    { tag:"Wine", title:"Six glasses, matched by weight", copy:"Elena builds the flight against the whole progression rather than dish by dish, so nothing peaks too early. From $95 per guest." },
    { tag:"Zero-proof", title:"House ferments and cordials", copy:"Built from the same pantry as the food: kombucha, verjus, smoked teas, and clarified juices. From $65 per guest." },
    { tag:"By the glass", title:"A short, opinionated list", copy:"Fourteen wines open at any time. Ask the floor team what is drinking well tonight rather than reading the list top to bottom." }
  ])}</div></section>`
  + ctaBand("Specials move fast. Book before the crate runs out.", "Reservations open twenty-eight days ahead, and the concierge desk will tell you what is actually on the pass this week.");
}

function chefSpecialsBody() {
  return `<section class="section">${sectionHead("On the Pass", "Rafael's current edits and off-menu plates.", `<a class="btn btn-ghost" href="our-chefs.html">Meet the Brigade</a>`)}<div class="container grid grid-3">${DATA.dishes.slice(0,6).map(dishCard).join("")}</div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">The Chef Counter</span><h2>Twenty-four seats, no printed menu.</h2><p class="lead">The counter runs a living menu shaped by fire, produce, and the mood of the room. Nothing is written down until it is served.</p><p>Guests sit an arm's length from the pass. Courses arrive in whatever order the kitchen judges right that night, and Rafael or the head chef narrates each plate as it lands. Expect ten to fourteen courses across roughly three hours.</p><div class="hero-actions"><a class="btn btn-primary" href="reservation.html"><i class="fa-solid fa-utensils"></i> Book the Counter</a><a class="btn btn-ghost" href="private-dining.html"><i class="fa-solid fa-champagne-glasses"></i> Private Rooms</a></div></div><div class="media-stack"><img src="${DATA.gallery[1]}" alt="Chef counter"><img src="${DATA.chefs[2].img}" alt="Chef at the pass"></div></div></section>
  <section class="section">${sectionHead("This Week", "What the kitchen is working through right now.")}<div class="container grid grid-4">${noteCards([
    { tag:"Mon", title:"Market rebuild", copy:"The week's delivery lands and the specials board is rewritten from scratch before service." },
    { tag:"Wed", title:"Fermentation check", copy:"Jars from September get tasted, graded, and either pulled forward or given another month." },
    { tag:"Fri", title:"Counter test plates", copy:"Two new dishes run at the counter only, with direct guest feedback taken between courses." },
    { tag:"Sun", title:"Brigade tasting", copy:"The full team eats the menu together and argues about seasoning until it is settled." }
  ])}</div></section>
  <section class="section alt">${sectionHead("Counter Etiquette", "Nothing formal, but worth knowing.")}<div class="container grid grid-3">${noteCards([
    { tag:"01", title:"Arrive together", copy:"The counter runs as one seating. We hold the first course until every seat is filled, so a late guest delays the whole row rather than just their own plate." },
    { tag:"02", title:"Ask anything", copy:"The brigade would far rather explain a technique than cook in silence. The only bad moment to ask is mid-plate-up, and they will tell you when that is." },
    { tag:"03", title:"Photographs are fine", copy:"Without flash, and please keep the pass itself out of frame. There is usually someone working behind it who did not agree to be photographed." }
  ])}</div></section>
  <section class="section"><div class="container split"><div><span class="eyebrow">Off-Menu</span><h2>Requests the kitchen will actually take.</h2><p class="lead">Not everything is possible mid-service, but more is possible than most guests assume. It costs nothing to ask when you book.</p><div class="surface-pad"><p><strong>Yes, with notice:</strong> a full vegetarian or vegan counter menu, a shorter six-course run, a dish from a previous season if the produce still exists.</p><p><strong>Yes, on the night:</strong> extra of anything you loved, a second pour of a pairing glass, pacing slowed down for a long conversation.</p><p><strong>Honestly, no:</strong> dishes from another branch's market, anything requiring a cure we did not start weeks ago, and steak cooked past medium.</p></div></div><div class="media-stack"><img src="${DATA.dishes[4].img}" alt="Off-menu plate"><img src="${DATA.gallery[5]}" alt="Kitchen pass"></div></div></section>
  <section class="section alt">${sectionHead("The Archive", "Specials that earned a permanent place.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Dish</th><th>First Run</th><th>Services</th><th>Outcome</th></tr></thead><tbody>
    <tr><td>Saffron Lobster Veloute</td><td>Aug 2019</td><td>7</td><td><span class="status success">Now on the carte</span></td></tr>
    <tr><td>Mole Wagyu Short Rib</td><td>Nov 2021</td><td>12</td><td><span class="status success">Now on the carte</span></td></tr>
    <tr><td>Jade Dumpling Consomme</td><td>Feb 2023</td><td>9</td><td><span class="status success">Now on the carte</span></td></tr>
    <tr><td>Sea Urchin Custard</td><td>Jun 2024</td><td>4</td><td><span class="status warning">Retired, sourcing</span></td></tr>
    <tr><td>Charred Leek Royale</td><td>Mar 2025</td><td>2</td><td><span class="status info">Under revision</span></td></tr>
  </tbody></table></div></div></section>`
  + ctaBand("The counter books out first, and it books out early.", "Six weeks ahead for weekends. Weekday seats often open the same afternoon, so it is always worth calling.");
}

function privateDiningBody() {
  return introSplit("Private Dining", "Rooms that keep their own rhythm.",
    "Dedicated hosts, bespoke menus, floral direction, and AV-ready salons for evenings that need to land properly.",
    `<p>Private dining at Stackly is planned by one person from the first call to the last pour. They write the menu with the kitchen, brief the floor team, handle dietary requirements quietly, and stay in the room all evening so you never have to find someone.</p><a class="btn btn-primary" href="#enquiry"><i class="fa-solid fa-paper-plane"></i> Send an Enquiry</a>`,
    DATA.gallery[0], DATA.gallery[3])
  + `<section class="section alt">${sectionHead("The Rooms", "Four spaces, four different evenings.")}<div class="container grid grid-4">${DATA.rooms.map(r => `<article class="offer-card card"><h3>${r.name}</h3><p>${r.desc}</p><div class="dish-meta"><span><i class="fa-solid fa-user-group"></i> ${r.seats}</span></div><span class="price">${r.price}</span></article>`).join("")}</div></section>
  <section class="section">${sectionHead("Included as Standard", "No line items you did not expect.")}<div class="container grid grid-4">${noteCards([
    { tag:"01", title:"A dedicated event lead", copy:"One named contact from enquiry to invoice, in the room for the whole service." },
    { tag:"02", title:"A menu written for you", copy:"The kitchen builds a bespoke progression around your guests, the season, and every dietary note." },
    { tag:"03", title:"Room and table styling", copy:"Floral direction, linen, candles, printed menus, and seating plans set before guests arrive." },
    { tag:"04", title:"AV and connectivity", copy:"Screen, microphone, private wifi, and a sound feed you control, tested the afternoon of your event." }
  ])}</div></section>
  <section class="section alt">${sectionHead("How Planning Runs", "Four steps, about three weeks.")}<div class="container grid grid-4">${noteCards([
    { tag:"Step 1", title:"Brief", copy:"Guest count, date, occasion, and budget. A fifteen minute call is usually enough." },
    { tag:"Step 2", title:"Proposal", copy:"Room, draft menu, wine pairings, and a firm cost within two working days." },
    { tag:"Step 3", title:"Tasting", copy:"For bookings over twenty guests, you and one guest taste the final menu at no charge." },
    { tag:"Step 4", title:"Service", copy:"We set the room, run the evening, and send a single itemised invoice afterwards." }
  ])}</div></section>
  <section class="section">${sectionHead("Private Menus", "Three formats, all written from scratch.")}<div class="container grid grid-3">${noteCards([
    { tag:"Seated", title:"Four to ten courses", copy:"The standard format. A fixed progression for the whole table, plated in the kitchen and served together. Best above twelve guests." },
    { tag:"Family", title:"Shared centrepieces", copy:"Large-format cuts and whole fish carved at the table, with sides passed between guests. Louder, slower, and better for a room that already knows each other." },
    { tag:"Standing", title:"Canape and station", copy:"Twelve to eighteen bites across the evening with two live stations. For launches and receptions where nobody sits down." }
  ])}</div></section>
  <section class="section alt">${sectionHead("Recent Events", "A sample of what the rooms have hosted.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Occasion</th><th>Room</th><th>Guests</th><th>Format</th><th>Duration</th></tr></thead><tbody>
    <tr><td>Series B announcement</td><td>Astor Salon</td><td>26</td><td>Seated, six courses</td><td>3.5 hours</td></tr>
    <tr><td>Fortieth birthday</td><td>The Cellar Library</td><td>12</td><td>Seated, ten courses</td><td>4 hours</td></tr>
    <tr><td>Book launch reception</td><td>Full buyout</td><td>110</td><td>Standing, stations</td><td>3 hours</td></tr>
    <tr><td>Board dinner</td><td>Astor Salon</td><td>18</td><td>Seated, five courses</td><td>2.5 hours</td></tr>
    <tr><td>Engagement dinner</td><td>The Pass</td><td>6</td><td>Counter, fourteen courses</td><td>3 hours</td></tr>
  </tbody></table></div></div></section>
  <section class="section">${sectionHead("Before You Enquire", "The questions the events desk gets most.")}<div class="container grid grid-2">${[
    { q:"Is there a minimum spend?", a:"Yes, and it varies by room, night, and season rather than by a fixed rate card. The proposal quotes one firm figure covering food, drink, and hire together." },
    { q:"When do you need final numbers?", a:"Seventy-two hours before service. You can drop up to 10% of the guest count inside that window without affecting the quote." },
    { q:"Can we run a presentation?", a:"In the Astor Salon, yes. Screen, microphone, and a sound feed you control, tested with your deck on the afternoon of the event." },
    { q:"Do you handle the flowers and printing?", a:"Included as standard. Menus printed with your wording, and floral direction agreed at the proposal stage with our regular florist." },
    { q:"What about a bar tab?", a:"Either a capped tab or full pairings. Both appear as separate lines on the single invoice sent afterwards." },
    { q:"Can we bring a cake or a DJ?", a:"Cakes yes, with a small plating charge. Music depends on the room and the hour, so raise it early and we will tell you honestly." }
  ].map(x => `<article class="card card-body"><h3>${x.q}</h3><p>${x.a}</p></article>`).join("")}</div></section>
  <section class="section alt" id="enquiry"><div class="container split"><div><span class="eyebrow">Events Desk</span><h2>Tell us what the evening needs to do.</h2><p class="lead">The more context you give, the more useful the first proposal will be. Reply usually lands within one working day.</p><div class="surface-pad"><p><strong>Events desk:</strong> +1 212 555 0164</p><p><strong>Email:</strong> events@stackly.example</p><p><strong>Hours:</strong> Monday to Friday, 9 AM - 7 PM</p></div></div><form class="form surface-pad" data-contact><input required placeholder="Name"><input type="email" required placeholder="Email"><input required placeholder="Date and guest count"><textarea required placeholder="Occasion, room preference, dietary notes, budget"></textarea><button class="btn btn-primary">Send Enquiry</button></form></div></section>`;
}

function eventsBody() {
  return `<section class="section">${sectionHead("What's On", "Immersive nights, residencies, and collaborations.", `<a class="btn btn-ghost" href="private-dining.html">Private Events</a>`)}<div class="container grid grid-3">${DATA.events.map((e, i) => `<article class="card image-card"><img src="${DATA.gallery[i % DATA.gallery.length]}" alt="${e.name}"><div class="card-body"><span class="tag">${e.tag}</span><h3>${e.name}</h3><p>${e.desc}</p><div class="dish-meta"><span><i class="fa-regular fa-calendar"></i> ${e.date}</span><span><i class="fa-regular fa-clock"></i> ${e.time}</span></div><div class="inline-actions"><span class="price">${e.price}</span><a class="btn btn-ghost" href="reservation.html">Reserve</a></div><p class="muted">${e.seats}</p></div></article>`).join("")}</div></section>
  <section class="section alt">${sectionHead("The Calendar", "Everything currently open for booking.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Event</th><th>Type</th><th>Date</th><th>Time</th><th>Seats</th><th>Per Guest</th></tr></thead><tbody>${DATA.events.map(e => `<tr><td>${e.name}</td><td>${e.tag}</td><td>${e.date}</td><td>${e.time}</td><td>${e.seats}</td><td>${e.price}</td></tr>`).join("")}</tbody></table></div></div></section>
  <section class="section">${sectionHead("Booking Notes", "Read these before you reserve a seat.")}<div class="container grid grid-3">${noteCards([
    { title:"Seats are individual", copy:"Event seats are sold per guest, not per table. Larger parties may be seated across the shared table rather than together." },
    { title:"Paid at booking", copy:"Event tickets are charged in full when you reserve, and transfer to another guest free of charge up to 24 hours before." },
    { title:"Dietary notes welcome", copy:"Give us 72 hours and the kitchen will run a parallel menu for the evening rather than adapting plates on the night." }
  ])}</div></section>
  <section class="section"><div class="container split"><div><span class="eyebrow">How Seating Works</span><h2>Most events are one long table.</h2><p class="lead">Residencies and collaborations seat everybody together. It is the format the kitchen cooks best and, awkward as it sounds beforehand, the one guests write to us about afterwards.</p><p>You are placed rather than seated on arrival, with parties kept adjacent and solo guests deliberately put next to someone the floor team thinks they will get on with. Workshops and masterclasses run differently: individual stations, own bench, own kit.</p><div class="hero-actions"><a class="btn btn-primary" href="reservation.html"><i class="fa-solid fa-calendar-check"></i> Book a Seat</a><a class="btn btn-ghost" href="faq.html"><i class="fa-solid fa-circle-question"></i> Common Questions</a></div></div><div class="media-stack"><img src="${DATA.gallery[3]}" alt="Long shared table"><img src="${DATA.gallery[1]}" alt="Event service"></div></div></section>
  <section class="section alt">${sectionHead("Past Evenings", "What previous events actually looked like.")}<div class="container grid grid-3">${noteCards([
    { tag:"March", title:"Rioja Residency", copy:"Sold out in nine hours. Eight pours, a whole lamb shoulder carved at the table, and a room that would not leave until half past one." },
    { tag:"May", title:"Four Hands with Chef Okonjo", copy:"Lagos meets the Astor kitchen across ten courses. The jollof course is still requested by guests who were not even there." },
    { tag:"June", title:"Midsummer Harvest Table", copy:"Forty guests, one table, and a menu written the same morning from whatever the Kent delivery brought. Repeating this September." }
  ])}</div></section>
  <section class="section">${sectionHead("Never Miss One", "Seats go to the guest list first.")}<div class="container split"><div><h3>Twenty-four hours of priority</h3><p class="lead">Event seats are released to registered guests a full day before they go public. Most residencies never make it past that window.</p><p>Create an account or subscribe below and you will get one email per announcement. Nothing else, and you can turn it off in settings at any time.</p><form class="newsletter" data-newsletter><input name="email" type="email" placeholder="Email for event announcements" required><button class="btn btn-primary" title="Subscribe"><i class="fa-solid fa-paper-plane"></i></button></form></div><div class="surface-pad"><h3>Booking at a glance</h3><p><strong>Released:</strong> guest list 24 hours early, then public.</p><p><strong>Payment:</strong> in full at the time of booking.</p><p><strong>Transfers:</strong> free to another guest up to 24 hours before.</p><p><strong>Refunds:</strong> up to 7 days before, minus a small admin fee.</p><p><strong>Dietary notes:</strong> 72 hours ahead for a parallel menu.</p></div></div></section>`
  + ctaBand("Want the room to yourself instead?", "Full buyouts, launch dinners, and leadership tables are planned by the events desk with a dedicated lead.", { href:"private-dining.html", label:"Plan a Private Event", icon:"fa-champagne-glasses" }, { href:"404.html", label:"Ask the Concierge", icon:"fa-comments" });
}

function galleryBody() {
  return `<section class="section"><div class="container gallery-grid">${DATA.gallery.map(src => `<div class="gallery-item"><img src="${src}" alt="Stackly gallery"></div>`).join("")}</div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">Behind the Frame</span><h2>Shot during service, not staged after it.</h2><p class="lead">Every image here was taken in a working room with guests in it. Nothing is styled for the camera and no dish is rebuilt afterwards.</p><p>We photograph one service a season across the seven branches. The plates you see are the plates that went out, lit by the room's own fixtures, which is why some of them are darker than a brochure would allow.</p><div class="hero-actions"><a class="btn btn-primary" href="404.html"><i class="fa-solid fa-calendar-check"></i> See It In Person</a><a class="btn btn-ghost" href="404.html"><i class="fa-solid fa-utensils"></i> Browse the Menu</a></div></div><div class="media-stack"><img src="${DATA.gallery[7]}" alt="Dining room detail"><img src="${DATA.gallery[8]}" alt="Service detail"></div></div></section>
  <section class="section">${sectionHead("Press & Usage", "Using these images.")}<div class="container grid grid-3">${noteCards([
    { title:"Press kit on request", copy:"High-resolution files, chef portraits, and room plans are available to accredited press from press@stackly.example." },
    { title:"Credit the photographer", copy:"All imagery is credited to the seasonal photographer named in the press kit. Please carry that credit through." },
    { title:"No compositing", copy:"We ask that images are not cropped to remove guests, recoloured, or combined with other venues' interiors." }
  ])}</div></section>
  <section class="section alt">${sectionHead("What You Are Looking At", "Four things the camera keeps returning to.")}<div class="container grid grid-4">${noteCards([
    { tag:"Rooms", title:"The dining floor", copy:"Banquettes, the bar that had to move, and the four-stage lighting rig that drops the room as the evening goes on." },
    { tag:"Plates", title:"Food as served", copy:"Shot at the pass in the seconds before it goes out, at whatever angle the photographer could get without slowing service." },
    { tag:"Hands", title:"The brigade working", copy:"Plating, carving, pouring. The least composed images in the archive and usually the ones people stop on." },
    { tag:"Details", title:"The small stuff", copy:"Glassware, linen, the brass T on the door, and the corner of the cellar library nobody photographs on purpose." }
  ])}</div></section>
  <section class="section"><div class="container split"><div><span class="eyebrow">On Film</span><h2>One service, once a season.</h2><p class="lead">We photograph a single evening across the seven rooms each season, then live with those images until the next one.</p><p>It keeps the archive honest. A room shot in February looks like February, with the menu that was actually running and the guests who actually booked. Nothing is re-shot because a dish changed or a table looked better empty.</p><p>The photographer works the whole service without a light kit. If an image is dark, that is what the room looked like at nine o'clock.</p><div class="hero-actions"><a class="btn btn-primary" href="404.html"><i class="fa-solid fa-calendar-check"></i> Book a Table</a><a class="btn btn-ghost" href="404.html"><i class="fa-solid fa-book-open"></i> Read the Journal</a></div></div><div class="media-stack"><img src="${DATA.gallery[5]}" alt="Service in progress"><img src="${DATA.gallery[2]}" alt="Room at night"></div></div></section>
  <section class="section alt">${sectionHead("The Archive", "How the collection breaks down.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Room</th><th>Season Shot</th><th>Frames Kept</th><th>Published</th></tr></thead><tbody>
    <tr><td>Astor Flagship, New York</td><td>Winter 2026</td><td>418</td><td>24</td></tr>
    <tr><td>Marylebone House, London</td><td>Autumn 2025</td><td>362</td><td>18</td></tr>
    <tr><td>Marina Terrace, Dubai</td><td>Spring 2026</td><td>295</td><td>16</td></tr>
    <tr><td>Colaba Pavilion, Mumbai</td><td>Summer 2025</td><td>440</td><td>21</td></tr>
    <tr><td>Aoyama Counter, Tokyo</td><td>Winter 2026</td><td>207</td><td>12</td></tr>
  </tbody></table></div></div></section>`;
}

function testimonialsBody() {
  return `<section class="section"><div class="container split"><div><span class="eyebrow">Guest Feedback</span><h2>Service, timing, and flavour tuned as one experience.</h2><p class="lead">We survey every table that books directly and read the results as a kitchen every Monday. These are unedited, and the four-star reviews stay up.</p>${statRow([{n:96,label:"Would return"},{n:4,label:"Average stars"},{n:12,label:"Years reviewed"},{n:7,label:"City rooms"}])}</div><div class="media-stack"><img src="${DATA.gallery[1]}" alt="Guests dining"><img src="${DATA.gallery[4]}" alt="Table setting"></div></div></section>
  <section class="section alt">${sectionHead("In Their Words", "Six recent evenings.", `<a class="btn btn-ghost" href="reservation.html">Book Yours</a>`)}<div class="container grid grid-3">${DATA.reviews.map(r => `<article class="card card-body"><div class="dish-meta"><span>${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span><span>${r.occasion}</span></div><p>${r.text}</p><div class="inline-actions"><span class="tag">${r.name}</span><span class="muted">${r.city}</span></div></article>`).join("")}</div></section>
  <section class="section">${sectionHead("Press Notes", "What the critics filed.")}<div class="container grid grid-3">${noteCards([
    { tag:"Culinary Review", title:"\"Disciplined to the point of stubbornness.\"", copy:"\"Nine dishes, no filler, and a kitchen that clearly refuses to serve anything it cannot repeat perfectly at 10 PM on a Saturday.\"" },
    { tag:"The Table Quarterly", title:"\"The best-paced room in the city.\"", copy:"\"Three hours passed and nobody at our table checked a phone. That is the whole review, honestly.\"" },
    { tag:"Cellar & Craft", title:"\"A wine list with actual opinions.\"", copy:"\"Sordi's reserve programme reads like a personal argument rather than an inventory, and it is better for it.\"" }
  ])}</div></section>
  <section class="section alt">${sectionHead("How We Collect This", "No incentives, no filtering.")}<div class="container grid grid-3">${noteCards([
    { tag:"01", title:"One email, the morning after", copy:"Every direct booking gets a four-question survey. No discount for completing it, because a paid review is not a review." },
    { tag:"02", title:"Read as a team, weekly", copy:"Results go to the kitchen and the floor every Monday, unedited and with names attached where the guest left one." },
    { tag:"03", title:"Nothing gets taken down", copy:"We publish the three and four star responses alongside the five star ones. The only edits are for length and personal detail." }
  ])}</div></section>
  <section class="section">${sectionHead("What Changed Because of It", "Feedback that actually moved something.")}<div class="container grid grid-3">${noteCards([
    { tag:"Acoustics", title:"The bar moved", copy:"Enough guests mentioned hearing the ice well from table nine that we relocated the entire bar during the 2023 rebuild." },
    { tag:"Pacing", title:"Course four slowed down", copy:"Repeated notes about the middle of the tasting menu feeling rushed. We added eight minutes and stopped losing the room there." },
    { tag:"Access", title:"Menus in large print", copy:"One guest asked once. Every branch now carries large-print and braille menus without anyone having to request them." }
  ])}</div></section>
  <section class="section alt">${sectionHead("Ratings by Room", "Twelve months, direct bookings only.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Room</th><th>Responses</th><th>Food</th><th>Service</th><th>Would Return</th></tr></thead><tbody>
    <tr><td>Astor Flagship, New York</td><td>4,180</td><td>4.8</td><td>4.9</td><td><span class="status success">97%</span></td></tr>
    <tr><td>Marylebone House, London</td><td>3,240</td><td>4.7</td><td>4.8</td><td><span class="status success">96%</span></td></tr>
    <tr><td>Marina Terrace, Dubai</td><td>3,890</td><td>4.7</td><td>4.6</td><td><span class="status success">94%</span></td></tr>
    <tr><td>Colaba Pavilion, Mumbai</td><td>3,510</td><td>4.9</td><td>4.8</td><td><span class="status success">98%</span></td></tr>
    <tr><td>Keong Saik Salon, Singapore</td><td>2,120</td><td>4.8</td><td>4.9</td><td><span class="status success">97%</span></td></tr>
    <tr><td>Aoyama Counter, Tokyo</td><td>1,460</td><td>4.9</td><td>4.9</td><td><span class="status success">99%</span></td></tr>
  </tbody></table></div></div></section>`
  + ctaBand("Tell us how we did.", "Every direct booking gets a short survey the morning after. It goes straight to the kitchen and the floor team, unfiltered.", { href:"404.html", label:"Reserve a Table", icon:"fa-calendar-check" }, { href:"contact.html", label:"Send Feedback", icon:"fa-comments" });
}

function ourChefsBody() {
  return `<section class="section">${sectionHead("The Leadership", "Three chefs who set the standard nightly.")}<div class="container grid grid-3">${DATA.chefs.map(c => `<article class="card chef-card"><img src="${c.img}" alt="${c.name}"><div class="card-body"><h3>${c.name}</h3><span class="tag">${c.role}</span><p>${c.note}</p></div></article>`).join("")}</div></section>
  <section class="section alt">${sectionHead("The Brigade", "The rest of the pass, by station.")}<div class="container grid grid-4">${noteCards([
    { tag:"Sauce", title:"Léa Fontaine", copy:"Eleven years on sauce. Runs the eighteen-hour stock programme and refuses to let anyone else finish a jus." },
    { tag:"Fire", title:"Tomas Ilić", copy:"Charcoal, embers, and the wood oven. Splits and seasons the fruitwood himself every Tuesday." },
    { tag:"Garde Manger", title:"Priya Nandan", copy:"Raw preparations, cures, and the fermentation room. Keeps the log that decides half the winter menu." },
    { tag:"Cellar", title:"Elena Sordi", copy:"Head sommelier. Built the reserve list, and will happily talk you out of the expensive bottle." }
  ])}</div></section>
  <section class="section"><div class="container split"><div class="media-stack"><img src="${DATA.gallery[5]}" alt="Kitchen brigade"><img src="${DATA.chefs[1].img}" alt="Pastry section"></div><div><span class="eyebrow">How We Cook</span><h2>Short menu, deep bench.</h2><p class="lead">Nine dishes on the carte means every chef cooks their section hundreds of times a month. Repetition is the point.</p><p>The brigade tastes the full menu together every Sunday and argues about seasoning until it is settled. Four of our seven head chefs started here as commis, and we still take two apprentices a year at every branch.</p><div class="hero-actions"><a class="btn btn-primary" href="404.html"><i class="fa-solid fa-fire"></i> Chef Specials</a><a class="btn btn-ghost" href="reservation.html"><i class="fa-solid fa-utensils"></i> Book the Counter</a></div></div></div></section>
  <section class="section alt">${sectionHead("Working Here", "Two apprentices per branch, every year.")}<div class="container grid grid-3">${noteCards([
    { title:"Apprenticeships", copy:"A twelve-month rotation across every station, paid, with a guaranteed commis interview at the end of it." },
    { title:"Stages", copy:"We host two-week stages year round. Send a short note and your availability rather than a formal CV." },
    { title:"Open roles", copy:"Front and back of house vacancies across all seven rooms are listed with the concierge desk." }
  ])}</div></section>
  <section class="section">${sectionHead("Guest Chefs", "Kitchens we hand the pass to.")}<div class="container grid grid-3">${DATA.chefs.map((c, i) => `<article class="card image-card"><img src="${DATA.gallery[(i + 3) % DATA.gallery.length]}" alt="Guest chef collaboration"><div class="card-body"><span class="tag">${["September","November","February"][i]}</span><h3>${["Chef Adaeze Okonjo","Chef Hana Ito","Chef Bruno Vidal"][i]}</h3><p>${["Lagos. Ten courses built around jollof, smoked crayfish, and a suya rub that stayed on our menu long after she left.","Tokyo. Our own Aoyama head chef cooks four hands with Rafael in the Astor kitchen for one evening only.","São Paulo. Fire, cassava, and Atlantic seafood, cooked almost entirely on the wood oven."][i]}</p><div class="inline-actions"><span class="muted">Four hands, one night</span><a class="btn btn-ghost" href="404.html">Details</a></div></div></article>`).join("")}</div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">A Day at the Pass</span><h2>Service is the short part.</h2><p class="lead">Guests see three hours of it. The brigade has been in the building since seven that morning.</p><div class="table-wrap mt-2"><table><thead><tr><th>Time</th><th>What Happens</th></tr></thead><tbody>
    <tr><td>07:00</td><td>Deliveries checked and rejected at the door if the quality is wrong</td></tr>
    <tr><td>08:30</td><td>Stocks skimmed, ferments logged, pastry lamination begins</td></tr>
    <tr><td>11:00</td><td>Family meal, then the menu briefing for the full floor team</td></tr>
    <tr><td>12:00</td><td>Lunch service, four courses, through to three o'clock</td></tr>
    <tr><td>15:30</td><td>Break, then the evening prep and the specials board rewrite</td></tr>
    <tr><td>18:00</td><td>Dinner service opens, counter seatings at seven and nine</td></tr>
    <tr><td>23:15</td><td>Kitchen closes, deep clean, and tomorrow's order goes in</td></tr>
  </tbody></table></div></div><div class="media-stack"><img src="${DATA.gallery[5]}" alt="Morning prep"><img src="${DATA.chefs[1].img}" alt="Pastry section"></div></div></section>
  <section class="section">${sectionHead("Meet Them", "Three ways to get closer to the kitchen.")}<div class="container grid grid-3">${noteCards([
    { tag:"Nightly", title:"The chef counter", copy:"Twelve seats, twice a night. The head chef narrates every plate and will answer anything between courses." },
    { tag:"Monthly", title:"Pastry masterclass", copy:"Anika runs sixteen guests through tempering, gelee, and plating on a Saturday morning. Listed under events." },
    { tag:"Seasonal", title:"Brigade tasting", copy:"Counter Circle members are invited to the Sunday tasting where the next menu gets argued into shape." }
  ])}</div></section>`;
}

function offersBody() {
  return `<section class="section">${sectionHead("Current Offers", "Seasonal privileges, honestly priced.")}<div class="container grid grid-3">${[
    { name:"Golden Hour", price:"25% Off", copy:"Five courses with aperitif pairings, seated before 6 PM Tuesday to Thursday.", terms:"Dining room only. Not combined with membership rates." },
    { name:"Cellar Pairing", price:"15% Off", copy:"Add the sommelier's six-glass pairing to any tasting menu at a reduced supplement.", terms:"Available Sunday to Wednesday, all branches." },
    { name:"Salon Celebration", price:"30% Off", copy:"Private room hire waived on midweek bookings of sixteen guests or more.", terms:"Subject to room availability and minimum spend." }
  ].map(o => `<article class="offer-card card"><h3>${o.name}</h3><p>${o.copy}</p><span class="price">${o.price}</span><p class="muted">${o.terms}</p></article>`).join("")}</div></section>
  <section class="section alt">${sectionHead("Membership", "Three tiers, no joining fee.")}<div class="container grid grid-3">${[
    { name:"Guest List", price:"Free", perks:["Priority notice on event seats","Save favourites and dining notes","Birthday month dessert course"] },
    { name:"Cellar Member", price:"$240 / year", perks:["Two guaranteed weekend tables a month","10% off the reserve wine list","First refusal on residency evenings"] },
    { name:"Counter Circle", price:"$780 / year", perks:["Standing chef counter reservation","Invitation to every brigade tasting","Private room hire waived twice a year"] }
  ].map(t => `<article class="offer-card card"><h3>${t.name}</h3><span class="price">${t.price}</span><div class="card-body">${t.perks.map(p => `<p><i class="fa-solid fa-check gold"></i> ${p}</p>`).join("")}</div><a class="btn btn-ghost full" href="register.html">Join</a></article>`).join("")}</div></section>
  <section class="section"><div class="container split"><div><span class="eyebrow">The Small Print</span><h2>Terms we would rather state up front.</h2><p class="lead">Offers exist to fill quieter services, not to disguise the real price of dinner. Here is exactly how they work.</p><div class="surface-pad"><p>One offer per booking, and offers do not stack with membership discounts.</p><p>Offer tables are released twenty-eight days ahead and are capped per service.</p><p>Deposits still apply to the chef table and private dining, and come off the final bill.</p><p>Offers are withdrawn on public holidays and during residency evenings.</p></div></div><div class="media-stack"><img src="${DATA.gallery[2]}" alt="Dining room"><img src="${DATA.dishes[6].img}" alt="Dessert course"></div></div></section>
  <section class="section alt">${sectionHead("Offer Calendar", "When each privilege is actually available.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Offer</th><th>Days</th><th>Service</th><th>Rooms</th><th>Status</th></tr></thead><tbody>
    <tr><td>Golden Hour</td><td>Tue - Thu</td><td>Seated before 6 PM</td><td>Dining room only</td><td><span class="status success">Open</span></td></tr>
    <tr><td>Cellar Pairing</td><td>Sun - Wed</td><td>Lunch and dinner</td><td>All seven</td><td><span class="status success">Open</span></td></tr>
    <tr><td>Salon Celebration</td><td>Mon - Thu</td><td>Dinner, 16+ guests</td><td>Private rooms</td><td><span class="status warning">Limited</span></td></tr>
    <tr><td>Harvest Weekends</td><td>Sat - Sun</td><td>Lunch only</td><td>New York, London</td><td><span class="status info">From September</span></td></tr>
    <tr><td>Counter Standby</td><td>Any</td><td>Same-day release</td><td>All seven</td><td><span class="status warning">Subject to seats</span></td></tr>
  </tbody></table></div></div></section>
  <section class="section">${sectionHead("Claiming One", "Three steps, no codes to remember.")}<div class="container grid grid-3">${noteCards([
    { tag:"01", title:"Name it when you book", copy:"Write the offer into the notes field on the reservation form, or say it on the phone. There is no voucher code to enter." },
    { tag:"02", title:"We confirm before you arrive", copy:"The concierge desk checks availability against the cap for that service and confirms in writing the same day." },
    { tag:"03", title:"It comes off the bill", copy:"Applied automatically at the end of the evening. Nothing to present at the table and nothing to claim back afterwards." }
  ])}</div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">Gift Vouchers</span><h2>An evening, not an amount.</h2><p class="lead">Vouchers are bought against an experience rather than a balance, so the value never gets eroded by a menu price change.</p><div class="surface-pad"><p><strong>Dinner for two:</strong> the full carte with a glass each, from $240.</p><p><strong>Tasting menu for two:</strong> ten courses, from $370.</p><p><strong>The chef counter:</strong> two seats at either nightly seating, from $480.</p><p><strong>Open value:</strong> any amount from $50, redeemable against anything.</p></div><p class="muted mt-2">Valid twenty-four months, usable at any of the seven rooms, and replaced free of charge if lost.</p><a class="btn btn-primary mt-2" href="contact.html"><i class="fa-solid fa-gift"></i> Order a Voucher</a></div><div class="media-stack"><img src="${DATA.gallery[4]}" alt="Gift voucher presentation"><img src="${DATA.dishes[7].img}" alt="Aperitif"></div></div></section>`
  + ctaBand("Claim an offer with your next booking.", "Mention the offer name in your reservation note, or ask the concierge desk which one actually suits your evening.");
}

function branchesBody() {
  return `<section class="section">${sectionHead("Seven City Rooms", "One standard, seven distinct kitchens.", `<a class="btn btn-ghost" href="contact.html">Contact a Branch</a>`)}<div class="container grid grid-3">${DATA.branches.map((b, i) => `<article class="card image-card"><img src="${DATA.gallery[i % DATA.gallery.length]}" alt="${b.room}, ${b.city}"><div class="card-body"><span class="tag">${b.city}</span><h3>${b.room}</h3><p>${b.note}</p><div class="dish-meta"><span><i class="fa-solid fa-location-dot"></i> ${b.address}</span></div><div class="dish-meta"><span><i class="fa-solid fa-phone"></i> ${b.phone}</span><span><i class="fa-regular fa-clock"></i> ${b.hours}</span></div><div class="inline-actions"><span class="price">${b.seats} seats</span><a class="btn btn-ghost" href="reservation.html">Reserve</a></div></div></article>`).join("")}</div></section>
  <section class="section alt">${sectionHead("Opening Hours", "Local time, every room.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>City</th><th>Room</th><th>Address</th><th>Hours</th><th>Seats</th><th>Phone</th></tr></thead><tbody>${DATA.branches.map(b => `<tr><td>${b.city}</td><td>${b.room}</td><td>${b.address}</td><td>${b.hours}</td><td>${b.seats}</td><td>${b.phone}</td></tr>`).join("")}</tbody></table></div></div></section>
  <section class="section">${sectionHead("What Travels, What Doesn't", "The same house, adapted locally.")}<div class="container grid grid-3">${noteCards([
    { title:"Identical training", copy:"Every floor and kitchen team runs the same twelve-week programme, wherever they are. Pacing and service standards do not vary by city." },
    { title:"Local produce", copy:"Menus are written against the market each room can actually reach. Tokyo and Mumbai share technique, not ingredients." },
    { title:"Shared reserve list", copy:"The cellar programme is bought centrally, so a bottle you liked in London can usually be found in Dubai." }
  ])}</div></section>
  <section class="section">${sectionHead("Choosing a Room", "They are genuinely different evenings.")}<div class="container grid grid-3">${noteCards([
    { tag:"Loudest", title:"Colaba and Marina", copy:"Big rooms, late service, and dessert trolleys that arrive with some ceremony. Book these when the evening is a celebration." },
    { tag:"Quietest", title:"Aoyama and Keong Saik", copy:"Fifty-two and eighty-eight seats, counter-led, dinner only in Tokyo. Book these when the food is the entire point." },
    { tag:"Most flexible", title:"Astor and Marylebone", copy:"Full carte, tasting menu, private rooms, and a cellar library in both. Book these when the party has mixed requirements." }
  ])}</div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">Groups and Travel</span><h2>Booking across more than one city.</h2><p class="lead">Corporate accounts and travelling parties are handled centrally rather than branch by branch, so you deal with one person for the whole itinerary.</p><p>Tell the concierge desk the cities and dates and they will hold tables across every room at once, apply a single account, and send one invoice at the end of the trip. Dietary notes and seating preferences travel with the booking automatically.</p><div class="surface-pad"><p><strong>Central bookings:</strong> +1 212 555 0164</p><p><strong>Corporate accounts:</strong> accounts@stackly.example</p><p><strong>Notice preferred:</strong> two weeks for multi-city itineraries</p></div></div><div class="media-stack"><img src="${DATA.gallery[1]}" alt="Group table"><img src="${DATA.gallery[6]}" alt="Private room"></div></div></section>
  <section class="section">${sectionHead("Opening Next", "Two rooms currently in build.")}<div class="container grid grid-2">${noteCards([
    { tag:"Spring 2027", title:"Lisbon, Príncipe Real", copy:"Ninety seats over two floors with a wood oven at the centre of the room. Marco moves across from Astor to open it, taking four of the current brigade with him." },
    { tag:"Late 2027", title:"Sydney, Surry Hills", copy:"Our first room built around a single-market menu from day one. Nothing on the carte will travel from the other six kitchens, which is either brave or foolish." }
  ])}</div></section>`
  + ctaBand("Reserve at any of the seven rooms.", "Pick your city on the booking form and the concierge desk for that branch handles it directly.");
}

function faqBody() {
  return DATA.faqs.map((group, gi) => `<section class="section${gi % 2 ? " alt" : ""}">${sectionHead(`0${gi + 1}`, group.group)}<div class="container grid grid-2">${group.items.map(item => `<article class="card card-body"><h3>${item.q}</h3><p>${item.a}</p></article>`).join("")}</div></section>`).join("")
  + `<section class="section alt">${sectionHead("04", "Payment, Vouchers & Billing")}<div class="container grid grid-2">${[
    { q:"Is service included in the price?", a:"Yes. Menu prices include service, and nothing is added to the bill afterwards beyond local tax. Tipping is genuinely optional and split across the whole team when it happens." },
    { q:"Can we split the bill?", a:"Across up to six cards without any fuss. Splitting by individual item takes longer, so tell your server before dessert rather than at the end." },
    { q:"How do gift vouchers work?", a:"They are bought against an experience rather than a cash balance, valid twenty-four months, usable at any of the seven rooms, and replaced free if lost." },
    { q:"Do you invoice companies?", a:"Corporate accounts are set up through accounts@stackly.example and settle monthly on a single invoice, including multi-city itineraries." }
  ].map(x => `<article class="card card-body"><h3>${x.q}</h3><p>${x.a}</p></article>`).join("")}</div></section>
  <section class="section">${sectionHead("05", "Accessibility & Comfort")}<div class="container grid grid-2">${[
    { q:"Is the restaurant step-free?", a:"Every branch has a step-free entrance, accessible restrooms on the ground floor, and adjustable seating. Tell us in advance and the room is set before you arrive." },
    { q:"Do you have large-print menus?", a:"Large-print and braille menus are carried at every branch as standard. You should not have to ask, but if one is not offered, please do." },
    { q:"Can you seat an assistance dog?", a:"Always, at any table, with water brought without being asked. Let us know when booking so we can allocate the right amount of space." },
    { q:"Is the room very loud?", a:"The flagship runs around 68 decibels at full capacity, which is quieter than most rooms its size. Ask for a corner banquette if you would prefer quieter still." }
  ].map(x => `<article class="card card-body"><h3>${x.q}</h3><p>${x.a}</p></article>`).join("")}</div></section>
  <section class="section alt">${sectionHead("At a Glance", "Every policy on one line.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Policy</th><th>Standard Table</th><th>Chef Counter</th><th>Private Room</th></tr></thead><tbody>
    <tr><td>Deposit required</td><td>No</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Free cancellation</td><td>48 hours</td><td>48 hours</td><td>7 days</td></tr>
    <tr><td>Dietary notice</td><td>48 hours</td><td>72 hours</td><td>72 hours</td></tr>
    <tr><td>Final numbers</td><td>Not required</td><td>At booking</td><td>72 hours</td></tr>
    <tr><td>Maximum party</td><td>8 guests</td><td>12 guests</td><td>120 guests</td></tr>
    <tr><td>Children before 7 PM</td><td>Welcome</td><td>Over 12 only</td><td>By arrangement</td></tr>
  </tbody></table></div></div></section>
  <section class="section"><div class="container split"><div><span class="eyebrow">Still Unsure?</span><h2>The concierge desk answers faster than this page does.</h2><p class="lead">If your question involves a date, a dietary requirement, or a room, it is worth asking a person. We answer within a few hours during service.</p><div class="surface-pad"><p><strong>Reservations:</strong> +1 212 555 0198</p><p><strong>Events desk:</strong> +1 212 555 0164</p><p><strong>Email:</strong> concierge@stackly.example</p></div></div><form class="form surface-pad" data-contact><input required placeholder="Name"><input type="email" required placeholder="Email"><textarea required placeholder="Your question"></textarea><button class="btn btn-primary">Ask the Concierge</button></form></div></section>`;
}

function blogBody() {
  return `<section class="section">${sectionHead("Latest", "Kitchen notes, cellar stories, and design journals.")}<div class="container grid grid-3">${DATA.posts.map((p, i) => `<article class="card image-card"><img src="${DATA.gallery[i % DATA.gallery.length]}" alt="${p.title}"><div class="card-body"><span class="tag">${p.tag}</span><h3>${p.title}</h3><p>${p.excerpt}</p><div class="dish-meta"><span><i class="fa-regular fa-calendar"></i> ${p.date}</span><span><i class="fa-regular fa-clock"></i> ${p.read}</span></div><div class="inline-actions"><span class="muted">${p.author}</span><a class="btn btn-ghost" href="404.html">Read</a></div></div></article>`).join("")}</div></section>
  <section class="section alt">${sectionHead("Topics", "What we write about, and why.")}<div class="container grid grid-4">${noteCards([
    { tag:"Kitchen", title:"Menu craft", copy:"Sequencing, portioning, and the arguments behind what stays on the carte." },
    { tag:"Cellar", title:"Wine notes", copy:"Buying, storing, and pairing, written by the people who actually pour it." },
    { tag:"Technique", title:"Method", copy:"Fermentation, curing, stocks, and the processes that take longer than a service." },
    { tag:"Travel", title:"Sourcing trips", copy:"Field notes from the farms, coasts, and markets our pantry depends on." }
  ])}</div></section>
  <section class="section"><div class="container split"><div><span class="eyebrow">The Journal</span><h2>Written by the brigade, not a marketing desk.</h2><p class="lead">Every entry is filed by the chef, sommelier, or designer who did the work. We publish roughly twice a month, and we publish the failures too.</p><p>Subscribe below and you will get the journal, early notice on residency evenings, and nothing else. No offers you did not ask for.</p><form class="newsletter" data-newsletter><input name="email" type="email" placeholder="Email for the journal" required><button class="btn btn-primary" title="Subscribe"><i class="fa-solid fa-paper-plane"></i></button></form></div><div class="media-stack"><img src="${DATA.gallery[3]}" alt="Kitchen notes"><img src="${DATA.gallery[6]}" alt="Cellar"></div></div></section>
  <section class="section">${sectionHead("Most Read", "What guests keep coming back to.")}<div class="container grid grid-3">${DATA.posts.slice(2, 5).map((p, i) => `<article class="card card-body"><span class="tag">${["1st","2nd","3rd"][i]}</span><h3>${p.title}</h3><p>${p.excerpt}</p><div class="dish-meta"><span><i class="fa-regular fa-user"></i> ${p.author}</span><span><i class="fa-regular fa-clock"></i> ${p.read}</span></div><a class="btn btn-ghost" href="404.html">Read</a></article>`).join("")}</div></section>
  <section class="section alt">${sectionHead("The Archive", "Everything published this year.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Title</th><th>Topic</th><th>Author</th><th>Published</th><th>Length</th></tr></thead><tbody>${DATA.posts.map(p => `<tr><td>${p.title}</td><td>${p.tag}</td><td>${p.author}</td><td>${p.date}</td><td>${p.read}</td></tr>`).join("")}</tbody></table></div></div></section>
  <section class="section"><div class="container split"><div class="media-stack"><img src="${DATA.gallery[8]}" alt="Cellar library"><img src="${DATA.dishes[7].img}" alt="Cellar pour"></div><div><span class="eyebrow">From the Cellar</span><h2>Elena's notes get their own column.</h2><p class="lead">Our head sommelier writes roughly once a month about buying, storing, and the bottles she talks guests out of.</p><p>It is the least polished writing on the site and the most useful. Recent entries cover why a young Barolo is usually the wrong choice, how to read a cellar before you buy from it, and the case for spending less on the second bottle than the first.</p><div class="hero-actions"><a class="btn btn-primary" href="404.html"><i class="fa-solid fa-wine-glass"></i> Read the Column</a><a class="btn btn-ghost" href="404.html"><i class="fa-solid fa-calendar-days"></i> Cellar Residencies</a></div></div></div></section>`;
}

function blogDetailsBody() {
  const post = DATA.posts[0];
  return `<section class="section"><div class="container split"><article><span class="tag">${post.tag}</span><div class="dish-meta mt-2"><span><i class="fa-regular fa-user"></i> ${post.author}</span><span><i class="fa-regular fa-calendar"></i> ${post.date}</span><span><i class="fa-regular fa-clock"></i> ${post.read}</span></div><p class="lead mt-2">A composed menu works like a room: entrance, tension, release, and memory. Get the sequence wrong and even flawless cooking lands flat.</p><p>Most guests describe a tasting menu by its best dish. We plan it by its transitions. The fourth course is rarely anyone's favourite, but if it fails, the fifth one cannot recover, and the table starts checking the time.</p><h3>The entrance</h3><p>The first two courses exist to reset the palate and lower the volume of the room. They are bright, small, and cold or barely warm. Nothing rich arrives before a guest has taken their coat off and had a proper look at the space.</p><h3>The tension</h3><p>Courses three through six build weight, temperature, and aromatic pressure. This is where fire and fermentation do the work. Each plate should feel like it costs the kitchen something, and the pacing tightens deliberately as the room fills.</p><h3>The release</h3><p>After the heaviest course we drop back hard. A clear broth, an acidic cut, or a raw preparation. Guests read it as generosity, but it is structural: without it the dessert cannot land, and the last hour drags.</p><h3>The memory</h3><p>The final two plates and the pour that follows are what people describe a week later. That is why pastry sits under Anika rather than the savoury brigade, and why the last course is the one we rewrite most often.</p><div class="surface-pad mt-3"><p><strong>The rule underneath all of it:</strong> if a course cannot be executed identically at 10 PM on a Saturday with a full room, it does not belong on the menu, however well it tastes in an empty kitchen at three in the afternoon.</p></div></article><aside class="surface-pad"><h3>Written by</h3><img src="${DATA.chefs[0].img}" alt="${post.author}" style="width:100%;border-radius:12px;margin:12px 0"><h3>${post.author}</h3><span class="tag">Executive Chef</span><p>${DATA.chefs[0].note}</p><h3 class="mt-3">Key takeaways</h3><p><i class="fa-solid fa-check gold"></i> Plan transitions, not highlights.</p><p><i class="fa-solid fa-check gold"></i> Drop the intensity before dessert.</p><p><i class="fa-solid fa-check gold"></i> Cut anything you cannot repeat under pressure.</p><a class="btn btn-primary full mt-2" href="404.html"><i class="fa-solid fa-calendar-check"></i> Book the Tasting Menu</a></aside></div></section>
  <section class="section alt">${sectionHead("The Sequence in Practice", "The current menu, mapped to the argument above.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Course</th><th>Role</th><th>Weight</th><th>Served At</th></tr></thead><tbody>
    <tr><td>1 - 2</td><td>Entrance</td><td>Light, cold, acidic</td><td>Within 12 minutes of seating</td></tr>
    <tr><td>3 - 4</td><td>Building tension</td><td>Warm, fat entering</td><td>25 - 45 minutes</td></tr>
    <tr><td>5 - 6</td><td>Peak</td><td>Fire, reduction, smoke</td><td>50 - 80 minutes</td></tr>
    <tr><td>7</td><td>Release</td><td>Clear, sharp, raw</td><td>90 minutes</td></tr>
    <tr><td>8 - 9</td><td>Memory</td><td>Sweet, floral, warm</td><td>105 - 130 minutes</td></tr>
    <tr><td>10</td><td>Close</td><td>A final pour</td><td>At the guest's pace</td></tr>
  </tbody></table></div></div></section>
  <section class="section">${sectionHead("Reader Notes", "Replies worth publishing.")}<div class="container grid grid-3">${noteCards([
    { tag:"From a chef", title:"\"The fourth course point is right.\"", copy:"\"We spent two years fixing our sixth course when the problem was always the fourth. Reading this cost me an evening of rewriting our menu, so thank you, I suppose.\"" },
    { tag:"From a guest", title:"\"So that is why the broth arrives.\"", copy:"\"I always thought the clear course was the kitchen taking a breather. Turns out it was doing the most work of the night.\"" },
    { tag:"From the floor", title:"\"Pacing is a service problem too.\"", copy:"\"Worth adding that the room reads the transitions as much as the plates. If we clear too fast, the release course lands as an interruption.\"" }
  ])}</div></section>
  <section class="section alt">${sectionHead("Keep Reading", "More from the journal.", `<a class="btn btn-ghost" href="blog.html">All Entries</a>`)}<div class="container grid grid-3">${DATA.posts.slice(1, 4).map((p, i) => `<article class="card image-card"><img src="${DATA.gallery[(i + 1) % DATA.gallery.length]}" alt="${p.title}"><div class="card-body"><span class="tag">${p.tag}</span><h3>${p.title}</h3><p>${p.excerpt}</p><div class="inline-actions"><span class="muted">${p.date}</span><a class="btn btn-ghost" href="404.html">Read</a></div></div></article>`).join("")}</div></section>`;
}

function contactBody() {
  return `<section class="section"><div class="container split"><div><h2>Concierge Desk</h2><p class="lead">Call +1 212 555 0198 or send a note for events, press, and special reservations.</p><div class="surface-pad"><p>12 Astor Lane, New York</p><p>concierge@stackly.example</p></div></div><form class="form surface-pad" data-contact><input required placeholder="Name"><input type="email" required placeholder="Email"><textarea required placeholder="Message"></textarea><button class="btn btn-primary">Send Message</button></form></div></section>
  <section class="section alt">${sectionHead("Who to Reach", "Four desks, four different jobs.")}<div class="container grid grid-4">${noteCards([
    { tag:"Reservations", title:"+1 212 555 0198", copy:"Tables, amendments, cancellations, and dietary notes. Answered from 10 AM until close, seven days." },
    { tag:"Events", title:"+1 212 555 0164", copy:"Private rooms, buyouts, and corporate dinners. Monday to Friday, 9 AM to 7 PM." },
    { tag:"Press", title:"press@stackly.example", copy:"Interviews, imagery, and the press kit. Replies within two working days." },
    { tag:"Careers", title:"careers@stackly.example", copy:"Stages, apprenticeships, and open roles across all seven rooms." }
  ])}</div></section>
  <section class="section"><div class="container split"><div><span class="eyebrow">Finding Us</span><h2>Astor Lane, between Wren and Halbrook.</h2><p class="lead">The entrance is unmarked apart from the brass T. If you reach the corner cafe you have gone about thirty metres too far.</p><div class="surface-pad"><p><strong>Nearest transit:</strong> Astor Place, four minutes on foot.</p><p><strong>Valet:</strong> from 6 PM nightly, at the Wren Street door.</p><p><strong>Accessibility:</strong> step-free entrance and accessible restrooms on the ground floor.</p><p><strong>Service hours:</strong> 12:00 PM - 12:00 AM daily, kitchen closes at 11:15 PM.</p></div><a class="btn btn-ghost mt-2" href="404.html"><i class="fa-solid fa-location-dot"></i> Other Branches</a></div><div class="media-stack"><img src="${DATA.gallery[2]}" alt="Restaurant entrance"><img src="${DATA.gallery[0]}" alt="Dining room"></div></div></section>
  <section class="section alt">${sectionHead("Response Times", "What to expect, and when.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Enquiry</th><th>Best Channel</th><th>Hours</th><th>Typical Reply</th></tr></thead><tbody>
    <tr><td>New reservation</td><td>Phone or booking form</td><td>10 AM - midnight, daily</td><td><span class="status success">Immediate</span></td></tr>
    <tr><td>Change or cancel</td><td>Phone</td><td>10 AM - midnight, daily</td><td><span class="status success">Immediate</span></td></tr>
    <tr><td>Dietary requirements</td><td>Email</td><td>Monitored during service</td><td><span class="status success">Same day</span></td></tr>
    <tr><td>Private dining</td><td>Events desk</td><td>Mon - Fri, 9 AM - 7 PM</td><td><span class="status info">1 working day</span></td></tr>
    <tr><td>Press and imagery</td><td>Email</td><td>Mon - Fri</td><td><span class="status info">2 working days</span></td></tr>
    <tr><td>Careers and stages</td><td>Email</td><td>Mon - Fri</td><td><span class="status warning">Up to 2 weeks</span></td></tr>
  </tbody></table></div></div></section>
  <section class="section">${sectionHead("Common Requests", "Things you can sort out in one message.")}<div class="container grid grid-3">${noteCards([
    { tag:"01", title:"Change a booking", copy:"Send the reference from your confirmation with the new date or guest count. No need to cancel and rebook, and nothing is charged inside the 48 hour window if you simply move it." },
    { tag:"02", title:"Flag an allergy", copy:"Reply to your confirmation email with the detail. It attaches to the booking, reaches the kitchen at the morning briefing, and stays on your profile for next time." },
    { tag:"03", title:"Mark an occasion", copy:"Birthdays, anniversaries, proposals. Tell us the name and the moment you want it to land, and the floor team will handle the rest quietly." }
  ])}</div></section>
  <section class="section alt"><div class="container split"><div class="media-stack"><img src="${DATA.gallery[5]}" alt="Kitchen at work"><img src="${DATA.chefs[0].img}" alt="Chef portrait"></div><div><span class="eyebrow">Press & Partnerships</span><h2>Working with us on something.</h2><p class="lead">We take a small number of collaborations a year and turn down most of what is offered, usually for reasons of time rather than fit.</p><div class="surface-pad"><p><strong>Press enquiries:</strong> press@stackly.example. Kit includes high-resolution imagery, chef portraits, room plans, and current menus.</p><p><strong>Guest chef collaborations:</strong> planned six to nine months out. Send a menu outline rather than a deck.</p><p><strong>Suppliers:</strong> we visit before we buy. Send what you grow, where, and how much of it, and expect a slow but honest answer.</p><p><strong>Filming:</strong> possible outside service hours only, and never in a room with guests in it.</p></div></div></div></section>`;
}

function profileBody() {
  return `<section class="section"><div class="container split"><div class="surface-pad"><span class="eyebrow">Guest Profile</span><h2>Your dining identity</h2><p class="lead">This demo profile is stored locally on this device, so nothing leaves your browser.</p><div class="form-grid mt-2"><div class="field"><label>Full name</label><input value="Guest" placeholder="Full name"></div><div class="field"><label>Email</label><input type="email" value="customer@stackly.com" placeholder="Email"></div><div class="field"><label>Phone</label><input placeholder="+1 212 555 0000"></div><div class="field"><label>Home branch</label><select>${DATA.branches.map(b => `<option>${b.city} - ${b.room}</option>`).join("")}</select></div></div><div class="field mt-2"><label>Dining notes for the kitchen</label><textarea placeholder="Allergies, seating preference, occasions we should remember"></textarea></div><button class="btn btn-primary mt-2">Save Profile</button></div><div><span class="eyebrow">At a Glance</span><h2>Your history with the room.</h2><p class="lead">Everything below is drawn from your demo bookings and saved favourites.</p>${statRow([{n:14,label:"Visits"},{n:6,label:"Favourites"},{n:3,label:"Branches"},{n:2,label:"Events"}])}<div class="surface-pad mt-3"><p><strong>Member tier:</strong> Cellar Member</p><p><strong>Joined:</strong> March 2023</p><p><strong>Usual table:</strong> Counter, seats 7 and 8</p></div></div></div></section>
  <section class="section alt">${sectionHead("Saved Dishes", "Favourites you have marked.", `<a class="btn btn-ghost" href="menu.html">Browse Menu</a>`)}<div class="container grid grid-3">${DATA.dishes.slice(0, 3).map(dishCard).join("")}</div></section>
  <section class="section">${sectionHead("Recent Reservations", "Your last four bookings.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Date</th><th>Time</th><th>Guests</th><th>Room</th><th>Status</th></tr></thead><tbody>
    <tr><td>RSV-4821</td><td>14 Aug 2026</td><td>7:30 PM</td><td>2</td><td>Astor Flagship</td><td><span class="status success">Confirmed</span></td></tr>
    <tr><td>RSV-4610</td><td>02 Aug 2026</td><td>8:00 PM</td><td>4</td><td>Astor Flagship</td><td><span class="status info">Completed</span></td></tr>
    <tr><td>RSV-4388</td><td>19 Jul 2026</td><td>1:00 PM</td><td>6</td><td>Cellar Library</td><td><span class="status info">Completed</span></td></tr>
    <tr><td>RSV-4102</td><td>28 Jun 2026</td><td>9:00 PM</td><td>2</td><td>The Pass</td><td><span class="status warning">Cancelled</span></td></tr>
  </tbody></table></div></div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">Membership</span><h2>Cellar Member since March 2023.</h2><p class="lead">Six visits from Counter Circle, which unlocks a standing counter reservation and waived private room hire twice a year.</p><div class="surface-pad"><p><i class="fa-solid fa-check gold"></i> Two guaranteed weekend tables a month</p><p><i class="fa-solid fa-check gold"></i> 10% off the reserve wine list</p><p><i class="fa-solid fa-check gold"></i> First refusal on residency evenings</p><p class="muted mt-2"><i class="fa-solid fa-lock"></i> Standing counter reservation - Counter Circle only</p><p class="muted"><i class="fa-solid fa-lock"></i> Invitation to every brigade tasting - Counter Circle only</p></div><a class="btn btn-primary mt-2" href="offers.html"><i class="fa-solid fa-arrow-up"></i> Compare Tiers</a></div><div class="media-stack"><img src="${DATA.gallery[7]}" alt="Cellar library"><img src="${DATA.gallery[1]}" alt="Counter seats"></div></div></section>
  <section class="section">${sectionHead("Dining Notes on File", "What the kitchen already knows about you.")}<div class="container grid grid-3">${noteCards([
    { tag:"Kitchen", title:"Shellfish allergy, severe", copy:"Flagged on every booking since 2023. The kitchen plans a parallel course rather than adapting the plate, and the floor team confirms it at the table before service starts." },
    { tag:"Cellar", title:"Prefers low intervention reds", copy:"Elena's note, added after your third visit. It is why the pairing flight you get is never quite the printed one." },
    { tag:"Floor", title:"Counter seats 7 and 8", copy:"Requested four times, so it is now the default whenever the counter is available on your booking date." }
  ])}</div></section>
  <section class="section alt">${sectionHead("Account Activity", "The last few things that happened.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Date</th><th>Activity</th><th>Detail</th><th>Status</th></tr></thead><tbody>
    <tr><td>02 Aug 2026</td><td>Reservation confirmed</td><td>RSV-4821, two guests, Astor</td><td><span class="status success">Confirmed</span></td></tr>
    <tr><td>29 Jul 2026</td><td>Favourite added</td><td>Saffron Lobster Veloute</td><td><span class="status info">Saved</span></td></tr>
    <tr><td>21 Jul 2026</td><td>Event seat booked</td><td>Barolo Cellar Residency</td><td><span class="status success">Paid</span></td></tr>
    <tr><td>14 Jul 2026</td><td>Dietary note updated</td><td>Shellfish allergy, severe</td><td><span class="status success">Applied</span></td></tr>
    <tr><td>28 Jun 2026</td><td>Reservation cancelled</td><td>RSV-4102, outside window</td><td><span class="status warning">Refunded</span></td></tr>
  </tbody></table></div></div></section>`
  + ctaBand("Ready for the next one?", "Your preferences are already saved, so booking takes about thirty seconds.", { href:"404.html", label:"Reserve a Table", icon:"fa-calendar-check" }, { href:"settings.html", label:"Manage Settings", icon:"fa-sliders" });
}

function settingsBody() {
  return `<section class="section"><div class="container grid grid-2">
    <article class="surface-pad"><span class="eyebrow">Appearance</span><h3>Theme and motion</h3><p class="muted">These demo settings are written to LocalStorage on this device.</p><div class="field mt-2"><label>Colour theme</label><select><option>Dark (default)</option><option>Light</option><option>Match system</option></select></div><div class="field mt-2"><label>Reduce motion</label><select><option>Off</option><option>On</option></select></div><div class="field mt-2"><label>Text size</label><select><option>Standard</option><option>Large</option></select></div></article>
    <article class="surface-pad"><span class="eyebrow">Notifications</span><h3>What reaches you</h3><p class="muted">Reservation alerts always send. Everything else is optional.</p><div class="field mt-2"><label>Reservation reminders</label><select><option>24 hours before</option><option>48 hours before</option><option>Off</option></select></div><div class="field mt-2"><label>Event and residency notices</label><select><option>On</option><option>Off</option></select></div><div class="field mt-2"><label>The journal</label><select><option>Twice monthly</option><option>Off</option></select></div></article>
    <article class="surface-pad"><span class="eyebrow">Dining Preferences</span><h3>What the kitchen assumes</h3><p class="muted">Applied automatically to every new booking you make.</p><div class="field mt-2"><label>Default guest count</label><input type="number" min="1" max="18" value="2"></div><div class="field mt-2"><label>Dietary profile</label><select><option>None</option><option>Vegetarian</option><option>Vegan</option><option>Gluten-free</option><option>Pescatarian</option></select></div><div class="field mt-2"><label>Seating preference</label><select><option>No preference</option><option>Chef counter</option><option>Window</option><option>Quiet corner</option></select></div></article>
    <article class="surface-pad"><span class="eyebrow">Privacy and Data</span><h3>Your stored data</h3><p class="muted">This demo keeps everything in your browser. Nothing is sent to a server.</p><div class="field mt-2"><label>Save favourites on this device</label><select><option>On</option><option>Off</option></select></div><div class="field mt-2"><label>Keep reservation history</label><select><option>12 months</option><option>Until I clear it</option></select></div><div class="inline-actions mt-3"><button class="btn btn-primary">Save Settings</button><button class="btn btn-ghost">Clear Local Data</button></div></article>
  </div></section>
  <section class="section alt">${sectionHead("Account", "Access and security.")}<div class="container grid grid-3">${noteCards([
    { title:"Change password", copy:"Use the reset link on the login page. Demo accounts fall back to Stackly123 whenever the page reloads." },
    { title:"Signed-in devices", copy:"This build stores one session per browser. Clearing local data signs you out everywhere on this device." },
    { title:"Delete account", copy:"Removes your profile, favourites, and booking history from this browser immediately and without confirmation." }
  ])}</div></section>
  <section class="section">${sectionHead("Language & Region", "Applied across every room you book.")}<div class="container grid grid-2">
    <article class="surface-pad"><h3>Display</h3><p class="muted">Affects how dates, times, and prices are shown to you.</p><div class="form-grid mt-2"><div class="field"><label>Language</label><select><option>English (US)</option><option>English (UK)</option><option>Français</option><option>日本語</option><option>हिन्दी</option></select></div><div class="field"><label>Currency</label><select><option>USD ($)</option><option>GBP (£)</option><option>EUR (€)</option><option>AED (د.إ)</option><option>JPY (¥)</option></select></div><div class="field"><label>Time format</label><select><option>12 hour</option><option>24 hour</option></select></div><div class="field"><label>Home time zone</label><select><option>America/New_York</option><option>Europe/London</option><option>Asia/Dubai</option><option>Asia/Kolkata</option><option>Asia/Tokyo</option></select></div></div></article>
    <article class="surface-pad"><h3>Communication</h3><p class="muted">How and when the concierge desk reaches you.</p><div class="form-grid mt-2"><div class="field"><label>Preferred channel</label><select><option>Email</option><option>SMS</option><option>Phone call</option></select></div><div class="field"><label>Confirmation language</label><select><option>Match display language</option><option>Always English</option></select></div><div class="field"><label>Quiet hours</label><select><option>10 PM - 8 AM</option><option>None</option></select></div><div class="field"><label>Marketing consent</label><select><option>Journal only</option><option>Journal and events</option><option>None</option></select></div></div><button class="btn btn-primary mt-3">Save Preferences</button></article>
  </div></section>
  <section class="section alt">${sectionHead("Signed-in Devices", "Sessions currently holding your data.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Device</th><th>Browser</th><th>Location</th><th>Last Active</th><th>Status</th></tr></thead><tbody>
    <tr><td>This device</td><td>Chrome, Windows</td><td>New York, US</td><td>Now</td><td><span class="status success">Current</span></td></tr>
    <tr><td>iPhone 15</td><td>Safari, iOS</td><td>New York, US</td><td>2 days ago</td><td><span class="status info">Active</span></td></tr>
    <tr><td>MacBook Air</td><td>Safari, macOS</td><td>London, UK</td><td>3 weeks ago</td><td><span class="status warning">Idle</span></td></tr>
  </tbody></table></div><div class="inline-actions mt-3"><button class="btn btn-ghost">Sign Out Other Devices</button><span class="muted">This demo stores one session per browser, so signing out elsewhere only clears local data.</span></div></div></section>
  <section class="section"><div class="container split"><div><span class="eyebrow">Your Data</span><h2>Take it with you, or wipe it.</h2><p class="lead">Everything this build knows about you sits in your browser's LocalStorage. There is no server copy to request and nothing to delete on our side.</p><div class="surface-pad"><p><strong>Export:</strong> downloads your profile, favourites, and booking history as a single JSON file.</p><p><strong>Import:</strong> restores that file on another browser or after clearing your data.</p><p><strong>Clear:</strong> removes everything immediately. It cannot be undone and there is no backup.</p></div><div class="inline-actions mt-3"><button class="btn btn-primary"><i class="fa-solid fa-download"></i> Export Data</button><button class="btn btn-ghost"><i class="fa-solid fa-upload"></i> Import</button></div></div><div class="media-stack"><img src="${DATA.gallery[6]}" alt="Restaurant detail"><img src="${DATA.gallery[3]}" alt="Table setting"></div></div></section>`;
}

function notFoundBody() {
  return `<section class="section"><div class="container split"><div><span class="eyebrow">Error 404</span><h2>This page slipped off the tasting menu.</h2><p class="lead">The link may be old, the page may have moved, or the address may have picked up a typo somewhere along the way.</p><div class="hero-actions"><a class="btn btn-primary" href="index.html"><i class="fa-solid fa-house"></i> Back to Home</a><a class="btn btn-ghost" href="contact.html"><i class="fa-solid fa-comments"></i> Report a Broken Link</a></div></div><div class="media-stack"><img src="${DATA.gallery[0]}" alt="Dining room"><img src="${DATA.gallery[4]}" alt="Plated dish"></div></div></section>
  <section class="section alt">${sectionHead("Try These Instead", "The pages guests actually want.")}<div class="container grid grid-4">${[
    { href:"menu.html", icon:"fa-utensils", title:"Our Menu", copy:"Nine dishes, filtered by course, diet, and price." },
    { href:"reservation.html", icon:"fa-calendar-check", title:"Reservations", copy:"Book any of the seven rooms in under a minute." },
    { href:"events.html", icon:"fa-calendar-days", title:"Events", copy:"Residencies, collaborations, and seasonal tables." },
    { href:"branches.html", icon:"fa-location-dot", title:"Branches", copy:"Addresses, hours, and direct numbers for each city." }
  ].map(l => `<article class="card card-body"><span class="tag"><i class="fa-solid ${l.icon}"></i></span><h3>${l.title}</h3><p>${l.copy}</p><a class="btn btn-ghost" href="${l.href}">Open</a></article>`).join("")}</div></section>
  <section class="section">${sectionHead("Popular Dishes", "Since you are here anyway.", `<a class="btn btn-ghost" href="menu.html">Full Menu</a>`)}<div class="container grid grid-3">${DATA.dishes.slice(0, 3).map(dishCard).join("")}</div></section>
  <section class="section alt"><div class="container split"><div><span class="eyebrow">Looking For Something?</span><h2>Search, or just tell us what broke.</h2><p class="lead">If you arrived here from a link on our own site, that is our mistake and we would like to know about it.</p><form class="form surface-pad" data-contact><input required placeholder="What were you looking for?"><input type="email" placeholder="Email, if you would like a reply"><textarea placeholder="Where did you click from? Paste the link if you have it."></textarea><button class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> Report It</button></form></div><div class="media-stack"><img src="${DATA.gallery[7]}" alt="Restaurant interior"><img src="${DATA.gallery[1]}" alt="Plated course"></div></div></section>
  <section class="section">${sectionHead("From the Journal", "Something to read while you are here.")}<div class="container grid grid-3">${DATA.posts.slice(0, 3).map((p, i) => `<article class="card image-card"><img src="${DATA.gallery[i % DATA.gallery.length]}" alt="${p.title}"><div class="card-body"><span class="tag">${p.tag}</span><h3>${p.title}</h3><p>${p.excerpt}</p><div class="inline-actions"><span class="muted">${p.read}</span><a class="btn btn-ghost" href="404.html">Read</a></div></div></article>`).join("")}</div></section>
  <section class="section alt">${sectionHead("Moved Pages", "Links that changed, and where they went.")}<div class="container"><div class="table-wrap"><table><thead><tr><th>Old Address</th><th>Now Lives At</th><th>Changed</th></tr></thead><tbody>
    <tr><td>/menu/tasting</td><td><a href="menu.html">Our Menu</a></td><td>Jan 2026</td></tr>
    <tr><td>/book</td><td><a href="reservation.html">Reservations</a></td><td>Jan 2026</td></tr>
    <tr><td>/locations</td><td><a href="branches.html">Branches</a></td><td>Mar 2026</td></tr>
    <tr><td>/team</td><td><a href="our-chefs.html">Our Chefs</a></td><td>Mar 2026</td></tr>
    <tr><td>/news</td><td><a href="blog.html">The Journal</a></td><td>May 2026</td></tr>
  </tbody></table></div></div></section>`;
}
document.addEventListener("DOMContentLoaded", () => { initChrome(); initPage(); });
