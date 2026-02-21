import cron from "node-cron";
import { getCandles } from "../services/binance.service";
import { calculateIndicators } from "../services/indicator.service";
import { generateSignal } from "../services/strategy.service";
import { sendTelegramMessage } from "../services/telegram.service";

let lastSignal = "HOLD";

export const startSignalJob = () => {

  cron.schedule("0 */15 * * * *", async () => {

    const symbol = process.env.SYMBOL || "BTCUSDT";

    const candles = await getCandles(symbol);
    const indicators = calculateIndicators(candles);
    const result = generateSignal(candles, indicators);

    console.log("Signal:", result.signal);

    if (result.signal !== "HOLD" && result.signal !== lastSignal) {
      await sendTelegramMessage(result);
      lastSignal = result.signal;
    }

  });
};