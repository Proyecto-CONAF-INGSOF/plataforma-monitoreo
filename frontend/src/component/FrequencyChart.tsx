import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
//import './WindChartStyle.css'; // Importa tu archivo de estilo CSS

HighchartsMore(Highcharts);

const WindroseChart = () => {
  const data = [
    { time: '0 ', speed: 0 },
    { time: '1 ', speed: 0 },
    { time: '2 ', speed: 0 },
    { time: '3 ', speed: 0 },
    { time: '4 ', speed: 12 },
    { time: '5 ', speed: 7 },
    { time: '6 ', speed: 18 },
    { time: '7 ', speed: 11 },
    { time: '8 ', speed: 14 },
    { time: '9 ', speed: 9 },
    { time: '10 ', speed: 16 },
    { time: '11 ', speed: 6 },
    { time: '12 ', speed: 13 },
    { time: '13 ', speed: 4 },
    { time: '14 ', speed: 11 },
    { time: '15 ', speed: 3 },
    { time: '16 ', speed: 10 },
    { time: '17 ', speed: 5 },
    { time: '18 ', speed: 15 },
    { time: '19 ', speed: 12 },
    { time: '20 ', speed: 7 },
    { time: '21 ', speed: 18 },
    { time: '22 ', speed: 11 },
    { time: '23 ', speed: 13 },
  ];

  const categories = data.map(item => item.time);

  const options = {
    credits: {
      enabled: false, // Desactiva la atribución de Highcharts
    },
    chart: {
      polar: true,
      type: 'column',
      
      //backgroundColor: 'lightblue', // Color de fondo del gráfico
    },
    title: {
      text: 'Grafico de Frecuencia Horaria',
      style: {
        color: 'black', // Color del título
        fontSize: '18px', // Tamaño de fuente del título
        fontWeight: 'bold', // Peso de fuente del título
        textAlign: 'center', // Alineación del título
      },
    },
    xAxis: {
      categories: categories,
      tickmarkPlacement: 'on',
      lineWidth: 4, // Ancho de línea del eje X
      lineColor:'#CED6E9',
      gridLineColor:'rgba(224,224,224)',
      labels: {
        style: {
          color: 'rgba(100,100,100)', // Color de las etiquetas del eje X
          fontSize: '12px', // Tamaño de fuente de las etiquetas
          fontWeight: 'light', // Peso de fuente de las etiquetas
        },
      },
    },
    yAxis: {
      min: 0,
      max: 24, // Ajusta el rango máximo según tus datos
      tickInterval: 12, // Controla la cantidad de gridlines en el eje Y
      gridLineInterpolation: 'plygon', // Configura las gridlines como rectas
      title: {
        enabled: false,
        text: 'frecuencia',
        rotation: 0,
        style: {
          color: 'black', // Color del título del eje Y
        },
      },
      plotBands: [
        {
          from: 0, // Valor inicial del nivel
          to: 12, // Valor final del nivel
          color: 'rgba(249, 249, 249)', // Color del área entre los niveles
        },
        // Agrega más plotBands según sea necesario
      ],
    },
    series: [
      {
        name: 'frecuencia de actividad',
        data: data.map(item => item.speed),
        pointPlacement: 'on', // Coloca las columnas en el centro de las etiquetas del eje X
        color: 'rgb(141,215,152) ',//color de las barras
        dataLabels: {
          enabled: false, // Mostrar etiquetas de datos
          color: 'black', // Color del texto de las etiqueta de datos
          style: {
            fontSize: '12px', // Tamaño de fuente de las etiquetas de datos
            fontWeight: 'normal', // Peso de fuente de las etiquetas de datos
          },
        },
      },
    ],
    plotOptions: {
      column: {
        pointPadding: 0.02,
        groupPadding: 0,
        borderWidth: 0.,
      },
    },
  };

  useEffect(() => {
    Highcharts.chart('windrose-chart', options);
  }, []);

  return (
    <div>
      <h1>Grafico de Frecuencia Horaria</h1>
      <div id="windrose-chart" style={{ width: '600px', height: '450px' }} />
    </div>
  );
};

export default WindroseChart;
