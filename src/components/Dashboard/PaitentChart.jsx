import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import PropTypes from "prop-types";

const PatientChart = (props) => {
  const { data } = props;
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);
  const countsPeryear = data?.map((item) => item.count);
  const categories = data?.map((item)=> item.month)
  
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }
    if (chartRef.current && countsPeryear) {
      const sColStackedOptions = {
        chart: {
          height: 230,
          type: "bar",
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "15%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            name: "",
            color: "#2E37A4",
            data: countsPeryear,
          },
        ],
        xaxis: {
          categories: categories,
        },
      };

      chartInstanceRef.current = new ApexCharts(
        chartRef.current,
        sColStackedOptions
      );

      chartInstanceRef.current.render();
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [countsPeryear, data]);

  return <div id="patient-chart" ref={chartRef}></div>;
};

PatientChart.propTypes = {
  data: PropTypes.array
};

export default React.memo(PatientChart);
