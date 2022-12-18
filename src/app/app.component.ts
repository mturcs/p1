import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'pi1';
  public  ChartType: any = 'Gauge';
  title = 'googlechart';
  type = this.ChartType
  data = [
    ['Name1', 5.0],
    ['Name2', 36.8],
    ['Name3', 42.8],
    ['Name4', 18.5],
    ['Name5', 16.2]
  ];
  columnNames = ['Name', 'Percentage'];
  options = {
  };
  width = 500;
  height = 300;
}
