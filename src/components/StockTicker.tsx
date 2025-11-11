import React from 'react';

const StockTicker = () => {
  const stocks = [
    { symbol: 'AAPL', price: '175.84', change: '+2.34' },
    { symbol: 'MSFT', price: '378.85', change: '+5.67' },
    { symbol: 'TSLA', price: '248.50', change: '-3.21' },
    { symbol: 'JPM', price: '158.92', change: '+1.88' },
    { symbol: 'NVDA', price: '875.28', change: '+12.45' },
    { symbol: 'GOOGL', price: '140.92', change: '+2.76' },
  ];

  // Duplicate items for seamless loop
  const duplicatedStocks = [...stocks, ...stocks];

  return (
    <div className="w-full bg-gradient-to-r from-card/30 to-background/30 border-b border-primary/20 py-2 overflow-hidden relative z-50">
      <div className="flex items-center">
        <div className="px-4 flex-shrink-0">
          <span className="text-xs font-bold text-primary uppercase tracking-wide">
            LIVE MARKETS
          </span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex animate-marquee-scroll hover:animate-marquee-fast">
            {duplicatedStocks.map((stock, index) => (
              <div
                key={`${stock.symbol}-${index}`}
                className="flex items-center space-x-3 px-6 whitespace-nowrap"
              >
                <span className="text-primary font-semibold text-sm">{stock.symbol}</span>
                <span className="text-foreground text-sm">${stock.price}</span>
                <span 
                  className={`text-xs font-medium ${
                    stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {stock.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTicker;