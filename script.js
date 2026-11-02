// script.js
document.getElementById("ticketForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const quantity = document.getElementById("quantity").value;

  // Send data to backend (Node.js/Express server)
  const response = await fetch("/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, quantity })
  });

  const session = await response.json();

  // Redirect to Stripe checkout
  window.location.href = session.url;
});
