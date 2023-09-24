import { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import { Box, Button } from "@mantine/core";
import { KiteTicker } from "../../../kite-connect/kite-ticker";

const chartOptions = {
  chart: {
    id: "fb",
    group: "social",
    type: "line",
    height: 160,
  },
  colors: ["#008FFB"],
};

const ApexChart = () => {
  const [chartSeries, setChartSeries] = useState([
    {
      data: [
        [1, 19750],
        [2, 19822],
        [3, 19803.065147733483],
        
      ],
    },
  ]);

  function updateChartSeries(value: number) {
    // Add the new value to the end of the array
    setChartSeries((existingData) => {
      const updatedData = [...existingData];
      updatedData[0].data.push([updatedData[0].data.length + 1, value]);
      console.log("updaeede", updatedData);
      return updatedData;
    });
  }

  function subscribe() {
    const niftyFuturesInstrumentToken = 8972290;
    KiteTicker.subscribe([niftyFuturesInstrumentToken]);

    KiteTicker.getTickerInstance().on("ticks", async (ticks) => {
      console.log("ticks", ticks);
      if (ticks[0]) {
        updateChartSeries(ticks[0].last_price);
      }
      // const tick = getTickValue(ticks, niftyFuturesInstrumentToken);
      // if (tick) {
      //   logTicksToCsv(niftyFuturesInstrumentToken, tick);
      //   await handleOnTick(ticks);
      // }
    });
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   updateChartSeries(Math.random() * 10 + 19800);
    // }, 800);

    // // Cleanup the interval when the component unmounts
    // return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Box>
        <Button onClick={subscribe}>Subscribe to Nifty Fut</Button>
        <Button onClick={() => updateChartSeries(Math.random() * 10 + 19800)}>Update</Button>
      </Box>
      <div id="wrapper">
        <div id="chart-line">
          {/* <ReactApexChart
            options={chartOptions as any}
            series={chartSeries}
            type="line"
            height={160}
          /> */}
        </div>
        {/* <div id="chart-line2">
        <ReactApexChart
          options={state.optionsLine2}
          series={state.seriesLine2}
          type="line"
          height={160}
        />
      </div>
      <div id="chart-area">
        <ReactApexChart
          options={state.optionsArea}
          series={state.seriesArea}
          type="area"
          height={160}
        />
      </div> */}
      </div>
    </Box>
  );
};

export default ApexChart;
