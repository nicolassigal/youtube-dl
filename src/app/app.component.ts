import { YoutubeService } from './shared/youtube.service';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
@Component({
  selector: 'yd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Downloader';
  spottube = [];
  constructor (private socket: Socket, private ytService: YoutubeService) {}
  ngOnInit() {
    this.socket.on('session', ssid => sessionStorage.setItem('ssid', ssid));
  }
}
