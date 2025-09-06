const form = document.getElementById("passwordForm");
const generateBtn = document.getElementById("generate");
const siteInput = document.getElementById("site");
const userInput = document.getElementById("username");
const passInput = document.getElementById("password");
const savedContainer = document.getElementById("savedPasswords");
const searchInput = document.getElementById("search");

let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

function generatePassword(length = 16) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

generateBtn.onclick = () => {
  passInput.value = generatePassword();
};

form.onsubmit = (e) => {
  e.preventDefault();
  const newEntry = {
    id: Date.now(),
    site: siteInput.value,
    username: userInput.value,
    password: passInput.value
  };
  passwords.push(newEntry);
  localStorage.setItem("passwords", JSON.stringify(passwords));
  form.reset();
  displayPasswords(passwords);
};

function displayPasswords(data) {
  savedContainer.innerHTML = "";
  data.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${entry.site}</strong><br/>
      Username: ${entry.username}<br/>
      Password: <input type="text" value="${entry.password}" readonly />
      <br/>
      <button onclick="copyPassword('${entry.password}')">Copy</button>
      <button onclick="deletePassword(${entry.id})">Delete</button>
    `;
    savedContainer.appendChild(card);
  });
}

function copyPassword(pass) {
  navigator.clipboard.writeText(pass).then(() => {
    alert("Password copied to clipboard!");
  });
}

function deletePassword(id) {
  passwords = passwords.filter(p => p.id !== id);
  localStorage.setItem("passwords", JSON.stringify(passwords));
  displayPasswords(passwords);
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = passwords.filter(p =>
    p.site.toLowerCase().includes(keyword) || p.username.toLowerCase().includes(keyword)
  );
  displayPasswords(filtered);
});

window.onload = () => {
  displayPasswords(passwords);
};
