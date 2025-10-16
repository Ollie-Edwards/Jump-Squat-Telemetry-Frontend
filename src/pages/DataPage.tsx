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
  start_idx?: number;
  takeoff_idx?: number;
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
              xMin: data?.start_idx ?? -1,
              xMax: data?.start_idx ?? -1,
              borderColor: "blue"
            },
            verticalLine2: {
              type: "line",
              xMin: data?.takeoff_idx ?? -1,
              xMax: data?.takeoff_idx ?? -1,
              borderColor: "blue"
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
    ],
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {data ? (
        <>
          <ul>
            {/* Basic way to show important info on screen */}
            {Object.keys(data).map((key, index) => (
              <li key={index}>
                {key}
              </li>
            ))}
          </ul>
          <Line ref={chartRef} options={chartOptions} data={graphDatainfo} />
        </>
      ) : (
        <><h1>Oops, no data found?</h1></>
      )}
    </>
  );
}

export default DataPage;
