import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getGraphData } from "../api/manageSensor";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

// Chart options
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Acceleration vs Time",
    },
  },
  scales: {
    y: {
      min: -20,
      max: 20,
      type: "linear",
      ticks: { stepSize: 2 },
    },
    x: {
      min: 0,
      max: 3,
      type: "linear",
      ticks: { stepSize: 0.1 },
    },
  },
};

interface GraphData {
  time: number[];
  acceleration: number[];
  velocity:  number[];
  start_time?: number;
  takeoff_time?: number;
}

function DataPage() {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [chartOptions, setChartOptions] = useState(options);

  const { id } = useParams();
  const chartRef = useRef<ChartJS<"line"> | null>(null);
  // on page load, fetch data

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getGraphData(Number(id));
      setData(response);
      console.log(response);
    } finally {
      setLoading(false);
    }
  };

  // Update chart scale and add annotations after data is stored
  useEffect(() => {
    if (!data) return; // Wait until data is available

    const minAcceleration = Math.min(...data.acceleration ) - 5;
    const maxAcceleration = Math.max(...data.acceleration ) + 5;

    const maxTime = Math.max(...data.time );

    setChartOptions((prev) => ({
      ...prev,
      // Update scales
      scales: {
        y: { ...prev.scales.y, min: minAcceleration, max: maxAcceleration},
        x: { ...prev.scales.x, min: 0, max: maxTime, ticks: { ...prev.scales?.x?.ticks }},
      },
      plugins: {
        ...prev.plugins,
        // Draw annotation lines for push start and takeoff
        annotation: {
          annotations: {
            verticalLine1: {
              type: "line",
              xMin: data?.start_time ?? -1,
              xMax: data?.start_time ?? -1,
              borderColor: "rgba(30, 144, 255, 0.4)",
              borderDash: [4, 4],
            },
            verticalLine2: {
              type: "line",
              xMin: data?.takeoff_time ?? -1,
              xMax: data?.takeoff_time ?? -1,
              borderColor: "rgba(30, 144, 255, 0.4)",
              borderDash: [4, 4],
            },
            axisLine: {
              type: "line",
              yMin: 0,
              yMax: 0,
              borderColor: "rgba(0, 0, 0, 0.2)",
              borderDash: [4, 2],
            },
          },
        },
      },
    }));
  }, [data]); // Runs only after data changes

  useEffect(() => {
    getData();
  }, []);

  const graphDatainfo = {
    labels: data?.time ?? [], // X axis
    datasets: [
      {
        label: "Acceleration",
        data: data?.acceleration ?? [], // Y axis
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 1,
        pointHoverRadius: 8,
      },
      {
        label: "Velocity",
        data: data?.velocity ?? [], // Y axis
        borderColor: "rgba(113, 134, 255)",
        backgroundColor: "rgba(113, 134, 255, 0.5)",
        pointRadius: 1,
        pointHoverRadius: 8,
      },
    ],
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {data ? (
        <>
          <Line className="m-10" ref={chartRef} options={chartOptions} data={graphDatainfo} />
          
          <div className="p-6 bg-gray-50 rounded-2xl shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Jump Analysis Results</h2>

            <ul className="divide-y divide-gray-200">
              {Object.entries(data).map(([key, value]) => (
                <li key={key} className="py-2 flex justify-between">
                  <span className="font-medium text-gray-700">
                    {key.replaceAll("_", " ")}
                  </span>
                  <span className="text-gray-900">{String(value)}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <><h1>No data available.</h1></>
      )}
    </>
  );
}

export default DataPage;
