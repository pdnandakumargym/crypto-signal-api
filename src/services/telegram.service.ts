import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendTelegramMessage = async (data: any) => {

  const text = `
📊 Binance Spot 15m Signal

Symbol: ${process.env.SYMBOL}
Signal: ${data.signal}
Entry: ${data.entry}
StopLoss: ${data.stopLoss}
TakeProfit: ${data.takeProfit}

⚠ Risk 1-2% per trade.
`;

  await axios.post(
    `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
    {
      chat_id: process.env.TG_CHAT_ID,
      text
    }
  );
};