"use client";
import ProfitIcon from "@/assets/icons/ProfitIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTick = ({ x, y, payload }:any) => {
  // Show label only for every nth tick
  const showLabel = payload.index % 5 === 0;
  return showLabel ? (
    <text x={x} y={y} dy={10} textAnchor="middle" fontSize={12} fill="#666">
      {payload.value}
    </text>
  ) : null;
};

const PerformanceMetrics = ({investmentData}:any) => {
  const [timeStampSelected, setTimeStampSelected] = useState("1M");
  const timePeriods = ["1M", "3M", "6M", "1Y","3Y", "MAX"];

  const [dataSets,setDataSets]: any = useState({
    "1M": [
      {
        "date": "15 Feb 2025",
        "value": 5602384
      },
      {
        "date": "16 Feb 2025",
        "value": 5603152
      },
      {
        "date": "17 Feb 2025",
        "value": 5603921
      },
      {
        "date": "18 Feb 2025",
        "value": 5604689
      },
      {
        "date": "19 Feb 2025",
        "value": 5605457
      },
      {
        "date": "20 Feb 2025",
        "value": 5606226
      },
      {
        "date": "21 Feb 2025",
        "value": 5606994
      },
      {
        "date": "22 Feb 2025",
        "value": 5607763
      },
      {
        "date": "23 Feb 2025",
        "value": 5608531
      },
      {
        "date": "24 Feb 2025",
        "value": 5609300
      },
      {
        "date": "25 Feb 2025",
        "value": 5610069
      },
      {
        "date": "26 Feb 2025",
        "value": 5610838
      },
      {
        "date": "27 Feb 2025",
        "value": 5611607
      },
      {
        "date": "28 Feb 2025",
        "value": 5612377
      },
      {
        "date": "1 Mar 2025",
        "value": 5613146
      },
      {
        "date": "2 Mar 2025",
        "value": 5613916
      },
      {
        "date": "3 Mar 2025",
        "value": 5614685
      },
      {
        "date": "4 Mar 2025",
        "value": 5615455
      },
      {
        "date": "5 Mar 2025",
        "value": 5616225
      },
      {
        "date": "6 Mar 2025",
        "value": 5616995
      },
      {
        "date": "7 Mar 2025",
        "value": 5617765
      },
      {
        "date": "8 Mar 2025",
        "value": 5618535
      },
      {
        "date": "9 Mar 2025",
        "value": 5619305
      },
      {
        "date": "10 Mar 2025",
        "value": 5620076
      },
      {
        "date": "11 Mar 2025",
        "value": 5620846
      },
      {
        "date": "12 Mar 2025",
        "value": 5621617
      },
      {
        "date": "13 Mar 2025",
        "value": 5622387
      },
      {
        "date": "14 Mar 2025",
        "value": 5623158
      },
      {
        "date": "15 Mar 2025",
        "value": 5623929
      },
      {
        "date": "16 Mar 2025",
        "value": 5624700
      }
    ],
    "3M": [
      {
        "date": "19 Dec 2024",
        "value": 5558024
      },
      {
        "date": "22 Dec 2024",
        "value": 5560310
      },
      {
        "date": "25 Dec 2024",
        "value": 5562596
      },
      {
        "date": "28 Dec 2024",
        "value": 5564884
      },
      {
        "date": "31 Dec 2024",
        "value": 5567172
      },
      {
        "date": "3 Jan 2025",
        "value": 5569462
      },
      {
        "date": "6 Jan 2025",
        "value": 5571752
      },
      {
        "date": "9 Jan 2025",
        "value": 5574044
      },
      {
        "date": "12 Jan 2025",
        "value": 5576336
      },
      {
        "date": "15 Jan 2025",
        "value": 5578630
      },
      {
        "date": "18 Jan 2025",
        "value": 5580924
      },
      {
        "date": "21 Jan 2025",
        "value": 5583219
      },
      {
        "date": "24 Jan 2025",
        "value": 5585516
      },
      {
        "date": "27 Jan 2025",
        "value": 5587813
      },
      {
        "date": "30 Jan 2025",
        "value": 5590111
      },
      {
        "date": "2 Feb 2025",
        "value": 5592410
      },
      {
        "date": "5 Feb 2025",
        "value": 5594710
      },
      {
        "date": "8 Feb 2025",
        "value": 5597011
      },
      {
        "date": "11 Feb 2025",
        "value": 5599314
      },
      {
        "date": "14 Feb 2025",
        "value": 5601617
      },
      {
        "date": "17 Feb 2025",
        "value": 5603921
      },
      {
        "date": "20 Feb 2025",
        "value": 5606226
      },
      {
        "date": "23 Feb 2025",
        "value": 5608531
      },
      {
        "date": "26 Feb 2025",
        "value": 5610838
      },
      {
        "date": "1 Mar 2025",
        "value": 5613146
      },
      {
        "date": "4 Mar 2025",
        "value": 5615455
      },
      {
        "date": "7 Mar 2025",
        "value": 5617765
      },
      {
        "date": "10 Mar 2025",
        "value": 5620076
      },
      {
        "date": "13 Mar 2025",
        "value": 5622387
      },
      {
        "date": "16 Mar 2025",
        "value": 5624700
      }
    ],
    "6M": [
      {
        "date": "23 Sep 2024",
        "value": 5492154
      },
      {
        "date": "29 Sep 2024",
        "value": 5496671
      },
      {
        "date": "5 Oct 2024",
        "value": 5501192
      },
      {
        "date": "11 Oct 2024",
        "value": 5505717
      },
      {
        "date": "17 Oct 2024",
        "value": 5510245
      },
      {
        "date": "23 Oct 2024",
        "value": 5514777
      },
      {
        "date": "29 Oct 2024",
        "value": 5519313
      },
      {
        "date": "4 Nov 2024",
        "value": 5523853
      },
      {
        "date": "10 Nov 2024",
        "value": 5528397
      },
      {
        "date": "16 Nov 2024",
        "value": 5532944
      },
      {
        "date": "22 Nov 2024",
        "value": 5537496
      },
      {
        "date": "28 Nov 2024",
        "value": 5542051
      },
      {
        "date": "4 Dec 2024",
        "value": 5546610
      },
      {
        "date": "10 Dec 2024",
        "value": 5551173
      },
      {
        "date": "16 Dec 2024",
        "value": 5555739
      },
      {
        "date": "22 Dec 2024",
        "value": 5560310
      },
      {
        "date": "28 Dec 2024",
        "value": 5564884
      },
      {
        "date": "3 Jan 2025",
        "value": 5569462
      },
      {
        "date": "9 Jan 2025",
        "value": 5574044
      },
      {
        "date": "15 Jan 2025",
        "value": 5578630
      },
      {
        "date": "21 Jan 2025",
        "value": 5583219
      },
      {
        "date": "27 Jan 2025",
        "value": 5587813
      },
      {
        "date": "2 Feb 2025",
        "value": 5592410
      },
      {
        "date": "8 Feb 2025",
        "value": 5597011
      },
      {
        "date": "14 Feb 2025",
        "value": 5601617
      },
      {
        "date": "20 Feb 2025",
        "value": 5606226
      },
      {
        "date": "26 Feb 2025",
        "value": 5610838
      },
      {
        "date": "4 Mar 2025",
        "value": 5615455
      },
      {
        "date": "10 Mar 2025",
        "value": 5620076
      },
      {
        "date": "16 Mar 2025",
        "value": 5624700
      }
    ],
    "1Y": [
      {
        "date": "29 Mar 2024",
        "value": 5359856
      },
      {
        "date": "10 Apr 2024",
        "value": 5368672
      },
      {
        "date": "22 Apr 2024",
        "value": 5377502
      },
      {
        "date": "4 May 2024",
        "value": 5386348
      },
      {
        "date": "16 May 2024",
        "value": 5395208
      },
      {
        "date": "28 May 2024",
        "value": 5404084
      },
      {
        "date": "10 Jun 2024",
        "value": 5413715
      },
      {
        "date": "22 Jun 2024",
        "value": 5422621
      },
      {
        "date": "4 Jul 2024",
        "value": 5431543
      },
      {
        "date": "16 Jul 2024",
        "value": 5440479
      },
      {
        "date": "28 Jul 2024",
        "value": 5449430
      },
      {
        "date": "9 Aug 2024",
        "value": 5458396
      },
      {
        "date": "22 Aug 2024",
        "value": 5468127
      },
      {
        "date": "3 Sep 2024",
        "value": 5477124
      },
      {
        "date": "15 Sep 2024",
        "value": 5486137
      },
      {
        "date": "27 Sep 2024",
        "value": 5495165
      },
      {
        "date": "9 Oct 2024",
        "value": 5504208
      },
      {
        "date": "21 Oct 2024",
        "value": 5513266
      },
      {
        "date": "3 Nov 2024",
        "value": 5523096
      },
      {
        "date": "15 Nov 2024",
        "value": 5532186
      },
      {
        "date": "27 Nov 2024",
        "value": 5541291
      },
      {
        "date": "9 Dec 2024",
        "value": 5550412
      },
      {
        "date": "21 Dec 2024",
        "value": 5559548
      },
      {
        "date": "2 Jan 2025",
        "value": 5568699
      },
      {
        "date": "15 Jan 2025",
        "value": 5578630
      },
      {
        "date": "27 Jan 2025",
        "value": 5587813
      },
      {
        "date": "8 Feb 2025",
        "value": 5597011
      },
      {
        "date": "20 Feb 2025",
        "value": 5606226
      },
      {
        "date": "4 Mar 2025",
        "value": 5615455
      },
      {
        "date": "16 Mar 2025",
        "value": 5624700
      }
    ],
    "3Y": [
      {
        "date": "23 Apr 2022",
        "value": 0
      },
      {
        "date": "29 May 2022",
        "value": 0
      },
      {
        "date": "5 Jul 2022",
        "value": 0
      },
      {
        "date": "10 Aug 2022",
        "value": 0
      },
      {
        "date": "16 Sep 2022",
        "value": 0
      },
      {
        "date": "22 Oct 2022",
        "value": 0
      },
      {
        "date": "28 Nov 2022",
        "value": 950839
      },
      {
        "date": "3 Jan 2023",
        "value": 1757338
      },
      {
        "date": "9 Feb 2023",
        "value": 2769168
      },
      {
        "date": "17 Mar 2023",
        "value": 5089585
      },
      {
        "date": "23 Apr 2023",
        "value": 5115415
      },
      {
        "date": "29 May 2023",
        "value": 5140675
      },
      {
        "date": "5 Jul 2023",
        "value": 5166769
      },
      {
        "date": "10 Aug 2023",
        "value": 5192288
      },
      {
        "date": "16 Sep 2023",
        "value": 5218650
      },
      {
        "date": "22 Oct 2023",
        "value": 5244430
      },
      {
        "date": "28 Nov 2023",
        "value": 5271062
      },
      {
        "date": "3 Jan 2024",
        "value": 5297106
      },
      {
        "date": "9 Feb 2024",
        "value": 5324011
      },
      {
        "date": "16 Mar 2024",
        "value": 5350322
      },
      {
        "date": "22 Apr 2024",
        "value": 5377502
      },
      {
        "date": "28 May 2024",
        "value": 5404084
      },
      {
        "date": "4 Jul 2024",
        "value": 5431543
      },
      {
        "date": "9 Aug 2024",
        "value": 5458396
      },
      {
        "date": "15 Sep 2024",
        "value": 5486137
      },
      {
        "date": "21 Oct 2024",
        "value": 5513266
      },
      {
        "date": "27 Nov 2024",
        "value": 5541291
      },
      {
        "date": "2 Jan 2025",
        "value": 5568699
      },
      {
        "date": "8 Feb 2025",
        "value": 5597011
      },
      {
        "date": "16 Mar 2025",
        "value": 5624700
      }
    ],
    "MAX": [
      {
        "date": "19 Dec 2022",
        "value": 1754354
      },
      {
        "date": "16 Jan 2023",
        "value": 2760816
      },
      {
        "date": "13 Feb 2023",
        "value": 2770563
      },
      {
        "date": "13 Mar 2023",
        "value": 5086801
      },
      {
        "date": "11 Apr 2023",
        "value": 5107023
      },
      {
        "date": "9 May 2023",
        "value": 5126626
      },
      {
        "date": "6 Jun 2023",
        "value": 5146306
      },
      {
        "date": "4 Jul 2023",
        "value": 5166062
      },
      {
        "date": "2 Aug 2023",
        "value": 5186606
      },
      {
        "date": "30 Aug 2023",
        "value": 5206521
      },
      {
        "date": "27 Sep 2023",
        "value": 5226513
      },
      {
        "date": "25 Oct 2023",
        "value": 5246584
      },
      {
        "date": "23 Nov 2023",
        "value": 5267455
      },
      {
        "date": "21 Dec 2023",
        "value": 5287686
      },
      {
        "date": "18 Jan 2024",
        "value": 5307997
      },
      {
        "date": "15 Feb 2024",
        "value": 5328387
      },
      {
        "date": "14 Mar 2024",
        "value": 5348857
      },
      {
        "date": "12 Apr 2024",
        "value": 5370143
      },
      {
        "date": "10 May 2024",
        "value": 5390776
      },
      {
        "date": "7 Jun 2024",
        "value": 5411491
      },
      {
        "date": "5 Jul 2024",
        "value": 5432287
      },
      {
        "date": "3 Aug 2024",
        "value": 5453911
      },
      {
        "date": "31 Aug 2024",
        "value": 5474874
      },
      {
        "date": "28 Sep 2024",
        "value": 5495918
      },
      {
        "date": "26 Oct 2024",
        "value": 5517045
      },
      {
        "date": "24 Nov 2024",
        "value": 5539014
      },
      {
        "date": "22 Dec 2024",
        "value": 5560310
      },
      {
        "date": "19 Jan 2025",
        "value": 5581689
      },
      {
        "date": "16 Feb 2025",
        "value": 5603152
      },
      {
        "date": "16 Mar 2025",
        "value": 5624700
      }
    ]
  })

  useEffect(()=>{
    try {
      const fetchData=async()=>{
        const res=await axios.get('http://127.0.0.1:8000/auth/metrics')
        if(res){
          setDataSets(res?.data)
        }
      }
      fetchData()
    } catch (error) {
      console.log(error,'err while fetching data for metrics')
    }
  },[])

  return (
    <div className="w-full bg-[#1B1A1A] mt-8 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Performance Summary</h2>
      <div className="bg-[#262626] p-2 rounded-lg w-[160px] mb-8">
        <p className="text-lg font-semibold">₹{investmentData[0].value.toLocaleString("en-IN")}</p>
        <div className="flex w-full justify-between items-center mt-2">
          <div className="flex items-center gap-1">
            <ProfitIcon />
            <text className="text-[#6BBD6E]">₹{(investmentData[0].value-investmentData[1].value).toLocaleString('en-IN')}</text>
          </div>
          <div className="h-5 w-[2px] bg-[#6BBD6E]">
          </div>
          <div className=" text-[#6BBD6E]">
            {(((investmentData[0].value-investmentData[1].value)/investmentData[1].value)*100).toFixed(0)}%
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataSets[timeStampSelected]}>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#3D3D3D"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            tickLine={false}
            padding={{ left: 35, right: 35 }}
            interval={0}
            dataKey="date"
            stroke="#ccc"
            dy={8}
            tick={<CustomTick />}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#262626] text-[#B0B0B0] px-3 py-2 rounded-md border border-[#0080FF]">
                    <p>{payload[0].payload.date}</p>
                    <p>Value: {payload[0].payload.value.toLocaleString("en-IN")}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0080FF"
            strokeWidth={2}
            dot={{ fill: "#00aaff", r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-2 mt-6">
        {timePeriods.map((period) => (
          <button
            key={period}
            className={`px-5 py-1 rounded-md text-sm cursor-pointer ${
              period === timeStampSelected
                ? "bg-[#0070DF] text-white"
                : "text-gray-300"
            }`}
            onClick={() => setTimeStampSelected(period)}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;
