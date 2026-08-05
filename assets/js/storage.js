const TastyStorage = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); return value; },
  seed() {
    if (localStorage.getItem("stacklySeeded")) return;
    this.set("users", [
      { id: 1, name: "Amelia Hart", email: "customer@stackly.com", password: "Stackly123", role: "customer" },
      { id: 2, name: "Chef Rafael Moreau", email: "chef@stackly.com", password: "Stackly123", role: "chef" },
      { id: 3, name: "Admin Stackly", email: "admin@stackly.com", password: "Stackly123", role: "admin" }
    ]);
    this.set("reservations", [
      { id: "RSV-1082", name: "Amelia Hart", date: "2026-08-12", time: "20:00", guests: 4, status: "Confirmed", request: "Window table" },
      { id: "RSV-1083", name: "Nikhil Shah", date: "2026-08-14", time: "19:30", guests: 2, status: "Pending", request: "Anniversary plating" }
    ]);
    this.set("favorites", [1, 5, 8]);
    this.set("orders", [
      { id: "ORD-7721", guest: "Maya Lin", dish: "Saffron Lobster Veloute", total: 86, status: "Pending" },
      { id: "ORD-7722", guest: "Jon Bell", dish: "Truffle Morel Risotto", total: 64, status: "Completed" },
      { id: "ORD-7723", guest: "Ava Stone", dish: "Charcoal Paneer Royal", total: 42, status: "Preparing" }
    ]);
    this.set("notifications", [
      "Chef Rafael approved tomorrow's tasting menu.",
      "Private dining suite has one slot left this Friday.",
      "Gold member coupon added to your wallet."
    ]);
    localStorage.setItem("stacklySeeded", "true");
  }
};
TastyStorage.seed();
