import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const options: Highcharts.Options = {
    title: {
        text: 'My chart'
    },
    series: [{
        type: 'line',
        data: [1, 2, 3]
    }]
};
class MyChartComponent extends Component {
  render() {
    // Define your Highcharts configuration options here
    const options = {
      chart: {
        // Add your chart options here
      },
      xAxis: {
        // Add your X-axis options here
      },
      yAxis: {
        // Add your Y-axis options here
      },
      series: [
        {
          name: 'Series 1',
          type: 'area', // or 'line', 'bubble', etc.
          data: [
            // Your data points here
          ],
          color: '#D0D3D4', // Series 1 color
        },
        {
          name: 'Series 2',
          type: 'line', // or other types
          data: [
            // Your data points here
          ],
          color: '#a2e9e3', // Series 2 color
        },
        {
          name: 'Series 3',
          type: 'line', // or other types
          data: [
            // Your data points here
          ],
          color: '#82E0AA', // Series 3 color
        },
      ],
      title: {
        text: 'Superposición de Actividad',
      },
      exporting: {
        enabled: true,
      },
    };

    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default MyChartComponent;
