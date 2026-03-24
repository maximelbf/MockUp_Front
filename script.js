function fact(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
}

function applique(f, tab) {
  return tab.map(f);
}

var msgs = [];

function fetchMsgs() {
  fetch('https://b6c402bb-5170-4d82-8b00-abcc7d6e595b-00-3pgr6isdxpgh5.picard.replit.dev/msg/getAll')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (Array.isArray(data.msgs)) {
        msgs = data.msgs;
        update(msgs);
      }
    })
    .catch(function(err) {
      console.error("Failed to fetch messages:", err);
    });
}

function update(tab) {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  tab.forEach(item => {
    const li = document.createElement("li");
    const dateStr = item.date ? new Date(item.date).toLocaleString() : "";
    li.innerHTML = `
      <span class="pseudo">${item.pseudo}</span>
      <span class="msg-text">${item.msg}</span>
      <span class="date">${dateStr}</span>
    `;
    ul.appendChild(li);
  });
}

function send() {
  const textarea = document.querySelector("textarea");
  const pseudoInput = document.querySelector("#pseudo");
  const text = textarea.value.trim();
  const pseudo = pseudoInput.value.trim() || "Anonyme";
  if (!text) return;
  msgs.push({ msg: text, pseudo, date: new Date().toISOString() });
  update(msgs);
  textarea.value = "";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const btn = document.querySelector("#theme-toggle");
  btn.textContent = document.body.classList.contains("dark") ? "☀ Clair" : "☾ Sombre";
}

document.querySelector("#send-btn").addEventListener("click", send);
document.querySelector("#update-btn").addEventListener("click", fetchMsgs);
document.querySelector("#theme-toggle").addEventListener("click", toggleTheme);

fetchMsgs();
