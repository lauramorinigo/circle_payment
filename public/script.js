document.getElementById("payButton").addEventListener("click", async () => {
    const amount = document.getElementById("amount").value;
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const response = await fetch("/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
    });

    const data = await response.json();
    if (data.success) {
        document.getElementById("result").innerHTML = `Send ${amount} USDC to: <br> <strong>${data.address}</strong>`;
    } else {
        document.getElementById("result").innerHTML = "Error creating payment.";
    }
});
