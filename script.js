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

fetch('https://b6c402bb-5170-4d82-8b00-abcc7d6e595b-00-3pgr6isdxpgh5.picard.replit.dev/msg/getAll')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    alert(data)
  });

let msgs = [
  { msg: "Hello World", pseudo: "Alice", date: new Date("2024-01-15T10:30:00") },
  { msg: "Blah Blah", pseudo: "Bob", date: new Date("2024-02-20T14:15:00") },
  { msg: "I love cats", pseudo: "Alice", date: new Date("2024-03-06T09:00:00") }
];

function update(tab) {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  tab.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="pseudo">${item.pseudo}</span>
      <span class="msg-text">${item.msg}</span>
      <span class="date">${item.date.toLocaleString()}</span>
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
  msgs.push({ msg: text, pseudo, date: new Date() });
  update(msgs);
  textarea.value = "";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const btn = document.querySelector("#theme-toggle");
  btn.textContent = document.body.classList.contains("dark") ? "☀ Clair" : "☾ Sombre";
}

document.querySelector("#send-btn").addEventListener("click", send);
document.querySelector("#update-btn").addEventListener("click", () => update(msgs));
document.querySelector("#theme-toggle").addEventListener("click", toggleTheme);

update(msgs);