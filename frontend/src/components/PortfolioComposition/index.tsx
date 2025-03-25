import React, { useEffect, useState } from "react";
import axios from "axios";

const PortfolioComposition = () => {
  const [sectorData, setSectorData] = useState([
    { 
        sector: "Financial", amount: 2081339, percentage: 37, 
        stocks: [
            { stock: "HDFC Bank", amount: 845256, percentage: 40.62 },
            { stock: "ICICI Bank", amount: 437592, percentage: 21.02 },
            { stock: "Bajaj Finance", amount: 218541, percentage: 10.50 },
            { stock: "Kotak Mahindra Bank", amount: 374641, percentage: 18.00 },
            { stock: "SBI", amount: 205309, percentage: 9.86 }
        ]
    },
    { 
        sector: "IT", amount: 1968645, percentage: 35, 
        stocks: [
            { stock: "TCS", amount: 889835, percentage: 45.20 },
            { stock: "Infosys", amount: 661463, percentage: 33.60 },
            { stock: "HCL Tech", amount: 417347, percentage: 21.20 }
        ]
    },
    { 
        sector: "Energy & Conglomerates", amount: 1293681, percentage: 23, 
        stocks: [
            { stock: "Reliance", amount: 837931, percentage: 64.75 },
            { stock: "NTPC", amount: 275553, percentage: 21.30 },
            { stock: "Power Grid", amount: 180197, percentage: 13.95 }
        ]
    },
    { 
        sector: "Industrials", amount: 168741, percentage: 3, 
        stocks: [
            { stock: "L&T", amount: 168741, percentage: 100 }
        ]
    }
]);


  const [expandedSector, setExpandedSector] = useState(null);
  const colors = ["#9BB0C7", "#ADB8CF", "#C6C4D8", "#DAD3E1", "#EBE2EA", "#F8F3F5"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/auth/portfolio_composition');
        if (res?.data?.sector_allocation) {
          const sortedData = res.data.sector_allocation.sort((a:any, b:any) => b.percentage - a.percentage);
          setSectorData(sortedData);
        }
      } catch (error) {
        console.error('Error while fetching data for metrics:', error);
      }
    };

    fetchData();
  }, []);

  const handleSectorClick = (sector:any) => {
    if (expandedSector === sector.sector) {
      setExpandedSector(null);
    } else {
      setExpandedSector(sector.sector);
    }
  };

  // Split into two rows for display
  const firstRow = sectorData.slice(0, Math.ceil(sectorData.length / 2));
  const secondRow = sectorData.slice(Math.ceil(sectorData.length / 2));

  return (
    <div className="bg-[#1B1A1A] p-4 rounded-lg w-full mt-8 mx-auto">
      <h2 className="text-white text-lg font-semibold mb-4">Sector Allocation</h2>
      <div className="flex flex-col gap-4">
        {[firstRow, secondRow].map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 w-full">
            {row.map((sector, index) => {
              const isExpanded = expandedSector === sector.sector;
              
              if (isExpanded) {
                // Separate stocks into top row and bottom row based on your image
                // For Financial: HDFC Bank (40%) and ICICI Bank (30%) go in top row
                // Bajaj Finance (10%) and Kotak Mahindra Bank (20%) go in bottom row
                
                // Top row stocks - typically the larger ones
                const topRowStocks = sector.stocks.slice(0, 2);
                // Bottom row stocks
                const bottomRowStocks = sector.stocks.slice(2);
                
                return (
                  <div
                    key={index}
                    className=" cursor-pointer"
                    style={{
                      flexGrow: sector.percentage,
                      height: '180px', // Same height as non-expanded sectors
                    }}
                  >
                    <div className="flex flex-col h-full gap-2">
                      {/* Top row of stocks */}
                      <div className="flex gap-1  flex-grow">
                        {topRowStocks.map((stock, stockIdx) => {
                          // Calculate relative percentage for this row
                          const rowTotal = topRowStocks.reduce((sum, s) => sum + s.percentage, 0);
                          const relativePercentage = (stock.percentage / rowTotal) * 100;
                          
                          return (
                            <div
                              key={stockIdx}
                              className={`p-2 flex flex-col justify-between ${stockIdx===0?'rounded-tl-xl':stockIdx===topRowStocks.length-1?'rounded-tr-xl':''} `}
                              style={{
                                backgroundColor: colors[(rowIndex * firstRow.length + index) % colors.length],
                                flexGrow: relativePercentage,
                              }}
                              onClick={() => handleSectorClick(sector)}
                            >
                              <div>
                                <p className="text-[#2A313C] font-bold text-sm">{stock.stock}</p>
                                <p className="text-xs text-[#2A313C]">₹{stock.amount.toLocaleString("en-IN")}</p>
                              </div>
                              <p className="text-lg font-bold text-[#2A313C] w-full flex  justify-end">{stock.percentage}%</p>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Bottom row of stocks */}
                      {bottomRowStocks.length > 0 && (
                        <div className="flex gap-1 flex-grow mt-[-0.2rem]">
                          {bottomRowStocks.map((stock, stockIdx) => {
                            // Calculate relative percentage for this row
                            const rowTotal = bottomRowStocks.reduce((sum, s) => sum + s.percentage, 0);
                            const relativePercentage = (stock.percentage / rowTotal) * 100;
                            
                            return (
                              <div
                                key={stockIdx}
                                className={`p-2 flex flex-col justify-between ${stockIdx===0?'rounded-bl-xl':stockIdx===bottomRowStocks.length-1?'rounded-br-xl':''} `}
                                style={{
                                  backgroundColor: colors[(rowIndex * firstRow.length + index + stockIdx + 1) % colors.length],
                                  flexGrow: relativePercentage,
                                }}
                                onClick={() => handleSectorClick(sector)}
                              >
                                <div>
                                  <p className="text-[#2A313C] font-bold text-sm">{stock.stock}</p>
                                  <p className="text-xs text-[#2A313C]">₹{stock.amount.toLocaleString("en-IN")}</p>
                                </div>
                                <p className="text-lg font-bold text-[#2A313C] w-full flex  justify-end">{stock.percentage}%</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              } else {
                // Normal sector view
                return (
                  <div
                    key={index}
                    className="p-4 rounded-xl flex flex-col justify-between cursor-pointer"
                    style={{
                      height: '180px',
                      backgroundColor: colors[(rowIndex * firstRow.length + index) % colors.length],
                      flexGrow: sector.percentage,
                    }}
                    onClick={() => handleSectorClick(sector)}
                  >
                    <div>
                      <p className="text-[#2A313C] font-bold text-md">{sector.sector}</p>
                      <p className="text-sm text-[#2A313C]">₹{sector.amount.toLocaleString("en-IN")}</p>
                    </div>
                    <p className="text-[24px] font-bold text-[#2A313C]">{sector.percentage}%</p>
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioComposition;