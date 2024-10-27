import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { stockDataArray, StockDataPoint, StockState } from '@/utils/enums';

Chart.register(...registerables);

const StockChartWithShapes: React.FC = () => {
  const [stockState, setStockState] = useState({
    stock: stockDataArray.stock,
    openPrice: stockDataArray.openPrice,
    highestPrice: stockDataArray.highestPrice,
    closingPrice: stockDataArray.closingPrice,
    lowestPrice: stockDataArray.lowestPrice,
    volumeSold: stockDataArray.volumeSold,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tooltipData, setTooltipData] = useState<
    { label: string; value: number }[]
  >([]);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const searchStockState: StockState = useSelector(
    (store: RootState) => store.stocks
  );

  useEffect(() => {
    if (searchStockState?.stock) {
      setStockState({
        stock: searchStockState.stock,
        openPrice: searchStockState.openPrice,
        highestPrice: searchStockState.highestPrice,
        closingPrice: searchStockState.closingPrice,
        lowestPrice: searchStockState.lowestPrice,
        volumeSold: searchStockState.volumeSold,
      });
    }
  }, [searchStockState]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    const formatData = (arr: StockDataPoint[]) => {
      return arr?.map((el) => ({
        x: el.day,
        y: el.value,
        day: el.day,
      }));
    };

    const datasets = [
      {
        label: stockState.stock,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
      },
      {
        label: 'Open Price',
        data: formatData(stockState.openPrice),
        type: 'line',
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        pointStyle: 'circle',
        radius: 10,
        fill: false,
        tension: 0,
      },
      {
        label: 'Closing Price',
        data: formatData(stockState.closingPrice),
        type: 'scatter',
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
        pointStyle: 'rect',
        radius: 10,
        hoverRadius: 12,
        borderWidth: 2,
      },
      {
        label: 'Highest Price',
        data: formatData(stockState.highestPrice),
        type: 'scatter',
        borderColor: '#FFCE56',
        backgroundColor: '#FFCE56',
        pointStyle: 'triangle',
        radius: 10,
        hoverRadius: 12,
        borderWidth: 2,
      },
      {
        label: 'Lowest Price',
        data: formatData(stockState.lowestPrice),
        type: 'scatter',
        borderColor: '#4BC0C0',
        backgroundColor: '#4BC0C0',
        pointStyle: 'circle',
        radius: 10,
        hoverRadius: 12,
        borderWidth: 2,
      },
      {
        label: 'Volume',
        data: formatData(stockState.volumeSold),
        type: 'scatter',
        borderColor: '#9966FF',
        backgroundColor: '#9966FF',
        pointStyle: 'star',
        borderWidth: 2,
        radius: 10,
        hoverRadius: 12,
        tension: 0.3,
      },
    ];

    const chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Week Days',
            },
            beginAtZero: false,
            ticks: {
              callback: (value) => `Oct ${value}`,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Prices (in $) / Volume (in Thousands)',
            },
            beginAtZero: true,
          },
        },
      },
    });

    const handleMouseMove = (event: MouseEvent) => {
      const canvasPosition = canvasRef.current?.getBoundingClientRect();
      const mouseX = event.clientX - (canvasPosition?.left || 0);
      const mouseY = event.clientY - (canvasPosition?.top || 0);
      const points = chart.getElementsAtEventForMode(
        event,
        'nearest',
        { intersect: true },
        false
      );

      if (points.length) {
        let day: number | null = null;
        const tooltipPoints: { label: string; value: number }[] = [];

        points.forEach((point) => {
          const datasetIndex = point.datasetIndex;
          const index = point.index;
          const dataset = datasets[datasetIndex];
          const dataPoint = dataset.data[index] as {
            x: number;
            y: number;
            day: number;
          };

          if (dataPoint) {
            if (!day) day = dataPoint.day;
          }
        });

        if (day !== null) {
          const open =
            stockState.openPrice.find((d) => d.day === day)?.value || 0;
          const close =
            stockState.closingPrice.find((d) => d.day === day)?.value || 0;
          const high =
            stockState.highestPrice.find((d) => d.day === day)?.value || 0;
          const low =
            stockState.lowestPrice.find((d) => d.day === day)?.value || 0;
          const volume =
            stockState.volumeSold.find((d) => d.day === day)?.value || 0;

          const values = [
            { label: 'Open Price', value: open },
            { label: 'Closing Price', value: close },
            { label: 'Highest Price', value: high },
            { label: 'Lowest Price', value: low },
          ];

          const groupedValues: { label: string; value: number }[] = [];

          for (let i = 0; i < values.length; i++) {
            for (let j = i + 1; j < values.length; j++) {
              const difference = Math.abs(values[i].value - values[j].value);
              if (difference < 200) {
                if (!groupedValues.includes(values[i]))
                  groupedValues.push(values[i]);
                if (!groupedValues.includes(values[j]))
                  groupedValues.push(values[j]);
              }
            }
          }

          if (groupedValues.length > 0) {
            setTooltipData(groupedValues);
          } else {
            setTooltipData([{ label: 'Volume Sold', value: volume }]);
          }
          setTooltipPosition({ x: mouseX, y: mouseY });
        }
      } else {
        setTooltipData([]);
        setTooltipPosition(null);
      }
    };

    const canvasElement = canvasRef.current;
    canvasElement?.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvasElement?.removeEventListener('mousemove', handleMouseMove);
      chart.destroy();
    };
  }, [stockState]);

  return (
    <div className="border border-black z-50 sm:w-[100%] lg:w-[85%] h-96 relative">
      <canvas ref={canvasRef} width="1200" height="600" />
      {tooltipPosition && tooltipData.length > 0 && (
        <div
          className="absolute bg-white border border-gray-300 p-2 rounded shadow"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y + 10,
            pointerEvents: 'none',
          }}
        >
          {tooltipData.map((item, index) => (
            <div key={index}>
              {item.label}: ${item.value.toFixed(2)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockChartWithShapes;
