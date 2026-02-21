import { RSI, MACD, EMA, ATR } from "technicalindicators";

export const calculateIndicators = (candles: any[]) => {

  const close = candles.map(c => c.close);
  const high = candles.map(c => c.high);
  const low = candles.map(c => c.low);

  return {
    rsi: RSI.calculate({ values: close, period: 14 }),
    macd: MACD.calculate({
      values: close,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      SimpleMAOscillator: false,
      SimpleMASignal: false
    }),
    ema20: EMA.calculate({ values: close, period: 20 }),
    atr: ATR.calculate({ high, low, close, period: 14 })
  };
};