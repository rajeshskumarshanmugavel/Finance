import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions?: ApexPlotOptions | any;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill?: ApexFill | any;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend?: ApexLegend | any;
  markers?: ApexMarkers | any;
  grid? : ApexGrid | any;
};

export let chartOptions: ChartOptions = {
  series: [
    {
      name: 'Net Profit',
      data: [44, 42, 57, 86, 58, 55, 70, 52, 29, 56, 75, 61],
      color: '#38cab3',
    },
    {
      name: 'Revenue',
      data: [26, 35, 41, 78, 46, 37, 65, 49, 23, 38, 65, 27],
      color: '#e4e7ed',
    },
  ],
  chart: {
    type: 'bar',
    height: 330,
  },
  grid: {
    borderColor: '#f7f9fa',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '30%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 3,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
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
      labels: {
        show: true,
        rotate: -90,
        style: {
          fontSize: '11px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
      tooltip: {
        enabled: false
      }
  },
  yaxis: {
    // title: {
    //   text: "$ (thousands)"
    // }
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return '$ ' + val + ' thousands';
      },
    },
  },
};

export let weeklyVisitors: ChartOptions = {
    series: [
      {
        name: "Male",
        data: [51, 44, 55, 42, 58, 50, 62],
        color: '#38cab3',
      },
      {
        name: "Female",
        data: [56, 58, 38, 50, 64, 45, 55],
        color: '#e4e7ed',
      }
    ],
    chart: {
      height: 315,
      type: "line"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 2
    },
    legend: {
      show: true,
      position: "bottom"
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    
    xaxis: {
      axisBorder: {
        show: false,
        color: "rgba(119, 119, 142, 0.05)",
        offsetX: 0,
        offsetY: 0
      },
      axisTicks: {
        show: false,
        borderType: "solid",
        color: "rgba(119, 119, 142, 0.05)",
        offsetX: 0,
        offsetY: 0
      },
      labels: {
        rotate: -90
      },
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yaxis: {
      show:false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      }
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        }
      ]
    },
    grid: {
      borderColor: "#f2f6f7"
    },
    
}