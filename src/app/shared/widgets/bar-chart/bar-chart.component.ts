import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ApiService } from 'src/app/backend/api.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from 'src/app/models/course';
import { RegisteredUser } from 'src/app/models/registered-user';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
    Highcharts: typeof Highcharts = Highcharts;

    chartOptions = {
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
        // plotOptions: {
        //     series: {
        //         borderWidth: 0,
        //         dataLabels: {
        //             enabled: true,
        //             format: '{point.y:.1f}%'
        //         }
        //     }
        // },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "courses",
                colorByPoint: true,
                data: []
            }
        ],

    };
    series: any;
    coursename: Course;
    array1: any[];
    details: { name: string, count: number }

    private registeredStudents: RegisteredUser[];
    private waitForData: boolean = false;

    constructor(private _apiService: ApiService, private afs: AngularFirestore) {




    }

    ngOnInit() {
        this.getData()
        // console.log(this.registeredStudents);


        // this.graphData();
    }

    getData() {

        console.log("one")
        this._apiService.getCourses().subscribe(courseList => {
            this.registeredStudents = [];
            console.log(courseList)
            for (let course of courseList) {
                let item = new RegisteredUser();
                item.setCourseName(course.name);
                // item.setId(course.id);
                this.registeredStudents.push(item);

                this._apiService.getStudent(course.id).subscribe(studentApplications => {
                    for (let application of studentApplications) {
                        if (application.status) {
                            item.addStudentsCount();
                        }
                    }
                });
            }
            setTimeout(() => {
                this.chartOptions.series[0].data = this.registeredStudents;
                this.waitForData = true
            }, 1000);
        });
    }

}