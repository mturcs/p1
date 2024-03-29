import {Component, OnInit} from '@angular/core';
import {PicommService, setSamplingStatus} from "../picomm.service";
import {LoaderService} from "../loader.service";
import {BeaconData, RecordStatusData} from "../beacon.interface";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";

@Component({
  selector: 'app-devicestat',
  templateUrl: './devicestat.component.html',
  styleUrls: ['./devicestat.component.css']
})
export class DevicestatComponent implements OnInit {
  public date = new Date()
  public SampleData = new BeaconData()
  public SetSampleData = new RecordStatusData()
  public thermArray = [this.SampleData.thermData]
  public thermSampler = this.mpicom.thermo
  private unsubscribe_thermo: any;
  private unsubscribe_recordStatus: any;
  public ChartType: any = 'Gauge';
  public connected: boolean = false;
  public mStatus: object = {status: ""}
  public type = this.ChartType
  public data = [
    ['Temperature', 0],
    ['Humidity', 0]
  ];
  columnNames = ['Name', 'Percentage'];
  options = {
    width: 450, height: 250,
    redFrom: 90, redTo: 100,
    yellowFrom: 75, yellowTo: 90,
    greenFrom: 18, greenTo: 28,
    minorTicks: 10
  };
  width = 500;
  height = 300;
  title = 'googlechart';


  constructor(public mpicom: PicommService, public spinner: LoaderService,
              private http: HttpClient, private setsampler: setSamplingStatus) {
  }

  ngOnInit() {

    this.unsubscribe_thermo = this.mpicom.thermo
    this.unsubscribe_recordStatus = this.mpicom.recordStatus


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
    console.log("connectionstatus 1", this.mpicom.isConnected)
  }

  ngOnDestroy() {
    this.unsubscribe_thermo.unsubscribe
    this.unsubscribe_recordStatus.unsubscribe
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
    /* this.startRecordPressed() */
  }

  startRecordPressed() {
    console.log("hello")
    this.SetSampleData.deviceID=this.SampleData.deviceID
    this.SetSampleData.recordingActive = true
    this.SetSampleData.frequency=100
    this.SetSampleData.timeStamp=Date.now()
    this.setsampler.addRecordStatus(this.SetSampleData).subscribe()
    this.mpicom.recordStatus.subscribe( SetSampleData => {
      console.log("set data",this.SetSampleData)
    })
  }

  stopRecordPressed() {
    console.log("hello")
    this.SetSampleData.deviceID=this.SampleData.deviceID
    this.SetSampleData.recordingActive = false
    this.SetSampleData.frequency=100
    this.SetSampleData.timeStamp=Date.now()
    this.setsampler.addRecordStatus(this.SetSampleData).subscribe()
    this.mpicom.recordStatus.subscribe( SetSampleData => {
      console.log("set data",this.SetSampleData)
    })
  }




  disconnectPressed() {
    this.mpicom.setstatus = false
    this.data = [
      ['Temperature ˚C', 0],
      ['Humidity %', 0]
    ];


  }


}
