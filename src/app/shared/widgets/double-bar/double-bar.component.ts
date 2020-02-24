import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ApiService } from 'src/app/backend/api.service';
import { RegisteredUser } from 'src/app/models/registered-user';

@Component({
  selector: 'app-double-bar',
  templateUrl: './double-bar.component.html',
  styleUrls: ['./double-bar.component.scss']
})
export class DoubleBarComponent implements OnInit {

  chartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: 'Accepted Students vs rejected or unaceppted'
    },

   

    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },

    xAxis: {
      categories: [],
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
      name: 'accepted students',
      data: []
    }, {
      name: 'waiting or rejected students',
      data: []
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

  series: any;

  Highcharts = Highcharts;

  private acceptedStudents: number[] = [];
  private waitingOrRejectedStudents: number[] = [];
  private courseNames: string[] = [];

  private registeredStudents: RegisteredUser[];


  private showGraph: boolean = false;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {

    this._apiService.getCourses().subscribe(courseList => {
      this.registeredStudents = [];
      console.log(courseList)
      for (let course of courseList) {
        let item = new RegisteredUser();
        item.setCourseName(course.name);

        this.registeredStudents.push(item);

        this._apiService.getStudentApplications(course.id).subscribe(applications => {
          for (let application of applications) {
            if (application.status) {
              item.addStudentsCount();
            } else {
              item.incrementWaitingList();
            }
          }
        })

        setTimeout(() => {
          console.log(this.registeredStudents);
          for (let item of this.registeredStudents) {
            this.acceptedStudents.push(item.getRegisteredStudentsCount());
            this.waitingOrRejectedStudents.push(item.getWaitingStudents());
            this.courseNames.push(item.getCourse());
          }

          this.chartOptions.xAxis.categories = this.courseNames;
          this.chartOptions.series[0].data = this.acceptedStudents;
          this.chartOptions.series[1].data = this.waitingOrRejectedStudents;
          this.showGraph = true;
          // this.chartOptions.series[0].data = this.registeredStudents;
          // this.waitForData = true
        }, 1000);

      }

    });





  }
}


