import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule,MatStepperModule, MatTableModule, MatInputModule, MatFormFieldModule,  } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { AreaComponent } from './widgets/area/area.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { BarChartComponent } from './widgets/bar-chart/bar-chart.component';
import { DoubleBarComponent } from './widgets/double-bar/double-bar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AreaComponent,
    WidgetsComponent,
    BarChartComponent,
    DoubleBarComponent,

    
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatStepperModule,
    MatTabsModule,
    FormsModule,
   

  
    
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AreaComponent,
    BarChartComponent,
    DoubleBarComponent 
   
  ]
})
export class SharedModule { }
