import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {findWatchedFilms} from "./find-watched-films";

const renderGenresChart = (genresCtx, films, period) => {
  // generate array of unique genres
  const genresLabels = [...new Set(films
    .map((film) => film.genres)
    .reduce((acc, genres) => [...acc, ...genres], []))];

  // calculate watched films number by genres
  const watchedFilms = findWatchedFilms(films, period);
  const chartData = genresLabels
    .map((genre) => watchedFilms.reduce((acc, film) => acc + [...film.genres]
      .filter((it) => it === genre).length, 0));

  return new Chart(genresCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genresLabels,
      datasets: [{
        data: chartData,
        backgroundColor: `#ffe800`,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: true,
          anchor: `start`,
          align: `start`,
          offset: 20,
          color: `white`,
          font: {
            family: `'Open Sans', 'sans-serif'`,
            size: 20
          }
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];

            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);

            return `${tooltipData} Films — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 10
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          position: `top`,
          ticks: {
            display: false,
            beginAtZero: true
          }
        }],
        yAxes: [{
          ticks: {
            fontFamily: `'Open Sans', 'sans-serif'`,
            fontSize: 20,
            fontColor: `white`,
            padding: 50
          }
        }]
      }
    }
  });
};

export {renderGenresChart};
