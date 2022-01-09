import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

export default function RadarChart({ stats }) {
  const labels = stats.map((stat) => {
    return stat.stat.name.toUpperCase();
  });
  const damages = stats.map((stat) => {
    return stat.base_stat;
  });

  const config = {
    options: {
      chart: {
        width: '100%',
        height: 450,
      },
      labels: labels,
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '11.5px',
          fontWeight: 'bold',
        },
      },
      xaxis: {
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
          },
        },
      },
      chart: {
        fontFamily: 'Montserrat, sans-serif',
      },
      plotOptions: {
        radar: {
          size: 170,
          polygons: {
            strokeColors: '#e9e9e9',
            fill: {
              colors: ['#f8f8f8', '#fff'],
            },
          },
        },
      },
      title: {
        text: 'Pokemon Stats',
        style: {
          fontSize: '16px',
        },
      },
    },
    series: [{ name: 'Damage', data: damages }],
  };

  return (
    <ChartContainer>
      {typeof window !== 'undefined' && (
        <ReactApexChart
          options={config.options}
          series={config.series}
          type="radar"
          height={450}
          width={'100%'}
          style={{ width: '100%' }}
        />
      )}
    </ChartContainer>
  );
}

/******************** styled components ************************/

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
