import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { YoutubeService } from '../shared/youtube.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpotService {
  playlists = [];
  albums = [];
  tracks = [];
  artists = [];

  playlistSubject: Subject <any> = new Subject <any>();
  trackSubject: Subject <any> = new Subject <any>();
  artistSubject: Subject <any> = new Subject <any>();
  albumSubject: Subject <any> = new Subject <any>();

  loadingSubject: Subject <any> = new Subject <any>();

  type: string;
  spottube = [];
  playlistLength = 0;
  fromAlbum = false;
  album;
  video: any;
  constructor(private socket: Socket, private ytService: YoutubeService) {
    this.socket.on('spotify-search', results => this.setResults(results));
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

  searchByName = (q, t) => {
    this.loadingSubject.next(true);
    this.socket.emit('spotify-search', {query: q, type: t});
  }

  searchByRef = (query, type) => {
    this.loadingSubject.next(true);
    this.socket.emit('spotify-request', {query: query.href, type: type});
    this.socket.on('spotify-request', results => this.setResults(results));
  }

  getTracks = () => {
    return this.tracks;
  }

  setVideo = (video) => {
    this.video = video;
  }

  getVideo = () => {
    return this.video;
  }

  getPlaylist = () => {
    return this.playlists;
  }

  getAlbums = () => {
    return this.albums;
  }

  getArtists = () => {
    return this.artists;
  }

  setResults = (results) => {
    if (results.type === 'playlist') {
      this.playlists = results.list;
      this.playlistSubject.next(results.list);
    }

    if (results.type === 'artist') {
      this.artists = results.list;
      this.artistSubject.next(results.list);
    }

    if (results.type === 'album') {
      this.albums = results.list;
      this.albumSubject.next(results.list);
    }

    if (results.type === 'track') {
        this.tracks = results.list;
        this.trackSubject.next(results.list);
    }
    window.scroll(0, 0);
    this.loadingSubject.next(false);
  }
}
