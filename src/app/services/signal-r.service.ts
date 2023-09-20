import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SignalRConnection } from '../models/signal-r-connection.model';
import { environment } from '../../environments/environment';
import * as SignalR from '@microsoft/signalr'

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  truckDeviceData: Subject<string> = new Subject();
  private hubConnection!: SignalR.HubConnection;

  constructor(private http: HttpClient) {
  }

  private getSignalRConnection(): Observable<SignalRConnection> {

    return this.http.get<SignalRConnection>(`${environment.baseUrl}SignalRConnection`);
  }

  init() {
    this.getSignalRConnection().subscribe((con: { accessToken: any; url: string; }) => {
      const options = {
        accessTokenFactory: () => con.accessToken
      };

      const headers = new Headers();
      headers.append('Access-Control-Allow-Headers', 'Content-type');
      headers.append('Access-Control-Allow-Methods', 'GET');
      headers.append('Access-Control-Allow-Origin', '*');

      this.hubConnection = new SignalR.HubConnectionBuilder()
        .withUrl(con.url, options)
        .configureLogging(SignalR.LogLevel.Information)
        .build();

      this.hubConnection.on('iotMessage', data => {
        this.truckDeviceData.next(data);
      });

      this.hubConnection.start()
        .catch(error => console.error(error));

      this.hubConnection.serverTimeoutInMilliseconds = 300000;
      this.hubConnection.keepAliveIntervalInMilliseconds = 300000;

      this.hubConnection.onclose((error) => {
        this.hubConnection.start();
        console.error(`Something went wrong: ${error}`);
      });
    });
  }
}
