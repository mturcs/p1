import {Component, OnInit} from '@angular/core';
import {PicommService} from "../picomm.service";
import {LoaderService} from "../loader.service";
import {BeaconData, beacondatatype} from "../beacon.interface";


@Component({
  selector: 'app-devicestat',
  templateUrl: './devicestat.component.html',
  styleUrls: ['./devicestat.component.css']
})
export class DevicestatComponent implements OnInit {
  public SampleData = new BeaconData()
  public thermArray = [this.SampleData.thermData]
  public thermSampler = this.mpicom.thermo
  private unsubscribe_thermo: any;
  public ChartType: any = 'Gauge';
  public connected: boolean = false;
  public mStatus: object = {status:""}
  public type = this.ChartType
  public data = [
    ['Temperature', 0],
    ['Humidity', 0]
  ];
  columnNames = ['Name', 'Percentage'];
  options = {
    width: 450, height: 250,
    redFrom: 90, redTo: 100,
    yellowFrom:75, yellowTo: 90,
    greenFrom:18, greenTo:28,
    minorTicks: 10
  };
  width = 500;
  height = 300;
  title = 'googlechart';


  constructor(public mpicom: PicommService, public spinner: LoaderService) {
  }

  ngOnInit() {

    this.unsubscribe_thermo = this.mpicom.thermo
/*
    for (let n in [1, 2, 3, 4, 5]) {
      this.unsubscribe_thermo = this.mpicom.thermo
      this.mpicom.thermo.subscribe(data => {
        this.SampleData = data
        this.thermArray.push(this.SampleData.thermData)
        this.data = [
          ['Temperature ˚C', parseInt(String(this.SampleData.thermData))],
          ['Humidity %', parseInt(String(this.SampleData.humData))]
        ];
        console.log("thermo", this.SampleData)
      })

    }

*/
    console.log("array", this.thermArray)
    console.log("int?", this.SampleData.thermData)
    console.log("connectionstatus 1",this.mpicom.isConnected)
  }

  ngOnDestroy() {
    this.unsubscribe_thermo.unsubscribe
  }

  connectPressed() {
    this.mpicom.alivetest.subscribe(data => {
      this.mStatus = data.valueOf()
      console.log("Connect Pressed", data.valueOf())

      if (Object.values(this.mStatus)[0] == 'OK') {
        this.mpicom.setstatus = true
      }
      console.log("connectionstatus", this.mpicom.isConnected)
    })

    this.mpicom.thermo.subscribe(data => {
      this.SampleData = data

      this.data = [
        ['Temperature ˚C', parseInt(String(this.SampleData.thermData))],
        ['Humidity %', parseInt(String(this.SampleData.humData))]
      ];
      console.log("thermo", this.SampleData)
    })





  }

  disconnectPressed() {
    this.mpicom.setstatus=false
    this.data = [
      ['Temperature ˚C', 0],
      ['Humidity %', 0]
    ];


  }


}
