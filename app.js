const API = "https://pickit-bskz.onrender.com";

async function register() {

  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  try {

    await fetch(API + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: phone,
        password: password
      })
    });

    alert("Registered successfully");

  } catch (e) {

    alert("Registration failed");

  }
}

async function login() {

  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  try {

    const res = await fetch(API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: phone,
        password: password
      })
    });

    const data = await res.json();

    if (data.phone) {

      localStorage.setItem("user", JSON.stringify(data));

      window.location.href = "app.html";

    } else {

      alert("Invalid login");

    }

  } catch (e) {

    alert("Server error");

  }
}