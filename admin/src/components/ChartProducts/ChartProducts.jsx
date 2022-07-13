import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { doGetChartData } from "../../features/Dashboard/dashboardAPI";

const ChartProducts = () => {
  const [series, setSeries] = useState([]);
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
        enabled: true,
      },
      xaxis: {
        categories: ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"],
      },
      yaxis: {
        show: false,
      },
      title: {
        text: "Order last 7 days",
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
  useEffect(() => {
    let cancel = false;

    doGetChartData().then((res) => {
      if (cancel) return;
      const data = res;
      const xData = [];
      let total = 0;
      const seriesData = [
        {
          name: "reservation",
          data: [],
        },
      ];
      if (data.length > 0) {
        data.forEach((item) => {
          // console.log(new Date(item.date).toDateString().split(" ")[0]);
          xData.unshift(new Date(item._id).toDateString().split(" ")[0]);
          seriesData[0].data.unshift(item.count);
        });
        total = data.reduce((total, current) => (total += current.count), 0);
      }
      setSeries(seriesData);
      setDataChart((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: { ...prev.options.xaxis, categories: xData },
        },
      }));
      setDataChart((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          subtitle: {
            ...prev.options.subtitle,
            text: `${total} - Total`,
          },
        },
      }));
    });
    return () => {
      cancel = true;
    };
  }, []);
  return (
    <div className="ChartProducts">
      <Chart options={dataChart.options} series={series} type="area" />
    </div>
  );
};

export default ChartProducts;
