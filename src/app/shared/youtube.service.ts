import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Socket } from 'ng-socket-io';
import * as player from 'yt-player';

@Injectable()
export class YoutubeService  {
  opts = { maxResults: 50, key: 'AIzaSyCnqAFM5z0dsC_gPE-DQeFrQe2PScejMMw' };
  results: Array<any> = [];
  requests: Array<any> = [];
  searchSubject: Subject<any> = new Subject<any>();
  requestSubject: Subject<any> = new Subject<any>();
  downloadSubject: Subject<any> = new Subject<any>();
  finishedVidSubject: Subject<any> = new Subject<any>();
  queueSubject: Subject<any> = new Subject<any>();
  vdPlayer;
  queue = {finished: 0, total: 0};
  constructor(private socket: Socket) {
    this.socket.on('download-progress', (data) => {
      this.downloadSubject.next({id: data.id, progress: Math.floor(data.progress.progress.percentage)});
     });
    this.socket.on('download-finished', data => {
      let ssid = sessionStorage.getItem('ssid');
      this.downloadFile(`http://localhost:3000/api/download/${ssid}/${data.data.videoTitle.replace(",","")}.mp3`);
      //this.downloadFile(`https://ytser.herokuapp.com/api/download/${ssid}/${data.data.videoTitle.replace(",","")}.mp3`);
      this.queue.finished = this.queue.finished + 1;
      this.queueSubject.next(this.queue);
    });
    this.socket.on('search', data => this.searchSubject.next(data.results));

  }

   downloadFile = (filePath) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.click();
  }

  resetQueue = () => {
    this.queue = {finished: 0, total: 0};
  }

  _play = (id, song) => {
    if (this.vdPlayer) {
      this.finishedVidSubject.next(this.vdPlayer.videoId);
      this.vdPlayer.destroy();
    }
    this.vdPlayer = new player('#vid_' + id, {
      width: '100%',
      height: '100%',
      captions: false,
      controls: true,
      fullscreen: true,
      annotations: false,
      modestBranding: true,
      related: false,
      info: false
    });

    this.vdPlayer.load(song);
    this.vdPlayer.play();
    this.vdPlayer.on('ended', () => {
      this.finishedVidSubject.next(this.vdPlayer.videoId);
      this.vdPlayer.destroy();
    });
  }

  __getResults = () => {
    return this.results;
  }

  _getlink = (song) => {
    if(this.queue.total > 0 && this.queue.total === this.queue.finished) {
      this.resetQueue();
    }
    this.socket.emit('download', {song: song, ssid: sessionStorage.getItem('ssid')});
    this.queue.total = this.queue.total + 1;
    this.queueSubject.next(this.queue);
  }

  _search = (query: any) => {
    this.socket.emit('search', query);
  }
}
