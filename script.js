// Handle PayPal payment
document.getElementById("payPayPal").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const quantity = document.getElementById("quantity").value;

  const response = await fetch("/pay-paypal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, quantity })
  });

  const result = await response.json();
  if (result.url) {
    window.location.href = result.url; // Redirect to PayPal checkout
  } else {
    alert("Error: " + result.error);
  }
});

// Handle WAVE payment
document.getElementById("payWave").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const quantity = document.getElementById("quantity").value;

  const response = await fetch("/pay-wave", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, quantity })
  });

  const result = await response.json();
  alert(result.message);
});

// Handle Bank Transfer
document.getElementById("payBank").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const quantity = document.getElementById("quantity").value;

  const response = await fetch("/pay-bank", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, quantity })
  });

  const result = await response.json();
  alert(result.message);
});
