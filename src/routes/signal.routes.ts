import { Router } from "express";
import { getCandles } from "../services/binance.service";
import { calculateIndicators } from "../services/indicator.service";
import { generateSignal } from "../services/strategy.service";

const router = Router();

router.get("/", async (req, res) => {

  const symbol = req.query.symbol || process.env.SYMBOL;

  const candles = await getCandles(symbol as string);
  const indicators = calculateIndicators(candles);
  const result = generateSignal(candles, indicators);

  res.json(result);
});

export default router;