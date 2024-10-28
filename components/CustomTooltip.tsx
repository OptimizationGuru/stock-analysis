import React from 'react';

interface TooltipData {
  label: string | null;
  price: number | null;
  day: string | null;
}

interface CustomTooltipProps {
  tooltipData: TooltipData | null;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ tooltipData }) => {
  if (!tooltipData) {
    return null; // Don't render if no data is provided
  }

  return (
    <div
      style={{
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        borderRadius: '4px',
        padding: '10px',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      <strong>{tooltipData.label}</strong>
      <br />
      Price: ${tooltipData.price?.toFixed(2)}
      <br />
      Day: {tooltipData.day}
    </div>
  );
};

export default CustomTooltip;
