import { SpotService } from './../spot.service';
import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../../shared/youtube.service';

@Component({
  selector: 'yd-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  list = [];
  downloadlist = [];
  video;
  downloading = false;
  markEnable = false;
  constructor(private socket: Socket,
    private spotifyService: SpotService,
    private router: Router,
    private route: ActivatedRoute,
    private ytService: YoutubeService) { }

  ngOnInit() {
    this.ytService.queueSubject.subscribe( queue => {
      if (queue.finished === queue.total) {
        this.downloading = false;
      } else {
        this.downloading = true;
      }
    });
    this.list = this.spotifyService.getTracks();
    this.list.forEach(item => {
      item.checked = false;
    });
    this.downloadlist = this.list;
    this.spotifyService.trackSubject.subscribe(result => {
      this.video = null;
      if (!result.tracks) {
        result.forEach(element => {
          element.images = element.album.images;
        });
        this.list = result;
        this.list.forEach(item => {
          item.checked = false;
        });
        this.downloadlist = this.list;
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
        this.list.forEach(item => {
          item.checked = false;
        });
        this.downloadlist = this.list;
      }
    });
  }

  downloadAll = () => {
    if (this.downloadlist.length) {
      this.markEnable = false;
      this.list.forEach(item => {
        item.checked = false;
      });
      this.downloading = true;
      this.downloadlist.forEach((element, index) => {
        if (!element.artists && element.track.artists.length){
          element.artists = element.track.artists;
        }
      });
      this.socket.emit('spotify-download-all', this.downloadlist);
      this.socket.on('spotify-download-all', list => {
        list.forEach(track => {
          this.ytService._getlink(track);
        });
      });
    }
  }

  toggleMark = () => {
    this.markEnable = !this.markEnable;
    if(this.markEnable) {
      this.downloadlist = [];
    } else {
      this.downloadlist = this.list;
    }
  }

  mark = (item) => {
    if (this.markEnable) {
      item.checked = !item.checked;
      if (item.checked) {
        this.downloadlist.push(item);
      } else {
        this.downloadlist.filter(song => {
          if (song.id === item.id) {
            this.downloadlist.splice(this.downloadlist.indexOf(item), 1);
          }
        });
      }
    }
  }

  getTrack = (track) => {
    if (!track.artists && track.track.artists.length){
      track.artists = track.track.artists;
    }
    this.socket.emit('spotify-track-search', track);
    this.socket.on('search-spotube', data => this.video = data);
  }
}
