export type NavItem = {
  title: string;
  href?: string;
  children?: NavItem[];
};

export const NAV: NavItem[] = [
  {
    title: "Getting Started",
    children: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "How to Use This Site", href: "/docs/getting-started/how-to-use" },
      { title: "Glossary", href: "/docs/getting-started/glossary" },
    ],
  },
  {
    title: "Trading Basics",
    children: [
      { title: "Trading Basics", href: "/docs/trading/basics" },
      { title: "Trading vs Investing", href: "/docs/trading/trading-vs-investing" },
      { title: "Markets Explained", href: "/docs/trading/markets-explained" },
      { title: "Timeframes", href: "/docs/trading/timeframes" },
      { title: "Order Types", href: "/docs/trading/order-types" },
      { title: "Risk Management", href: "/docs/trading/risk-management" },
      { title: "Trading Psychology", href: "/docs/trading/psychology" },
      { title: "Beginner Mistakes", href: "/docs/trading/beginner-mistakes" },
      { title: "Risk Strategy (Beginners)", href: "/docs/trading/risk-management-strategy" },
{ title: "How Much Money to Start", href: "/docs/trading/how-much-money-to-start" },
    ],
  },
  {
    title: "Crypto",
    children: [
      { title: "What is Crypto?", href: "/docs/crypto/what-is-crypto" },
      { title: "What is an Exchange?", href: "/docs/crypto/what-is-an-exchange" },
      { title: "Wallets: Hot vs Cold", href: "/docs/crypto/wallets-hot-vs-cold" },
      { title: "Crypto Trading Fees", href: "/docs/crypto/fees" },
      { title: "Stablecoins Explained", href: "/docs/crypto/stablecoins" },
      { title: "Security Checklist", href: "/docs/crypto/security-checklist" },
      { title: "Common Crypto Scams", href: "/docs/crypto/common-scams" },
    ],
  },
  {
    title: "Forex",
    children: [
      { title: "What is Forex?", href: "/docs/forex/what-is-forex" },
      { title: "Pips, Spreads, Lots", href: "/docs/forex/pips-spreads-lots" },
      { title: "Leverage & Margin", href: "/docs/forex/leverage-margin" },
      { title: "Regulated Brokers", href: "/docs/forex/regulated-brokers" },
      { title: "Sessions & Volatility", href: "/docs/forex/sessions-volatility" },
      { title: "Risk Management in Forex", href: "/docs/forex/risk-management" },
      { title: "Beginner Strategy", href: "/docs/forex/beginner-strategy" },
    ],
  },
  {
    title: "Platforms & Comparisons",
    children: [
      { title: "Best Trading Apps", href: "/docs/platforms/best-trading-apps" },
      { title: "Best Crypto Exchanges", href: "/docs/platforms/best-crypto-exchanges" },
      { title: "Best Forex Brokers", href: "/docs/platforms/best-forex-brokers" },
      { title: "Binance vs Coinbase", href: "/docs/platforms/binance-vs-coinbase" },
      { title: "Kraken vs Coinbase", href: "/docs/platforms/kraken-vs-coinbase" },
      { title: "Spot vs Futures", href: "/docs/platforms/spot-vs-futures" },
      { title: "CFD vs Spot Trading", href: "/docs/platforms/cfd-vs-spot" },
    ],
  },
  {
    title: "Tools",
    children: [
      { title: "Candlesticks 101", href: "/docs/tools/candlesticks" },
      { title: "Support & Resistance", href: "/docs/tools/support-resistance" },
      { title: "Indicators (RSI/MACD)", href: "/docs/tools/indicators" },
      { title: "Position Size Guide", href: "/docs/tools/position-sizing" },
      { title: "Trading Journal", href: "/docs/tools/trading-journal" },
    ],
  },
  {
    title: "Learning Paths",
    children: [
      { title: "7-Day Beginner Path", href: "/docs/paths/7-day" },
      { title: "30-Day Skill Path", href: "/docs/paths/30-day" },
      { title: "Practice Plan", href: "/docs/paths/practice-plan" },
    ],
  },
];