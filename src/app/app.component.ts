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
  queue;
  constructor (private socket: Socket, private ytService: YoutubeService) {}
  ngOnInit() {
      if ((<any>window).Notification && (<any>Notification).permission !== 'denied') {
        Notification.requestPermission(status => {  // status is "granted", if accepted by user
        if (status === 'granted') {
          let notification = new Notification('YT Download', {body: 'starting app'});
        }
        });
      }
    this.ytService.queueSubject.subscribe(data => {
      this.queue = data;
    });
    document.addEventListener('visibilitychange', this.handlePush);
    this.socket.on('session', ssid => sessionStorage.setItem('ssid', ssid));
  }

  handlePush = (evt) => {
    if (this.queue && this.queue.finished < this.queue.total) {
      if ((<any>window).Notification && (<any>Notification).permission !== 'denied') {
        Notification.requestPermission(status => {  // status is "granted", if accepted by user
          let n = new Notification('Downloading', {
            body: `Downloading (${this.queue.finished}/${this.queue.total})`
          });
        });
      }
    }
  }
}
