import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-double-bar',
  templateUrl: './double-bar.component.html',
  styleUrls: ['./double-bar.component.scss']
})
export class DoubleBarComponent implements OnInit {

  chartOptions: {};
  series: any;

  Highcharts = Highcharts;
  constructor() { }

  ngOnInit() {
    this.chartOptions = {

      chart: {
        type: 'column'
      },

      title: {
        text: 'Highcharts responsive chart'
      },

      subtitle: {
        text: 'Resize the frame or click buttons to change appearance'
      },

      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
      },

      xAxis: {
        categories: ['Apples', 'Oranges', 'Bananas'],
        labels: {
          x: -10
        }
      },

      yAxis: {
        allowDecimals: false,
        title: {
          text: 'Amount'
        }
      },

      series: [{
        name: 'Christmas Eve',
        data: [1, 4, 3]
      }, {
        name: 'Christmas Day before dinner',
        data: [6, 4, 2]
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -5
              },
              title: {
                text: null
              }
            },
            subtitle: {
              text: null
            },
            credits: {
              enabled: false
            }
          }
        }]
      }
    };

    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300)

  }
}


