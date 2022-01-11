import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { useWindowSize } from '../../utils';

export default function RadarChart({ stats }) {
  const labels = stats.map((stat) => {
    return stat.stat.name.toUpperCase();
  });
  const damages = stats.map((stat) => {
    return stat.base_stat;
  });
  const size = useWindowSize();

  const config = {
    options: {
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
            fontSize: size.width > 425 ? '0.75em' : '0.58em',
          },
        },
      },
      chart: {
        fontFamily: 'Montserrat, sans-serif',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radar: {
          size: size.width < 425.02 ? 67 : size.width < 948.02 ? 110 : 100,
          polygons: {
            strokeColors: '#e9e9e9',
            fill: {
              colors: ['#f8f8f8', '#fff'],
            },
          },
        },
      },
    },
    series: [{ name: 'Damage', data: damages }],
  };

  return (
    <ChartContainer>
      {typeof window !== 'undefined' && (
        <CustomReactApexChart
          options={config.options}
          series={config.series}
          height={size.width < 375.02 ? '240' : '300'}
          type="radar"
        />
      )}
    </ChartContainer>
  );
}

/******************** styled components ************************/

const ChartContainer = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768.02px) {
    display: block;
    margin: 0.9em auto;
  }
  @media (max-width: 425.02px) {
    display: block;
    margin: 0 auto;
  }
`;

const CustomReactApexChart = styled(ReactApexChart)`
  display: flex;
  align-items: center;
  width: 100%;
`;
