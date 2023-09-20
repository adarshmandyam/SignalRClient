import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { config } from 'src/app/config';

@Component({
  selector: 'app-longitude',
  templateUrl: './longitude.component.html',
  styleUrls: ['./longitude.component.css']
})
export class LongitudeComponent implements OnInit {
  @Input() longitude: any;
  @Input() deviceId: any;
  config = config;
  gaugeValue: any;
  longitudeGaugeType = config.longitudeGaugeType;
  gaugeType = "'arch'";
  constructor() { }

  ngOnInit() {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if (changes['longitude'] && changes['longitude'].currentValue === null) {
      this.longitude = changes['longitude'].previousValue;
    }
  }
}
