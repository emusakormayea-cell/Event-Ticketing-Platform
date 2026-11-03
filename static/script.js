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
    alert("Error: " + JSON.stringify(result));
  }
});
