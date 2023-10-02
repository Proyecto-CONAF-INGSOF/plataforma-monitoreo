
import React, { useState } from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines,VerticalBarSeries, HorizontalGridLines, Hint} from 'react-vis';
import 'react-vis/dist/style.css'
import './GraphStyle.css'


type Props = {}

const Graph = (props: Props) => {
  const data = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 }
  ];

  const [hoveredBar, setHoveredBar] = useState(null);
  return (
    <div>
      <h1>HOLA PATO</h1>
      <XYPlot height={200} width={500} xDomain={[9, 0]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          data={data}
          color="#5AC4C3"
          style={{strokeWidth: 2}}
          onValueMouseOver={(datapoint) => setHoveredBar(datapoint)}
          onValueMouseOut={() => setHoveredBar(null)}
        />
        {hoveredBar && (
          <Hint value={hoveredBar} className="custom-hint">
            <div>
              <strong>X:</strong> {hoveredBar.x}
              <br />
              <strong>Y:</strong> {hoveredBar.y}
            </div>
          </Hint>
        )}
      </XYPlot>
    </div>
  );
};

export default Graph