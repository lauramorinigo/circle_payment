# USDC Payment Demo with Circle API

This project demonstrates how Web2 developers can integrate **USDC payments** into their applications using **Circle's API**, making transactions seamless and accessible. The demo allows users to generate a **payment intent**, receive a **crypto deposit address** to pay with wallets like **Lemon Cash, MetaMask, or Trust Wallet**.

## 🌍 Why This Matters?
For many, especially in countries like **Argentina**, financial restrictions limit access to global platforms like **PayPal and Stripe**. However, **USDC and Web3 tools** empower individuals by providing a **borderless, permissionless** way to store and transfer value. This project aims to highlight **financial inclusion** using stablecoins.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Payments:** Circle API (sandbox mode for testing)
- **Frontend:** HTML, JavaScript
- **Security:** API keys managed via `.env`

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/circle_payment.git
cd circle_payment
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a **.env** file in the root directory and add your Circle API key:

```
CIRCLE_API_KEY=your_circle_api_key_here
```

**Note:** The API key should be from **Circle's sandbox environment** for testing.

### 4️⃣ Run the Server
```bash
npm start
```
By default, the app runs on **http://localhost:3000**.

---

## 📌 How It Works

1️⃣ **User enters an amount** (e.g., 10 USDC).  
2️⃣ The backend calls **Circle's API** to create a **payment intent**.  
3️⃣ The app fetches a **USDC deposit address** from Circle.  
4️⃣ The **QR code is dynamically generated**, so users can scan it with **Lemon, MetaMask, or Trust Wallet**.  
5️⃣ The user sends the USDC, and the payment is complete!  

---



## 🎭 Use Case for Financial Inclusion
> *"As someone from Argentina, I can’t use PayPal or Stripe to save in dollars, but I can use the Lemon app for USDC payments. This project is a real-world example of how Web3 solves financial problems."*

---

## 📜 License
MIT License

---

## 🤝 Contributing
Pull requests are welcome! Feel free to open an issue or suggest improvements.

---

## 🛠️ TODO / Future Enhancements
- ✅ Improve UI/UX
- ✅ Enhance error handling
- 🔜 Deploy 
- 🔜 Add transaction confirmation tracking
- 🔜 Generate a QR code to pay

---

🚀 **Let’s bring Web2 developers into Web3 with real-world impact!**

