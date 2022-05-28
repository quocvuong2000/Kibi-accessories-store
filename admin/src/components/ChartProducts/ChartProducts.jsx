import React, { useState } from "react";
import Chart from "react-apexcharts";

const ChartProducts = () => {
  const [dataChart, setDataChart] = useState({
    options: {
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      chart: {
        id: "basic-bar",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"],
      },
      yaxis: {
        show: false,
      },
      title: {
        text: "Last 7 days",
        style: {
          fontSize: "14px",
          fontWeight: "400",
          fonntStyle: "italic",
          fontFamily: "Inter",
          color: "#00000073",
        },
      },
      subtitle: {
        text: "1459 - Total",
        style: {
          fontSize: "12px",
          fontWeight: "400",
          fonntStyle: "italic",
          fontFamily: "Inter",
          color: "#223263",
        },
      },
      noData: {
        text: "No data to show...",
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 65],
      },
    ],
  });
  return (
    <div className="ChartProducts">
      <Chart
        options={dataChart.options}
        series={dataChart.series}
        type="area"
      />
    </div>
  );
};

export default ChartProducts;
