import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);

const WindroseChart = () => {
  const data = [
    { time: '12 AM', speed: 10 },
    { time: '1 AM', speed: 5 },
    { time: '2 AM', speed: 15 },
    { time: '3 AM', speed: 8 },
    { time: '4 AM', speed: 12 },
    { time: '5 AM', speed: 7 },
    { time: '6 AM', speed: 18 },
    { time: '7 AM', speed: 11 },
    { time: '8 AM', speed: 14 },
    { time: '9 AM', speed: 9 },
    { time: '10 AM', speed: 16 },
    { time: '11 AM', speed: 6 },
    { time: '12 PM', speed: 13 },
    { time: '1 PM', speed: 4 },
    { time: '2 PM', speed: 20 },
    { time: '3 PM', speed: 3 },
    { time: '4 PM', speed: 10 },
    { time: '5 PM', speed: 5 },
    { time: '6 PM', speed: 15 },
    { time: '7 PM', speed: 8 },
    { time: '8 PM', speed: 12 },
    { time: '9 PM', speed: 7 },
    { time: '10 PM', speed: 18 },
    { time: '11 PM', speed: 11 },
  ];

  const categories = data.map(item => item.time);

  const options = {
    credits: {
      enabled: false // Desactiva la atribución de Highcharts
    },
    chart: {
      polar: true,
      type: 'column',
    },
    title: {
      text: 'Windrose Chart for a Day',
    },
    xAxis: {
      categories: categories,
      tickmarkPlacement: 'on',
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Speed',
      },
    },
    series: [
      {
        name: 'Speed',
        data: data.map(item => item.speed),
        pointPlacement: 'between',
        color: '#8884d8',
      },
    ],
    plotOptions: {
      column: {
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 0,
      },
    },
  };

  useEffect(() => {
    Highcharts.chart('windrose-chart', options);
  }, []);

  return (
    <div>
      <h1>Windrose Chart for a Day</h1>
      <div id="windrose-chart" style={{ width: '400px', height: '400px' }} />
    </div>
  );
};

export default WindroseChart;
