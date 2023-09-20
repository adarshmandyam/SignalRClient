import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { config } from 'src/app/config';

@Component({
  selector: 'app-latitude',
  templateUrl: './latitude.component.html',
  styleUrls: ['./latitude.component.css']
})
export class LatitudeComponent implements OnInit {
  @Input() latitude: any;
  @Input() deviceId: any;
  config = config;
  gaugeValue: any;
  latitudeGaugeType = config.latitudeGaugeType;
  gaugeType = "'arch'";
  
  constructor() { }

  ngOnInit() {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if (changes['latitude'] && changes['latitude'].currentValue === null) {
      this.latitude = changes['latitude'].previousValue;
    }
  }
}
