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
  queue;
  percentaje = 0;
  percentajeStr = "0%";
  spottube = [];
  playlistLength;
  constructor (private socket: Socket, private ytService: YoutubeService) {}
  ngOnInit() {
    this.socket.on('session', ssid => sessionStorage.setItem('ssid', ssid));
    this.ytService.queueSubject.subscribe( queue => {
      this.queue = queue;

      if (this.percentaje >= 100) {
        this.percentaje = 0;
        this.percentajeStr = this.percentaje + '%';
      }
      if (parseInt(this.queue.finished) > 0) {
        this.percentaje = (parseInt(this.queue.finished) / parseInt(this.queue.total)) *  100;
        this.percentajeStr = this.percentaje + '%';
      }
    });
  }
}
