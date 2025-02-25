require("dotenv").config();


const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const { Circle, CircleEnvironments } = require("@circle-fin/circle-sdk");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const CIRCLE_API_KEY = process.env.CIRCLE_API_KEY;
if (!CIRCLE_API_KEY) {
    console.error("❌ CIRCLE_API_KEY is missing. Please set it in your .env file.");
    process.exit(1); // Stop execution if the API key is missing
}

 
const circle = new Circle(CIRCLE_API_KEY, CircleEnvironments.sandbox);

// Function to create payment intent
async function createUsdcPayment(amount) {
    const reqBody = {
        amount: { amount, currency: "USD" },
        settlementCurrency: "USD",
        paymentMethods: [{ type: "blockchain", chain: "ETH" }],
        idempotencyKey: uuid.v4(),
    };

    try {
        const resp = await circle.cryptoPaymentIntents.createPaymentIntent(reqBody);
        return resp.data;
    } catch (error) {
        console.error("Error creating payment:", error);
        return null;
    }
}

// Function to fetch payment intent details
async function getPaymentIntent(paymentIntentId) {
    try {
        const resp = await circle.cryptoPaymentIntents.getPaymentIntent(paymentIntentId);
        return resp.data;
    } catch (error) {
        console.error("Error getting payment intent:", error);
        return null;
    }
}

// Polling function to get deposit address
async function pollPaymentIntent(paymentIntentId) {
    const pollInterval = 500;

    while (true) {
        const resp = await getPaymentIntent(paymentIntentId);
        const depositAddress = resp?.data?.paymentMethods?.[0]?.address;

        if (depositAddress) return depositAddress;
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }
}

// API Endpoint to create a payment intent
app.post("/create-payment", async (req, res) => {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ success: false, error: "Amount is required" });

    const paymentIntent = await createUsdcPayment(amount);
    if (!paymentIntent || !paymentIntent.data || !paymentIntent.data.id) {
        return res.status(500).json({ success: false, error: "Payment intent creation failed" });
    }

    const paymentIntentId = paymentIntent.data.id; // Ensure ID exists before using it
    console.log(`Payment Intent Created: ${paymentIntentId}`);

    const address = await pollPaymentIntent(paymentIntentId);
    if (!address) return res.status(500).json({ success: false, error: "Failed to retrieve deposit address" });

    res.json({ success: true, address });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
