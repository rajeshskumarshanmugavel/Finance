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
  stroke?: ApexStroke | any;
  legend?: ApexLegend | any;
  markers?: ApexMarkers | any;
  grid? : ApexGrid | any;
};

export let statistics2: ChartOptions = {
  series: [
    {
      name: "Sales",
      data: [32, 15, 63, 51, 136, 62, 99, 42, 178, 76, 32, 180],
      color: "#38cab3",
    }
  ],
  chart: {
    height: 280,
    type: 'line',
    animations: {
      enabled: false
    },
    zoom: {
      enabled: false
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 5,
      left: 0,
      blur: 3,
      color: '#000',
      opacity: 0.1
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    offsetX: -15,
    fontWeight: "bold",
  },
  grid: {
    borderColor: '#f2f6f7',
  },
  markers: {
    size: 5,
    hover: {
      size: 9
    }
  },
  tooltip: {
    intersect: true,
    shared: false
  },
  xaxis: {
    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
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
      rotate: -90
    }
  },
  yaxis: {
    title: {
      text: 'Growth',
      style: {
        color: '#adb5be',
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
  }
};

export let budget: ChartOptions = {
    series: [
      {
        name: 'This Week',
				data: [44, 42, 57, 86, 58, 55, 70],
        color: '#38cab3',
      },
      {
        name: 'Last Week',
				data: [-34, -22, -37, -56, -21, -35, -60],
        color: '#e4e7ed',
      }
    ],
    chart: {
      stacked: true,
      height: 250,
      type: "bar"
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {

        endingShape: 'rounded',
        colors: {
          ranges: [{
            from: -100,
            to: -46,
            color: '#ebeff5'
          }, {
            from: -45,
            to: 0,
            color: '#ebeff5'
          }]
        },
        columnWidth: '25%',
      }
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
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'sat'],
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
        rotate: -90
      },
    },
    yaxis: {
      title: {
        style: {
          color: '#adb5be',
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
    height: 230,
    type: "line",
    toolbar: {
      show: false,
    },
    background: 'none',
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
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