import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  chartOptions : {};
  series:any;

  Highcharts = Highcharts;
  constructor() { }

  ngOnInit() {
    this.chartOptions= {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Browser market shares. January, 2018'
      },
      subtitle: {
          text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
      },
      accessibility: {
          announceNewData: {
              enabled: true
          }
      },
      xAxis: {
          type: 'category'
      },
      yAxis: {
          title: {
              text: 'Total percent market share'
          }
  
      },
      legend: {
          enabled: false
      },
      plotOptions: {
          series: {
              borderWidth: 0,
              dataLabels: {
                  enabled: true,
                  format: '{point.y:.1f}%'
              }
          }
      },
  
      tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
  
      series: [
          {
              name: "Browsers",
              colorByPoint: true,
              data: [
                  {
                      name: "Chrome",
                      y: 62.74,
                      
                  },
                  {
                      name: "Firefox",
                      y: 10.57,
                 
                  },
                  {
                      name: "Internet Explorer",
                      y: 7.23,
                      
                  },
                  {
                      name: "Safari",
                      y: 5.58,
                      
                  },
                  {
                      name: "Edge",
                      y: 4.02,
                     
                  },
                  {
                      name: "Opera",
                      y: 1.92,
                     
                  },
                  {
                      name: "Other",
                      y: 7.62,
          

                  }
              ]
          }
      ],
    
  };

  HC_exporting(Highcharts);
  setTimeout(()=>{
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300)
}


}