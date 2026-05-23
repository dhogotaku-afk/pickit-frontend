const API = "https://pickit-bskz.onrender.com";

async function register() {
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  await fetch(API + "/register", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ phone, password })
  });

  alert("Account created");
}

async function login() {
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ phone, password })
  });

  const data = await res.json();

  if (data.phone) {
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "app.html";
  } else {
    alert("Login failed");
  }
}