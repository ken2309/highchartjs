const seriesList = [
  {
    name: 'Basketball',
    id: 'basketball',
    data: [
      [0, 4, 6, 10, 12],
      [1, 3, 5, 7, 10],
      [3, 4, 6, 8, 10]
    ],
    type: 'boxplot'
  },
  {
    name: 'Triathlon',
    id: 'triathlon',
    data: [
      [0, 4, 6, 13, 18],
      [1, 7, 9, 14, 16],
      [2, 4, 10, 16, 20]
    ],
    type: 'boxplot'
  },
  {
    name: 'Volleyball',
    id: 'volleyball',
    data: [
      [0, 4],
      [0, 7],
      [0, 13],
      [1, 3],
      [2, 4]
    ],
    type: 'scatter',
    marker: {
      symbol: 'triangle'
    }
  },
];

const chartOptions = {
  chart: {
    type: "boxplot",
    renderTo: "chart-container",
  },
  legend: {
    enabled: true
  },
  series: [],
};

const chart = new Highcharts.Chart(chartOptions);

const seriesListElement = document.getElementById("series-list");
seriesList.forEach((series, index) => {
  const li = document.createElement("li");
  li.textContent = series.name;
  li.addEventListener("click", () => {
    const seriesOptions = {
      name: series.name,
      data: series.data,
      type: series.type,
      marker: series.marker
    };

    chart.addSeries(seriesOptions);

    const allSeries = chart.series;
    // console.log(allSeries);
    const boxplotSeries = allSeries.find((s) => s.userOptions.type === "boxplot");
    const scatterSeries = allSeries.find((s) => s.userOptions.type === "scatter");
    // console.log(boxplotSeries, scatterSeries);
    if (boxplotSeries && scatterSeries) {
      scatterSeries.points.forEach((point, index) => {
        const boxplotPoint = boxplotSeries.points[index];
        if (boxplotPoint) point.graphic.element.transform = boxplotPoint.graphic.element.transform;
      });
    }
  });

  seriesListElement.appendChild(li);
});
