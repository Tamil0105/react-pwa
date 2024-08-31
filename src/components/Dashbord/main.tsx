import React, { useEffect } from "react";
import { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { cn } from "../../utils/constants/cn";
import { TriggerStore } from "../../Store";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface PropertiesDataType {
  Data: any[];
}
interface RentStatusProps {
  paid: number;
  unpaid: number;
  balance: number;
  monthlyIncome: number;
}
interface MonthlyIncomeProps {
  monthlyIncome: number;
}

const Properties: React.FC<PropertiesDataType> = ({ Data }) => {
  const { sidebarAction, sidebartrigger } = TriggerStore((state) => state);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === Data.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [Data.length]);

  const data = Data.map((item) => {
    return {
      labels: ["Occupied", "Unoccupied"],
      datasets: [
        {
          data: item,
          backgroundColor: ["#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
        },
      ],
    };
  });

  // Handle indicator click
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="min-w-full h-full flex items-center justify-center rounded-lg"
          >
            <div className="p-14 max-w-xs mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Properties Of {index == 0 ? "Residential" : "Commercial"}
              </h3>
              <div className="flex justify-center items-center">
                <div className={cn("h-96 p-2 w-64 flex justify-center ")}>
                  <Pie data={item} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
              <span className="flex flex-col text-center items-center justify-center gap-1">
                <span> Occupied : {item.datasets[0].data[0]}</span>
                <span> UnOccupied : {item.datasets[0].data[1]}</span>
              </span>
              <div className="flex justify-center mt-4">
                {data.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => handleIndicatorClick(i)}
                    className={`h-2 w-2 mx-1 rounded-full cursor-pointer ${
                      i === currentIndex ? "bg-primary" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// const Properties: React.FC<PropertiesDataType> = ({ Data }) => {
//   const data = {
//     labels: ["Occupied", "Unoccupied"],
//     datasets: [
//       {
//         data: Data,
//         backgroundColor: ["#36A2EB", "#FFCE56"],
//         hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
//       },
//     ],
//   };

//   return (
//     <div className=" p-14 max-w-xs mx-auto">
//       <h3 className="text-lg font-semibold mb-4 text-center">Properties</h3>
//       <div className="flex justify-center items-center">
//         <div className="w-80 h-96 p-2 flex justify-center ">
//           <Pie data={data} options={{ maintainAspectRatio: false }} />
//         </div>
//       </div>
//     </div>
//   );
// };

const RentStatus: React.FC<RentStatusProps> = ({
  balance,
  paid,
  monthlyIncome,
  unpaid,
}) => (
  <div className="border p-4 rounded-lg flex flex-col gap-2 shadow-md bg-white">
    <h3 className="text-lg font-semibold mb-2">Rent (Current Month)</h3>
    <div>
      Paid: <span className="font-medium text-lg">{paid}</span>
    </div>
    <div>
      Unpaid: <span className="font-medium text-lg">{unpaid}</span>
    </div>
    <div className="text-lg text-start font-bold ">Monthly: {monthlyIncome}</div>
    <div className="mt-2 border rounded-xl">
      <div
        className="h-2 bg-primary rounded-full"
        style={{ width: "80%" }}
      ></div>
    </div>
    {/* <div className="mt-2 text-sm text-gray-600">
      Balance: {balance} (Previous Month)
    </div> */}
  </div>
);

const MonthlyIncome: React.FC<MonthlyIncomeProps> = ({ monthlyIncome }) => (
  <div className="border p-4 rounded-lg shadow-md bg-white flex flex-col justify-center gap-6">
        <h3 className="text-lg font-semibold ">Report </h3>

    <div className="font- text-lg">
      Total deposit amount:{" "}
      <span className="font-medium capitalize">{monthlyIncome}</span>
    </div>
    <div className="font- text-lg">
      Total previous month balance:{" "}
      <span className="font-medium capitalize">{monthlyIncome}</span>
    </div>
  </div>
);

const BalanceAmount = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Rent  Amount Collected",
        data: [
          6000, 10000, 8000, 7000, 2000, 6000, 10000, 8000, 7000, 2000, 6000,
          10000,
        ],
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "#7955ed"); // Start color (coral)
          gradient.addColorStop(0.5, "#d754e8"); // Middle color (purple)
          gradient.addColorStop(1, "#e854aa"); // End color (green)
          return gradient;
        },
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 12000,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-4">
        Total Rent Collected (Current Year)
      </h3>
      <div className="w-full h-84 p-5 flex justify-center items-center">
        {" "}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

function Dashboard() {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 p-4 gap-4 w-ful  bg-gray-100 h-screen">
      {/* Properties */}
      <div className="w-full border rounded-lg shadow-md flex justify-center  items-center bg-white  ">
        <Properties
          Data={[
            [12, 22],
            [33, 44],
          ]}
        />
      </div>

      {/* Main content */}
      <div className="lg:col-span-2 grid grid-cols-1 gap-4">
        {/* Rent Status and Monthly Income */}
        <div className="grid md:grid-cols-2 gap-4">
          <RentStatus
            paid={1000}
            unpaid={2000}
            monthlyIncome={80000}
            balance={7000}
          />
          <MonthlyIncome monthlyIncome={68000} />
        </div>
        {/* Balance Amount */}
        <div className="col-span-1">
          <BalanceAmount />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
