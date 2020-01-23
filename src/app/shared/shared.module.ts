import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, MatListModule, MatStepperModule, MatTableModule, MatInputModule, MatFormFieldModule,  } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { AreaComponent } from './widgets/area/area.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { BarChartComponent } from './widgets/bar-chart/bar-chart.component';
import { DoubleBarComponent } from './widgets/double-bar/double-bar.component';

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
    MatListModule,
    MatTabsModule,
   
    
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
