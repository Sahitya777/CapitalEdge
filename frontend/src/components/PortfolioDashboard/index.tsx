import GrowthIcon from "@/assets/icons/growthIcon";
import LossIcon from "@/assets/icons/lossIcon";
import React, { useEffect, useState } from "react";
import PerformanceMetrics from "../PerformanceMetrics";
import OverlapAnalysis from "../OverlapAnalysis";
import PortfolioComposition from "../PortfolioComposition";
import axios from "axios";

const PortFolioDashboard = () => {
  const [investmentData, setInvestmentData] = useState([
    {
      title: "Current",
      subtitle: "Investment Value",
      value: "5624700",
      return: 11.38,
    },
    {
      title: "Initial",
      subtitle: "Investment Value",
      value: "5050000",
      return: 15,
    },
    {
      title: "Best",
      subtitle: "Performing Scheme",
      value: "Mirae Asset Large Cap Fund",
      return: 13,
    },
    {
      title: "Worst",
      subtitle: "Performing Scheme",
      value: "Axis Bluechip Fund",
      return: 9.8,
    },
  ]);
  const [tabValue, settabValue] = useState<number>(0);
  const [funds, setfunds] = useState([
    {
      name: "ICICI Prudential Bluechip Fund",
      investment_date: "2023-01-10",
      amount_invested: 1000000,
      isn: "INF109K016L0",
      nav_at_investment: 100,
      returns_percentage: 0.125,
    },
    {
      name: "HDFC Top 100 Fund",
      investment_date: "2022-12-05",
      amount_invested: 800000,
      isn: "INF179K01YV8",
      nav_at_investment: 100,
      returns_percentage: 0.102,
    },
    {
      name: "SBI Bluechip Fund",
      investment_date: "2023-02-15",
      amount_invested: 1200000,
      isn: "INF200K01QX4",
      nav_at_investment: 100,
      returns_percentage: 0.11,
    },
    {
      name: "Axis Bluechip Fund",
      investment_date: "2022-11-20",
      amount_invested: 950000,
      isn: "INF846K01DP8",
      nav_at_investment: 100,
      returns_percentage: 0.098,
    },
    {
      name: "Mirae Asset Large Cap Fund",
      investment_date: "2023-03-01",
      amount_invested: 1100000,
      isn: "INF769K01AX2",
      nav_at_investment: 100,
      returns_percentage: 0.13,
    },
  ]);

  function calculateTotalOneDayReturn(funds: any) {
    let totalInvestment = funds.reduce(
      (sum: any, fund: any) => sum + fund.amount_invested,
      0
    );

    let weightedReturn =
      funds.reduce(
        (sum: any, fund: any) =>
          sum +
          fund.amount_invested *
            (Math.pow(1 + fund.returns_percentage, 1 / 365) - 1) *
            100,
        0
      ) / totalInvestment;

    return weightedReturn.toFixed(4); // Convert to percentage
  }

  useEffect(() => {
    try {
      const fetchInvestmentData = async () => {
        const res = await axios.get("http://127.0.0.1:8000/auth/investments");
        if (res?.data) {
          setfunds(res?.data);
        }
      };
      fetchInvestmentData();
    } catch (error) {
      console.log(error, "err in investment data");
    }
  }, []);

  useEffect(() => {
    try {
      const fetchInvestmentData = async () => {
        const res = await axios.get(
          "http://127.0.0.1:8000/auth/user-investments"
        );
        if (res?.data) {
          setInvestmentData(res?.data);
        }
      };
      fetchInvestmentData();
    } catch (error) {
      console.log(error, "err in investment data");
    }
  }, []);

  return (
    <div className="ml-[200px] mt-20 p-8">
      <div className="flex flex-col gap-3">
        <text className="font-bold text-[24px]">Good morning, Sahitya!</text>
        <text className="text-[16px] text-[#F6F6F6]">
          Evaluvate Your Investment Performance
        </text>
      </div>
      <div className="flex gap-4">
        {investmentData.map((data, id: number) => (
          <div
            key={id}
            className="flex flex-col w-full bg-[#0070df33] p-4 pt-3 pb-3 rounded-xl mt-4"
          >
            <div className="flex justify-between w-full pl-[14px] border-l-[2px] border-[#B2EFFF]">
              <div className="flex flex-col">
                <text>{data.title}</text>
                <text>{data.subtitle}</text>
              </div>
              {
                <div>
                  <div className="flex gap-2 items-center mb-6">
                    {data.return > 0 ? <GrowthIcon /> : <LossIcon />}
                    <text
                      className={
                        data.return > 0 ? "text-[#6BBD6E]" : "text-[#EC817D]"
                      }
                    >
                      {data.return > 0 ? "+" : ""}
                      {id === 0
                        ? calculateTotalOneDayReturn(funds)
                        : data.return}
                      %
                    </text>
                  </div>
                  {id === 0 && (
                    <div className="flex gap-2 items-center mt-[-1.4rem] ml-4">
                      <text className="text-[#6BBD6E] text-[12px]">
                        1 Day Return
                      </text>
                    </div>
                  )}
                </div>
              }
            </div>
            <div className="mt-4 pl-[14px]">
              {id < 2
                ? "₹" + Number(data.value).toLocaleString("en-IN")
                : data.value}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-12 w-full border-b-[1px] border-[#454545] pb-0">
        <div className="flex gap-8">
          <div
            className={
              tabValue === 0
                ? "border-b-[4px] border-[#0858A0] pb-4 cursor-pointer text-[#F6F6F6] font-bold"
                : "pb-4 cursor-pointer text-[#E7E7E7]"
            }
            onClick={() => {
              settabValue(0);
            }}
          >
            Performance Metrics
          </div>
          <div
            className={
              tabValue === 1
                ? "border-b-[4px] border-[#0858A0] pb-4 cursor-pointer text-[#F6F6F6] font-bold"
                : "pb-4 cursor-pointer text-[#E7E7E7]"
            }
            onClick={() => {
              settabValue(1);
            }}
          >
            Portfolio Compositions
          </div>
        </div>
      </div>
      <div>
        {tabValue === 1 && <PortfolioComposition />}
        {tabValue === 0 ? (
          <PerformanceMetrics investmentData={investmentData} />
        ) : (
          <OverlapAnalysis investmentData={funds} />
        )}
      </div>
    </div>
  );
};

export default PortFolioDashboard;
