export const generateSignal = (candles: any[], indicators: any) => {

  const lastPrice = candles[candles.length - 1]?.close;

  const lastRSI = indicators.rsi?.slice(-1)[0];
  const lastMACD = indicators.macd?.slice(-1)[0];
  const lastEMA = indicators.ema20?.slice(-1)[0];
  const lastATR = indicators.atr?.slice(-1)[0];

  if (!lastRSI || !lastMACD || !lastEMA || !lastATR) {
    return {
      signal: "HOLD",
      entry: lastPrice,
      stopLoss: 0,
      takeProfit: 0,
      confidence: "Low"
    };
  }

  let signal = "HOLD";
  let stopLoss = 0;
  let takeProfit = 0;

  const macdBullish = lastMACD.MACD > lastMACD.signal;
  const macdBearish = lastMACD.MACD < lastMACD.signal;

  if (lastRSI < 35 && macdBullish && lastPrice > lastEMA) {
    signal = "BUY";
    stopLoss = lastPrice - lastATR * 1.5;
    takeProfit = lastPrice + lastATR * 3;
  }

  if (lastRSI > 65 && macdBearish && lastPrice < lastEMA) {
    signal = "SELL";
    stopLoss = lastPrice + lastATR * 1.5;
    takeProfit = lastPrice - lastATR * 3;
  }

  return {
    signal,
    entry: lastPrice,
    stopLoss: +stopLoss.toFixed(2),
    takeProfit: +takeProfit.toFixed(2),
    confidence: signal === "HOLD" ? "Low" : "Medium"
  };
};