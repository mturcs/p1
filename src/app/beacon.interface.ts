export interface beacondatatype {
  deviceID: string,
  thermData: number,
  humData: number,
  timeStamp: number
}

export class BeaconData implements beacondatatype { constructor(
  public deviceID = "",
  public thermData = 0,
  public humData = 0,
  public timeStamp = 0 ) {}
}

