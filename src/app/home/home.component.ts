import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { YoutubeService } from '../shared/youtube.service';

@Component({
  selector: 'yd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  queue;
  percentaje = 0;
  percentajeStr = "0%";
  playlistLength;

  constructor(private socket: Socket, private ytService: YoutubeService) { }

  ngOnInit() {
    this.ytService.queueSubject.subscribe( queue => {
      this.queue = queue;
      if (this.queue.total === this.queue.finished) {
        setTimeout(() => {
          if (this.queue.total === this.queue.finished) {
            this.queue = null;
          }
        }, 3600);
      }
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
