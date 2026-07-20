const { Buffer } = require("buffer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, mobile, gender, level } = req.body || {};
  if (!name || !mobile) {
    return res.status(400).json({ error: "Missing required booking fields" });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return res.status(500).json({ error: "Razorpay credentials are not configured" });
  }

  const amount = 34900;
  const receipt = `rally-circle-${Date.now()}`;
  const body = new URLSearchParams({
    amount: amount.toString(),
    currency: "INR",
    receipt,
    payment_capture: "1",
    "notes[name]": name,
    "notes[mobile]": mobile,
    "notes[gender]": gender || "not specified",
    "notes[level]": level || "beginner",
  });

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.description || "Failed to create Razorpay order" });
    }

    return res.status(200).json({ orderId: data.id, amount: data.amount, currency: data.currency, keyId });
  } catch (error) {
    return res.status(500).json({ error: "Unable to create Razorpay order" });
  }
};
