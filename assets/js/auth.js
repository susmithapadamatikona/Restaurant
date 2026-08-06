function currentUser() {
  return TastyStorage.get("currentUser", null) || getSessionUser();
}
function getSessionUser() {
  try { return JSON.parse(sessionStorage.getItem("currentUser")) || null; }
  catch { return null; }
}
function setSignedInUser(user, remember) {
  if (remember) {
    sessionStorage.removeItem("currentUser");
    TastyStorage.set("currentUser", user);
    return;
  }
  localStorage.removeItem("currentUser");
  sessionStorage.setItem("currentUser", JSON.stringify(user));
}
function initRememberMe(login) {
  const remember = login.remember;
  if (!remember) return;
  const hint = login.querySelector("[data-remember-hint]");
  const updateHint = () => {
    if (!hint) return;
    hint.textContent = remember.checked
      ? "Your session will be restored when you reopen this browser."
      : "Your session will end when this browser tab is closed.";
  };
  remember.addEventListener("change", updateHint);
  updateHint();
}
function nameFromEmail(email) {
  return email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Guest";
}
function roleHome(role) {
  return role === "admin" ? "admin-dashboard.html" : role === "chef" ? "chef-dashboard.html" : "customer-dashboard.html";
}
function handleAuthForms() {
  const login = document.querySelector("#loginForm");
  if (login) initRememberMe(login);
  if (login) login.addEventListener("submit", e => {
    e.preventDefault();
    const email = login.email.value.trim().toLowerCase();
    const password = login.password.value;
    if (!email || !password) return toast("Enter your email and password.", "error");
    const role = login.role ? login.role.value : "customer";
    const users = TastyStorage.get("users", []);
    const known = users.find(u => u.email.toLowerCase() === email);
    const stored = known || { id: Date.now(), name: nameFromEmail(email), email, password, role };
    if (!known) TastyStorage.set("users", [...users, stored]);
    // The role picked on the form decides which dashboard this session opens.
    const user = { ...stored, email, role };
    const remember = login.remember ? login.remember.checked : true;
    setSignedInUser(user, remember);
    toast(remember ? `Welcome back, ${user.name}.` : `Welcome back, ${user.name}. This sign-in is for this tab only.`);
    setTimeout(() => location.href = roleHome(role), 500);
  });
  const register = document.querySelector("#registerForm");
  if (register) register.addEventListener("submit", e => {
    e.preventDefault();
    const password = register.password.value;
    if (password.length < 8) return toast("Password must contain at least 8 characters.", "error");
    if (password !== register.confirm.value) return toast("Those passwords do not match.", "error");
    const name = `${register.firstName.value.trim()} ${register.lastName.value.trim()}`.trim();
    const email = register.email.value.trim();
    const role = register.role ? register.role.value : "customer";
    const user = {
      id: Date.now(), name: name || nameFromEmail(email), email, password, role,
      phone: register.phone.value.trim(), birthday: register.birthday.value,
      branch: register.branch.value, dietary: register.dietary.value,
      updates: register.updates.checked
    };
    const users = TastyStorage.get("users", []);
    TastyStorage.set("users", [...users, user]);
    TastyStorage.set("currentUser", user);
    toast(`Welcome to Stackly, ${user.name}.`);
    setTimeout(() => location.href = roleHome(role), 500);
  });
  const forgot = document.querySelector("#forgotForm");
  if (forgot) forgot.addEventListener("submit", e => {
    e.preventDefault();
    toast("Demo reset link sent. Use Stackly123 for sample accounts.");
  });
  document.querySelectorAll("[data-password-toggle]").forEach(btn => btn.addEventListener("click", () => {
    const input = document.querySelector(btn.dataset.passwordToggle);
    input.type = input.type === "password" ? "text" : "password";
    btn.innerHTML = `<i class="fa-solid fa-${input.type === "password" ? "eye" : "eye-slash"}"></i>`;
  }));
  const strengthInput = document.querySelector("[data-strength]");
  if (strengthInput) strengthInput.addEventListener("input", () => {
    const score = Math.min(100, strengthInput.value.length * 10 + (/[A-Z]/.test(strengthInput.value) ? 20 : 0) + (/\d/.test(strengthInput.value) ? 20 : 0));
    const bar = document.querySelector(".strength span");
    bar.style.width = `${score}%`;
    bar.style.background = score > 70 ? "var(--success)" : score > 40 ? "var(--warning)" : "var(--error)";
  });
}

function authBrandPanel(eyebrow, headline, copy, points) {
  return `<a class="auth-back" href="index.html"><i class="fa-solid fa-arrow-left"></i> Back to site</a>
  <div class="auth-brand">
    <img src="${img("photo-1578474846511-04ba529f0b88", "panel")}" alt="Stackly dining room">
    <a class="auth-logo-link" href="index.html"><img class="auth-logo" src="assets/images/stackly-logo.webp" alt="Stackly"></a>
    <div class="auth-brand-inner">
      <span class="eyebrow">${eyebrow}</span>
      <h2>${headline}</h2>
      <p class="lead">${copy}</p>
      <div class="auth-points">${points.map(p => `<div class="auth-point"><i class="fa-solid ${p.icon}"></i><div><strong>${p.title}</strong><span>${p.copy}</span></div></div>`).join("")}</div>
    </div>
  </div>`;
}
function pwField(name, placeholder, strength = false) {
  return `<div class="field"><label for="${name}">${placeholder}</label><div class="pw-field"><input id="${name}" name="${name}"${strength ? " data-strength" : ""} type="password" placeholder="${placeholder}" required><button type="button" title="Show password" data-password-toggle="[name=${name}]"><i class="fa-solid fa-eye"></i></button></div></div>`;
}
function roleField(label) {
  return `<div class="field"><label for="role">${label}</label><select id="role" name="role">
    <option value="customer">Customer</option>
    <option value="chef">Chef</option>
    <option value="admin">Admin</option>
  </select><p class="hint">Customer books tables. Chef sees the kitchen queue. Admin sees every branch.</p></div>`;
}
function socialRow(verb) {
  const providers = [
    { id:"Google", icon:"fa-google" },
    { id:"Facebook", icon:"fa-facebook-f" },
    { id:"Apple", icon:"fa-apple" },
    { id:"X", icon:"fa-x-twitter" }
  ];
  return `<div class="auth-divider">or ${verb} with</div>
  <div class="social-row">${providers.map(p => `<a class="social-btn" href="404.html" title="${verb.replace(/^\w/, c => c.toUpperCase())} with ${p.id}" aria-label="${verb} with ${p.id}"><i class="fa-brands ${p.icon}"></i></a>`).join("")}</div>`;
}
function renderAuth(app, mode) {
  if (mode === "register") {
    const branches = (typeof DATA !== "undefined" ? DATA.branches : []).map(b => `<option>${b.city} - ${b.room}</option>`).join("");
    app.innerHTML = `<section class="auth-split">
      ${authBrandPanel("Stackly Access", "Join the guest list.", "One account carries your preferences and booking history across all seven rooms.", [
        { icon:"fa-bolt", title:"Faster booking", copy:"Your usual guest count and seating preference applied automatically." },
        { icon:"fa-heart", title:"Saved favourites", copy:"Mark dishes as you browse and the kitchen sees them when you book." },
        { icon:"fa-cake-candles", title:"Birthday course", copy:"A dessert course on us during your birthday month, every year." }
      ])}
      <div class="auth-panel"><form class="auth-form" id="registerForm">
        <div class="auth-head"><h1>Create Account</h1><p>It takes about a minute. Everything is stored on this device only.</p></div>
        <div class="form-grid">
          <div class="field"><label for="firstName">First name</label><input id="firstName" name="firstName" placeholder="Amelia" required></div>
          <div class="field"><label for="lastName">Last name</label><input id="lastName" name="lastName" placeholder="Hart" required></div>
        </div>
        <div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" required></div>
        <div class="form-grid">
          <div class="field"><label for="phone">Phone number</label><input id="phone" name="phone" type="tel" placeholder="+1 212 555 0198" required></div>
          <div class="field"><label for="birthday">Date of birth <span class="optional-label">Optional</span></label><input id="birthday" name="birthday" type="date"></div>
        </div>
        <div class="form-grid">
          <div class="field"><label for="branch">Preferred branch <span class="optional-label">Optional</span></label><select id="branch" name="branch"><option value="">No preference</option>${branches}</select></div>
          <div class="field"><label for="dietary">Dietary profile <span class="optional-label">Optional</span></label><select id="dietary" name="dietary"><option value="">No preference</option><option>Vegetarian</option><option>Vegan</option><option>Gluten-free</option><option>Nut-free</option><option>Pescatarian</option></select></div>
        </div>
        ${roleField("Register as")}
        <div class="form-grid">${pwField("password", "Password", true)}${pwField("confirm", "Confirm password")}</div>
        <div class="strength"><span></span></div>
        <p class="hint">At least 8 characters. Add a capital letter and a number to strengthen it.</p>
        <label class="checkbox"><input type="checkbox" name="terms" required><span>I agree to the <a href="404.html">terms of service</a> and <a href="404.html">privacy policy</a>.</span></label>
        <label class="checkbox"><input type="checkbox" name="updates" checked><span>Email me the journal and early access to residency evenings. <span class="optional-label">Optional</span></span></label>
        <button class="btn btn-primary full"><i class="fa-solid fa-user-plus"></i> Create Account</button>
        ${socialRow("sign up")}
        <p class="auth-foot">Already have an account? <a href="login.html">Sign in</a></p>
      </form></div>
    </section>`;
    return;
  }
  if (mode === "forgot") {
    app.innerHTML = `<section class="auth-split">
      ${authBrandPanel("Account Recovery", "Locked out?", "Enter the address on your guest list and the demo concierge will send reset guidance.", [
        { icon:"fa-envelope", title:"Check the address", copy:"Reset links only send to an address already registered." },
        { icon:"fa-clock", title:"Give it five minutes", copy:"Delivery is usually instant but can lag. Check spam first." },
        { icon:"fa-phone", title:"Or call the desk", copy:"+1 212 555 0198 and we can verify you and reset it manually." }
      ])}
      <div class="auth-panel"><form class="auth-form" id="forgotForm">
        <div class="auth-head"><h1>Reset Password</h1><p>We will send a reset link to your registered email address.</p></div>
        <div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" required></div>
        <button class="btn btn-primary full"><i class="fa-solid fa-paper-plane"></i> Send Reset Link</button>
        <p class="auth-foot">Remembered it? <a href="login.html">Return to login</a></p>
      </form></div>
    </section>`;
    return;
  }
  app.innerHTML = `<section class="auth-split">
    ${authBrandPanel("Private Portal", "Welcome back.", "Sign in to manage reservations, favourites, and everything the kitchen already knows about you.", [
      { icon:"fa-calendar-check", title:"Your bookings", copy:"Amend, cancel, or rebook in a couple of clicks." },
      { icon:"fa-utensils", title:"Saved dishes", copy:"Every plate you have favourited, in one place." },
      { icon:"fa-gem", title:"Membership", copy:"Track your tier, perks, and progress to Counter Circle." }
    ])}
    <div class="auth-panel"><form class="auth-form" id="loginForm">
      <div class="auth-head"><h1>Sign In</h1><p>Use a demo account below, or any email and password.</p></div>
      <div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" required></div>
      ${pwField("password", "Password")}
      ${roleField("Sign in as")}
      <div class="inline-actions">
        <label class="checkbox"><input type="checkbox" name="remember" aria-describedby="rememberHint" checked><span>Keep me signed in</span></label>
        <a class="btn btn-text" href="404.html">Forgot password?</a>
      </div>
      <p class="hint" id="rememberHint" data-remember-hint></p>
      <button class="btn btn-primary full"><i class="fa-solid fa-right-to-bracket"></i> Sign In</button>
      ${socialRow("continue")}
      <p class="auth-foot">New here? <a href="register.html">Create an account</a></p>
    </form></div>
  </section>`;
}
