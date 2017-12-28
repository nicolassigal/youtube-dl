import { SpotService } from './../spot.service';
import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'yd-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  list = [];
  video;
  constructor(private socket: Socket, private spotifyService: SpotService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.list = this.spotifyService.getTracks();
    this.spotifyService.trackSubject.subscribe(result => {
      this.video = null;
      if (!result.tracks) {
        result.forEach(element => {
          element.images = element.album.images;
        });
        this.list = result;
      }
      if (result.tracks) {
        result = result.tracks.items.map(element => {
          if(element.track){
            element.images = element.track.album.images;
            element.name = element.track.name;
            element.href = element.track.href;
          } else {
            element.images = result.images;
            element.name = element.name;
          }

          return element;
        });
        this.list = result;
      }
    });
  }

  getList = (playlist) => {
    console.log(playlist);
    if (!playlist.artists && playlist.track.artists.length){
      playlist.artists = playlist.track.artists;
    }
    this.socket.emit('spotify-track-search', playlist);
    this.socket.on('search-spotube', data => this.video = data);
  }
}
