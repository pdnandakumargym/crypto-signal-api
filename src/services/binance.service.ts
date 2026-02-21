import axios from "axios";

export const getCandles = async (symbol: string) => {
  const res = await axios.get("https://api.binance.com/api/v3/klines", {
    params: {
      symbol,
      interval: "15m",
      limit: 200
    }
  });

  return res.data.map((c: any) => ({
    open: parseFloat(c[1]),
    high: parseFloat(c[2]),
    low: parseFloat(c[3]),
    close: parseFloat(c[4]),
    volume: parseFloat(c[5])
  }));
};