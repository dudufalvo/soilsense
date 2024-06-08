import axios from 'axios'
import { useEffect, useState } from 'react'
import { MultiValue, SingleValue } from 'react-select';
import SelectDropdown from 'components/SelectDropdown';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Humidity Levels',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Node 1',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: 'rgb(135, 178, 114)',
      backgroundColor: 'rgba(135, 178, 114, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Node 2',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: 'rgb(96, 153, 102)',
      backgroundColor: 'rgba(96, 153, 102, 0.5)',
      yAxisID: 'y1',
    },
    {
      label: 'Node 3',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: 'rgb(82, 107, 69)',
      backgroundColor: 'rgba(82, 107, 69, 0.5)',
      yAxisID: 'y2',
    },
  ],
};


export type DropdownOptionType = {
  value: string,
  image?: string | React.ReactNode,
  label: string,
  id?: number,
  handle?: () => void
}

export const LineChart = () => {
  const [stats, setStats] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<DropdownOptionType>({ label: 'Hour', value: 'hour' });

  const handleSelectedDate = (value: SingleValue<DropdownOptionType> | MultiValue<DropdownOptionType>) => {
    if (!value) return
    const filteredDate = value as DropdownOptionType

    setSelectedDate(filteredDate)
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/central-stats/e081f162-6a3a-4982-85f1-a54a152c965b/${selectedDate?.value}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
    .then((response) => {
      const data = response.data;
      console.log(data);

      const stats = {
        labels: data.period.reverse(),
        datasets: [
          {
            label: 'Average Moisture',
            data: data.average_moisture.reverse().map((item: number) => item > 550 ? 550 : item),
            borderColor: 'rgb(135, 178, 114)',
            backgroundColor: 'rgba(135, 178, 114, 0.5)',
            yAxisID: 'y',
          }
        ],
      }

      setStats(stats);
    }
    )
    .catch((error) => {
      console.log(error);
    });
  }
  , [selectedDate]);

  const filters = [
    { label: 'Hour', value: 'hour' },
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' }
  ]

  return (
    <div>
      <SelectDropdown type='select' sendOptionsToParent={handleSelectedDate} /* defaultOption={dataOptions[0]} */ options={filters} label='Filter' name='date' />
      {stats && <div><Line data={stats} options={options} /></div>}
    </div>
  );
}
