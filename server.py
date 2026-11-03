import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Your PayPal Sandbox credentials
CLIENT_ID = "AToVVK6pJRPZbV-_ySnPvmHWQ1VQYqIVtUYFmvPCDgGaWpor-_-fjc5kI-S40F4mIoKaTHovlILK8Jjz"
CLIENT_SECRET = "EMlpqunSMmzOcx65APl_7JeDRxalv2Qqjv6z6iwWWvUFhzfU6dHqFz9KeNygzin8Mk0eZp3EP8wonLYU"

# Get an access token from PayPal
def get_access_token():
    response = requests.post(
        "https://api.sandbox.paypal.com/v1/oauth2/token",
        headers={"Accept": "application/json"},
        data={"grant_type": "client_credentials"},
        auth=(CLIENT_ID, CLIENT_SECRET)
    )
    return response.json()["access_token"]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/pay-paypal", methods=["POST"])
def pay_paypal():
    data = request.json
    quantity = int(data.get("quantity", 1))
    email = data.get("email")

    access_token = get_access_token()

    payment_response = requests.post(
        "https://api.sandbox.paypal.com/v1/payments/payment",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        },
        json={
            "intent": "sale",
            "payer": {"payment_method": "paypal"},
            "redirect_urls": {
                "return_url": "http://localhost:5000/success",
                "cancel_url": "http://localhost:5000/cancel"
            },
            "transactions": [{
                "amount": {"total": str(20 * quantity), "currency": "USD"},
                "description": f"Ticket purchase for {email}"
            }]
        }
    )

    result = payment_response.json()

    if "links" in result:
        for link in result["links"]:
            if link["rel"] == "approval_url":
                return jsonify({"url": link["href"]})
    return jsonify(result)

@app.route("/success")
def success():
    return render_template("success.html")

@app.route("/cancel")
def cancel():
    return render_template("cancel.html")

if __name__ == "__main__":
    app.run(port=5000, debug=True)
