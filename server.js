import express from "express";
import Stripe from "stripe";

const app = express();
const stripe = new Stripe("YOUR_STRIPE_SECRET_KEY");

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { name, email, quantity } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: { name: "Event Ticket" },
        unit_amount: 2000, // $20 per ticket
      },
      quantity: quantity,
    }],
    mode: "payment",
    success_url: "http://localhost:3000/success.html",
    cancel_url: "http://localhost:3000/cancel.html",
  });

  res.json({ url: session.url });
});

app.listen(3000, () => console.log("Server running on port 3000"));
