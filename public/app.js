async function register() {

  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  try {

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone,
        password
      })
    });

    const data = await res.json();

    if (data.success) {

      alert("Registered successfully");

    } else {

      alert(data.message || "Registration failed");

    }

  } catch (e) {

    alert("Server error");

  }

}

async function login() {

  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  try {

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone,
        password
      })
    });

    const data = await res.json();

    if (data.success) {

      localStorage.setItem("user", JSON.stringify(data));

      window.location.href = "app.html";

    } else {

      alert("Invalid login");

    }

  } catch (e) {

    alert("Server error");

  }

}