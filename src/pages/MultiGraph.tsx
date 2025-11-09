import { useEffect, useState, useRef } from "react";
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
import annotationPlugin from "chartjs-plugin-annotation";
import { Line } from "react-chartjs-2";

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

export interface GraphData {
  name: string;
  time: number[];
  acceleration: number[];
  colour: string;
  velocity: number[];
  start_time?: number;
  takeoff_time?: number;
}

interface MultiGraphProps {
  datasets: GraphData[];
  title?: string;
}

// Default chart config
const baseOptions = {
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
      type: "linear",
      min: -20,
      max: 20,
      ticks: { stepSize: 2 },
    },
    x: {
      type: "linear",
      min: 0,
      max: 3,
      ticks: { stepSize: 0.1 },
    },
  },
};

function MultiGraph({ datasets, title = "Acceleration vs Time" }: MultiGraphProps) {
  const chartRef = useRef<ChartJS<"line"> | null>(null);
  const [chartOptions, setChartOptions] = useState(baseOptions);

  useEffect(() => {
    if (!datasets || datasets.length === 0) return;

    // Compute global axis limits
    const allAccel = datasets.flatMap((d) => d.acceleration).filter((v: any) => typeof v === "number" && !isNaN(v));;
    const allTime = datasets.flatMap((d) => d.time).filter((v: any) => typeof v === "number" && !isNaN(v));;

    const minA = - 3;
    const maxA = Math.max(...allAccel) + 3;
    const minT = Math.min(...allTime);
    const maxT = Math.max(...allTime);

    // Generate annotation lines for all datasets
    const annotations: Record<string, any> = {
      axisLine: {
        type: "line",
        yMin: 0,
        yMax: 0,
        borderColor: "rgba(0,0,0,0.2)",
        borderDash: [4, 2],
      },
    };

    datasets.forEach((d, i) => {
      if (d.start_time) {
        annotations[`start_${i}`] = {
          type: "line",
          xMin: d.start_time,
          xMax: d.start_time,
          borderColor: "rgba(30,144,255,0.4)",
          borderDash: [4, 4],
        };
      }
      if (d.takeoff_time) {
        annotations[`takeoff_${i}`] = {
          type: "line",
          xMin: d.takeoff_time,
          xMax: d.takeoff_time,
          borderColor: "rgba(30,144,255,0.01)",
          borderDash: [4, 4],
        };
      }
    });

    setChartOptions({
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        title: { display: true, text: title },
        annotation: { annotations },
      },
      scales: {
        y: { ...baseOptions.scales.y, min: minA, max: maxA },
        x: { ...baseOptions.scales.x, min: minT, max: maxT },
      },
    });
  }, [datasets, title]);

  const graphData = {
    labels: datasets[0]?.time ?? [],
    datasets: datasets.flatMap((d, i) => [
      {
        label: `${d.jump_id} - Acceleration`,
        data: d.time.map((t, idx) => ({ x: t, y: d.acceleration[idx] })),
        borderColor: d.colour,
        backgroundColor: d.colour,
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.2,
      },
      {
        label: `${d.jump_id} - Velocity`,
        data: d.time.map((t, idx) => ({ x: t, y: d.velocity[idx] })),
        borderColor: d.colour,
        backgroundColor: d.colour,
        borderDash: [6, 4],
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.2,
      },
    ]),
  };

  return (
    <div className="m-8 w-450 mx-auto">
      <Line ref={chartRef} data={graphData} options={chartOptions} />
    </div>
  );
}

export default MultiGraph;
