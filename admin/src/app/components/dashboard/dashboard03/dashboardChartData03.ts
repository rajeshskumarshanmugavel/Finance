import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions?: ApexPlotOptions | any;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill?: ApexFill | any;
  tooltip: ApexTooltip;
  stroke?: ApexStroke | any;
  legend?: ApexLegend | any;
  markers?: ApexMarkers | any;
  grid?: ApexGrid | any;
};

export let budget: ChartOptions = {
  series: [
    {
      name: 'active',
      data: [44, 42, 57, 86, 58, 55, 70, 43, 23, 54, 77, 34],
      color: '#38cab3',
    },
    {
      name: 'inactive',
      data: [-34, -22, -37, -56, -21, -35, -60, -34, -56, -78, -89, -53],
      color: '#e4e7ed',
    },
  ],
  chart: {
    stacked: true,
    height: 350,
    type: 'bar',
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      endingShape: 'rounded',
      colors: {
        ranges: [
          {
            from: -100,
            to: -46,
            color: '#ebeff5',
          },
          {
            from: -45,
            to: 0,
            color: '#ebeff5',
          },
        ],
      },
      columnWidth: '25%',
    },
  },
  legend: {
    show: true,
    position: 'bottom',
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6,
    },
  },

  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ],
    axisBorder: {
      show: true,
      color: 'rgba(119, 119, 142, 0.05)',
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: true,
      borderType: 'solid',
      color: 'rgba(119, 119, 142, 0.05)',
      offsetX: 0,
      offsetY: 0,
    },
    labels: {
      rotate: -90,
    },
  },
  yaxis: {
    title: {
      text: 'Growth',
      style: {
        color: '	#adb5be',
        fontSize: '14px',
        fontFamily: 'poppins, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-label',
      },
    },
    labels: {
      formatter: function (y) {
        return y.toFixed(0) + '';
      },
    },
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val;
          },
        },
      },
      {
        title: {
          formatter: function (val) {
            return val;
          },
        },
      },
      {
        title: {
          formatter: function (val) {
            return val;
          },
        },
      },
    ],
  },
  grid: {
    borderColor: '#f2f6f7',
  },
};

export let weeklyVisitors: ChartOptions = {
  series: [
    {
			name: 'Male',
			data: [44, 42, 57, 86, 58, 55, 70],
      color: '#38cab3',
    },
    {
      name: 'Female',
      data: [34, 22, 47, 56, 21, 35, 60],
      color: '#e4e7ed',
    },
  ],
  chart: {
    stacked: true,
    height: 330,
    type: 'bar',
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
			horizontal: false,
			columnWidth: '30%',
		},
  },
  legend: {
    show: true,
    position: 'bottom',
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6,
    },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Mon','Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
			axisBorder: {
				show: true,
				color: 'rgba(119, 119, 142, 0.05)',
				offsetX: 0,
				offsetY: 0,
			},
			axisTicks: {
				show: true,
				borderType: 'solid',
				color: 'rgba(119, 119, 142, 0.05)',
				offsetX: 0,
				offsetY: 0
			},
  },
  yaxis: {
    title: {
      style: {
        color: '	#adb5be',
        fontSize: '14px',
        fontFamily: 'poppins, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-label',
      },
    },
    labels: {
    formatter: function (y) {
      return y.toFixed(0) + "";
    }
    }
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val;
          },
        },
      },
      {
        title: {
          formatter: function (val) {
            return val;
          },
        },
      },
      {
        title: {
          formatter: function (val) {
            return val;
          },
        },
      },
    ],
  },
  grid: {
    borderColor: '#eff2f6',
  },
};
