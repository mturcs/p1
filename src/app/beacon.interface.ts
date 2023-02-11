export interface beacondatatype {
  deviceID: string,
  thermData: number,
  humData: number,
  timeStamp: number
}

export interface  recordstatustype {
  recordingActive: boolean,
  frequency: number,
  timeStamp: number
}


export class BeaconData implements beacondatatype { constructor(
  public deviceID = "",
  public thermData = 0,
  public humData = 0,
  public timeStamp = 0 ) {}
}

export class RecordStatusData implements recordstatustype { constructor(
    public deviceID = "",
    public recordingActive = false,
    public frequency = 0,
    public timeStamp=0
  ) {}
}
