import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ApiService } from 'src/app/backend/api.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  chartOptions : {};
  series:any;
  coursename : Course ;
  array1: any[];
  details:{name:string,y:number}

  Highcharts = Highcharts;
    
  constructor(private apiservice : ApiService ,private afs: AngularFirestore,) {

    afs.collection("courses").snapshotChanges().subscribe((data:any) =>{ 
       
        this.coursename = data.map ( e => {
            return{
              key: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Course
          });
    } );
    
    
   }

  ngOnInit() {

    this.chartOptions= {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Registered students'
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
              name: "courses",
              colorByPoint: true,
              data:  [
               
                  {
                      name: "brick laying",
                      y: 62.74,
                      
                  },
                  {
                      name: "plumbing",
                      y: 10.57,
                 
                  },
                  {
                      name: " Electrical Enginering",
                      y: 7.23,
                      
                  },
                  {
                      name: "capentry",
                      y: 5.58,
                      
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