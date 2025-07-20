import History from "../Finance/History";
import Payout from "../Finance/Payout";

export const financeTab = [
  { id: "payout", title: "Payout", content: <Payout/> },
  { id: "history", title: "History", content: <History/> },
];
