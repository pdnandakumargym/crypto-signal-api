import { Router } from "express";
import axios from "axios";
import { getCandles } from "../services/binance.service";
import { calculateIndicators } from "../services/indicator.service";
import { generateSignal } from "../services/strategy.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const symbol = (req.query.symbol as string) || "BTCUSDT";

    // 1️⃣ Get candles
    const candles = await getCandles(symbol);

    if (!candles || candles.length === 0) {
      return res.status(400).json({ error: "No candle data" });
    }

    // 2️⃣ Calculate indicators
    const indicators = calculateIndicators(candles);

    if (!indicators?.rsi?.length || !indicators?.macd?.length) {
      return res.status(400).json({ error: "Indicator calculation failed" });
    }

    // 3️⃣ Generate signal
    const result = generateSignal(candles, indicators);

    return res.json(result);

  } catch (error: any) {
    console.error("API ERROR:", error?.message || error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error?.message
    });
  }
});

export default router;