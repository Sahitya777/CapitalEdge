import axios from "axios";
import React, { useEffect, useState } from "react";
import { Sankey, Tooltip, ResponsiveContainer } from "recharts";

const OverlapAnalysis = ({ investmentData }: any) => {
  // State to track selected fund index
  const [selectedFund, setSelectedFund] = useState(null);

  // Function to handle fund selection
  const handleFundClick = (index: any) => {
    // Toggle selection
    setSelectedFund(selectedFund === index ? null : index);
  };

  // Function to check if a link is associated with selected fund
  const isLinkHighlighted = (linkData: any) => {
    return selectedFund !== null && linkData.source === selectedFund;
  };

  // Function to check if a stock (target node) is associated with selected fund
  const isStockHighlighted = (nodeIndex: any) => {
    if (selectedFund === null || nodeIndex < 5) return false; // Only apply to right side nodes (stocks)

    // Check if this stock is linked to the selected fund
    return data.links.some(
      (link) => link.source === selectedFund && link.target === nodeIndex
    );
  };

  // Function to create wrapped text in SVG
  const createWrappedText = (
    x: any,
    y: any,
    text: any,
    width: any,
    fontSize: any
  ) => {
    if (x === undefined || y === undefined) return null;

    const words = text.split(" ");
    const lineHeight = fontSize * 1.2;
    let line = "";
    let lines = [];

    words.forEach((word: any) => {
      const testLine = line + (line ? " " : "") + word;
      // Check if adding this word would exceed the width
      if (testLine.length * (fontSize * 0.6) > width) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    });

    if (line) {
      lines.push(line);
    }

    return lines.map((lineText, i) => (
      <text
        key={i}
        x={x}
        y={y + i * lineHeight}
        fill="white"
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {lineText}
      </text>
    ));
  };

  const [data, setData] = useState({
    nodes: [
      {
        name: "ICICI Prudential Bluechip Fund",
        fill: "#ff9800",
      },
      {
        name: "HDFC Top 100 Fund",
        fill: "#c2185b",
      },
      {
        name: "SBI Bluechip Fund",
        fill: "#2196f3",
      },
      {
        name: "Axis Bluechip Fund",
        fill: "#4caf50",
      },
      {
        name: "Mirae Asset Large Cap Fund",
        fill: "#ff5722",
      },
      {
        name: "Reliance Industries",
        fill: "#008000",
      },
      {
        name: "HDFC Bank",
        fill: "#c4a000",
      },
      {
        name: "TCS",
        fill: "#00bcd4",
      },
      {
        name: "Infosys",
        fill: "#8a2be2",
      },
      {
        name: "ICICI Bank",
        fill: "#ff4081",
      },
      {
        name: "Kotak Mahindra Bank",
        fill: "#795548",
      },
      {
        name: "Bajaj Finance",
        fill: "#ffeb3b",
      },
      {
        name: "Larsen & Toubro",
        fill: "#03a9f4",
      },
      {
        name: "State Bank of India (SBI)",
        fill: "#9c27b0",
      },
    ],
    links: [
      {
        source: 0,
        target: 7,
        value: 20,
        stroke: "#00bcd4",
      },
      {
        source: 0,
        target: 8,
        value: 18,
        stroke: "#8a2be2",
      },
      {
        source: 0,
        target: 6,
        value: 22,
        stroke: "#c4a000",
      },
      {
        source: 0,
        target: 9,
        value: 15,
        stroke: "#ff4081",
      },
      {
        source: 0,
        target: 5,
        value: 25,
        stroke: "#008000",
      },
      {
        source: 1,
        target: 6,
        value: 28,
        stroke: "#c4a000",
      },
      {
        source: 1,
        target: 9,
        value: 24,
        stroke: "#ff4081",
      },
      {
        source: 1,
        target: 11,
        value: 10,
        stroke: "#ffeb3b",
      },
      {
        source: 1,
        target: 10,
        value: 18,
        stroke: "#795548",
      },
      {
        source: 1,
        target: 5,
        value: 20,
        stroke: "#008000",
      },
      {
        source: 2,
        target: 7,
        value: 23,
        stroke: "#00bcd4",
      },
      {
        source: 2,
        target: 8,
        value: 17,
        stroke: "#8a2be2",
      },
      {
        source: 2,
        target: 6,
        value: 21,
        stroke: "#c4a000",
      },
      {
        source: 2,
        target: 12,
        value: 12,
        stroke: "#03a9f4",
      },
      {
        source: 2,
        target: 5,
        value: 27,
        stroke: "#008000",
      },
      {
        source: 3,
        target: 7,
        value: 26,
        stroke: "#00bcd4",
      },
      {
        source: 3,
        target: 8,
        value: 24,
        stroke: "#8a2be2",
      },
      {
        source: 3,
        target: 6,
        value: 22,
        stroke: "#c4a000",
      },
      {
        source: 3,
        target: 5,
        value: 18,
        stroke: "#008000",
      },
      {
        source: 3,
        target: 13,
        value: 10,
        stroke: "#9c27b0",
      },
      {
        source: 4,
        target: 7,
        value: 22,
        stroke: "#00bcd4",
      },
      {
        source: 4,
        target: 8,
        value: 20,
        stroke: "#8a2be2",
      },
      {
        source: 4,
        target: 6,
        value: 23,
        stroke: "#c4a000",
      },
      {
        source: 4,
        target: 9,
        value: 11,
        stroke: "#ff4081",
      },
      {
        source: 4,
        target: 5,
        value: 24,
        stroke: "#008000",
      },
    ],
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("http://127.0.0.1:8000/auth/fund-overlaps");
        if (res?.data) {
          setData(res.data);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error, "err while fetching data");
    }
  }, []);

  // Calculate fund info for the infobox
  const getFundInfo = (fundIndex: any) => {
    if (fundIndex === null) return null;

    const fund = investmentData[fundIndex];
    if (!fund) return null;

    const { name, amount_invested, returns_percentage } = fund;

    // Calculate current investment value (AUM - Assets Under Management)
    const currentInvestmentValue = amount_invested * (1 + (returns_percentage));
    const totalAUM = investmentData?.reduce(
      (sum: any, f: any) =>
        sum + f.amount_invested * (1 + f.returns_percentage),
      0
    );

    // Calculate percentage holding in portfolio
    const percentageHolding = totalAUM
      ? ((currentInvestmentValue / totalAUM) * 100).toFixed(2) + "%"
      : "N/A";

    // Calculate overlapping funds
    const overlappingFunds = [];
    for (let i = 0; i < investmentData?.length; i++) {
      if (i !== fundIndex) {
        // Check if they share any common stocks
        const fundStocks = data.links
          .filter((link) => link.source === fundIndex)
          .map((link) => link.target);

        const otherFundStocks = data.links
          .filter((link) => link.source === i)
          .map((link) => link.target);

        const commonStocks = fundStocks.filter((stock) =>
          otherFundStocks.includes(stock)
        );

        if (commonStocks.length > 0) {
          overlappingFunds.push(
            `${investmentData[i].name} (${commonStocks.length} more)`
          );
        }
      }
    }

    // Calculate total value of links for this fund
    const totalValue = data.links
      .filter((link) => link.source === fundIndex)
      .reduce((sum, link) => sum + link.value, 0);

    // Calculate exposure to top stock
    const topStockLink = data.links
      .filter((link) => link.source === fundIndex)
      .sort((a, b) => b.value - a.value)[0];

    const topStockName = topStockLink
      ? data.nodes[topStockLink.target]?.name || "N/A"
      : "N/A";
    const topStockExposure =
      topStockLink && totalValue
        ? `${Math.round((topStockLink.value / totalValue) * 100)}% of this fund`
        : "N/A";

    return {
      fundName: name,
      category: "Equity - Large Cap",
      overlappingFunds: overlappingFunds[0] || "None",
      visiblePercentage: percentageHolding,
      topStockName,
      topStockExposure,
      aum: `₹${currentInvestmentValue.toLocaleString("en-IN")}`, // Convert to Cr for better readability
      percentageHolding,
    };
  };

  // Get information for the selected fund
  const selectedFundInfo = getFundInfo(selectedFund);

  return (
    <div className="w-full p-6 bg-[#1B1A1A] text-white rounded-lg">
      {/* Header */}
      <div className="flex gap-2 items-center">
        <h2 className="text-lg font-bold mb-4">Overlap Analysis</h2>
        <div className="mb-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#888888" strokeWidth="2" />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fill="#888888"
              fontSize="12"
              fontWeight="bold"
            >
              i
            </text>
          </svg>
        </div>
      </div>
      <p className="text-sm mb-2 text-[#E7E7E7]">
        Comparing: <b>ICICI Prudential Bluechip Fund, </b>
        <b>HDFC Top 100 Fund, </b>
        <b>SBI Bluechip Fund, </b>
        <b>Axis Bluechip Fund</b> and <b>Mirae Asset Large Cap Fund</b>
      </p>

      {/* Legend */}
      <ul className="text-xs mb-4 flex flex-col gap-2">
        <li className="flex gap-1">
          <span className="text-[#FFEBA8]">•</span>
          <span>
            <b>9 Stocks Overlap</b> across these funds.
          </span>
        </li>
        <li className="flex gap-1">
          <span className="text-[#FFEBA8]">•</span>
          <span>
            <b>23% Average Overlap</b> in holdings.
          </span>
        </li>
        <li className="flex gap-1">
          <span className="text-[#FFEBA8]">•</span>
          <span>
            <b>Click on a fund</b> to highlight its associated stocks.
          </span>
        </li>
      </ul>

      {/* Sankey Chart with info box overlay */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={400}>
          <Sankey
            data={data}
            node={({ x, y, width, height, index }) => {
              // Safety check to prevent rendering undefined nodes
              // if (x === undefined || y === undefined || !data.nodes[index]) {
              //   return null;
              // }

              const nodeColor = data.nodes[index]?.fill || "#FFBF38";
              const isLeftNode = index < 5; // First 5 nodes are funds (left side)
              const isSelected = isLeftNode && selectedFund === index;
              const isHighlighted = !isLeftNode && isStockHighlighted(index);

              // Apply visual effects for selected/highlighted elements
              const boxOpacity =
                isSelected || isHighlighted || selectedFund === null ? 1 : 0.5;
              const boxStroke = isSelected ? "#ffffff" : "none";
              const boxStrokeWidth = isSelected ? 2 : 0;
              const textOpacity =
                isHighlighted || selectedFund === null || isSelected ? 1 : 0.5;

              return (
                <g>
                  {/* Vertical color bar */}
                  <rect
                    x={isLeftNode ? x - width / 2 : x + width / 2}
                    y={y - 5}
                    width={8}
                    height={height + 10}
                    fill={nodeColor}
                    fillOpacity={boxOpacity}
                    rx={4}
                    ry={4}
                  />

                  {/* Fund box - only for left nodes */}
                  {isLeftNode && (
                    <rect
                      x={x - 150}
                      y={y + height / 2 - 25}
                      width={130}
                      height={50}
                      fill={nodeColor}
                      fillOpacity={boxOpacity}
                      stroke={boxStroke}
                      strokeWidth={boxStrokeWidth}
                      rx={6}
                      ry={6}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleFundClick(index)}
                    />
                  )}

                  {/* Text label */}
                  {isLeftNode ? (
                    // For left nodes, use wrapped text
                    <g
                      style={{ cursor: "pointer" }}
                      onClick={() => handleFundClick(index)}
                      opacity={textOpacity}
                    >
                      {createWrappedText(
                        x - 85,
                        y + height / 2 - 8,
                        data.nodes[index].name,
                        120,
                        12
                      )}
                    </g>
                  ) : (
                    // For right nodes, use regular text
                    <text
                      x={x + 26}
                      y={y + height / 2 + 2}
                      fill="#B0B0B0"
                      opacity={textOpacity}
                      fontSize={12}
                      textAnchor="start"
                      dominantBaseline="middle"
                    >
                      {data.nodes[index].name.toUpperCase()}
                    </text>
                  )}
                </g>
              );
            }}
            link={({
              sourceX,
              targetX,
              sourceY,
              targetY,
              sourceControlX,
              targetControlX,
              linkWidth,
              index,
            }) => {
              // Safety check to prevent rendering undefined links
              // if (sourceX === undefined || targetX === undefined || sourceY === undefined || targetY === undefined) {
              //   return null;
              // }

              const linkData = data.links[index];

              const isHighlighted = isLinkHighlighted(linkData);

              // Get the source node's fill color for highlighting
              const sourceNodeColor =
                data.nodes[linkData.source]?.fill || "#FFFFFF";

              // Base opacity for all links
              const baseOpacity =
                isHighlighted || selectedFund === null ? 0.2 : 0.1;

              return (
                <path
                  d={`
                    M${sourceX},${sourceY}
                    C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
                  `}
                  fill="none"
                  stroke={isHighlighted ? sourceNodeColor : "#FFFFFF"}
                  strokeWidth={linkWidth}
                  strokeOpacity={baseOpacity}
                  style={{ mixBlendMode: "screen" }}
                />
              );
            }}
            nodePadding={20}
            nodeWidth={4}
            margin={{ top: 20, right: 180, bottom: 20, left: 150 }}
          >
            <Tooltip />
          </Sankey>
        </ResponsiveContainer>

        {/* Info box - only appears when a fund is selected */}
        {selectedFund !== null && selectedFundInfo && (
          <div
            className="absolute bg-[#222222] border border-[#444444] rounded-lg p-4 shadow-lg"
            style={{
              left: "25rem",
              top: "60%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              zIndex: 10,
            }}
          >
            <div className="mb-3 pb-2 border-b border-[#444444]">
              <div className="text-gray-400 text-xs">Mutual Fund</div>
              <div className="text-white font-medium">
                {selectedFundInfo.fundName}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#2A2A2A] p-3 rounded">
                <div className="text-gray-400 text-xs mb-1">Category</div>
                <div className="text-white text-sm">
                  {selectedFundInfo.category}
                </div>
              </div>

              <div className="bg-[#2A2A2A] p-3 rounded">
                <div className="text-gray-400 text-xs mb-1">
                  Holdings Overlap With
                </div>
                <div className="text-white text-sm">
                  {selectedFundInfo.overlappingFunds}
                </div>
              </div>

              <div className="bg-[#2A2A2A] p-3 rounded">
                <div className="text-gray-400 text-xs mb-1">
                  {selectedFundInfo.topStockName} Exposure
                </div>
                <div className="text-white text-sm">
                  {selectedFundInfo.topStockExposure}
                </div>
              </div>

              <div className="bg-[#2A2A2A] p-3 rounded">
                <div className="text-gray-400 text-xs mb-1">
                  % of MF holdings visible in diagram
                </div>
                <div className="text-white text-sm">
                  {selectedFundInfo.visiblePercentage}
                </div>
              </div>

              <div className="bg-[#2A2A2A] p-3 rounded col-span-2">
                <div className="text-gray-400 text-xs mb-1">
                  AUM (Assets Under Management)
                </div>
                <div className="text-white text-sm">{selectedFundInfo.aum}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverlapAnalysis;
