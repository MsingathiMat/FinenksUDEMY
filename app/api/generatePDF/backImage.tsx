import React from 'react';
import { Svg, Path } from '@react-pdf/renderer';

// Define the SVG as a React component
const BackgroundSvg = () => (
  <Svg
    viewBox="0 0 500 500"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.1,  // Set transparency
      zIndex: -1,
    }}
  >
    <Path
      d="M0 0 L500 0 L500 500 L0 500 Z"
      fill="lightblue" // Use the desired fill color or gradient
    />
    {/* You can add more complex paths here */}
  </Svg>
);

export default BackgroundSvg;
