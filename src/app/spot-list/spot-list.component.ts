import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { YoutubeService } from '../shared/youtube.service';
@Component({
  selector: 'yd-spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.scss']
})
export class SpotListComponent implements OnInit {
  spottube = [];
  playlists = [];
  playlistLength = 0;
  type: string;
  constructor(private socket: Socket, private ytService: YoutubeService) { }

  ngOnInit() {
    this.socket.on('spotify-search', results => {
      this.playlists = [];
      this.playlists = results.list;
      this.type = results.type;
    });
    this.socket.on('spotify-get-playlist', data => this.playlists = data.items);
    this.socket.on('spotify-search-result', data => console.log(data));
    this.socket.on('spotify-search-list-length', data => {
      this.spottube = [];
      this.playlistLength = data;
    });
    this.socket.on('search-spotube', data => {
      this.spottube.push(data);
      if (this.spottube.length === this.playlistLength) {
        this.ytService.searchSubject.next(this.spottube);
      }
    });
  }

  getList = (playlist) => {
    this.socket.emit('spotify-playlist-search', playlist.href);
  }
}
