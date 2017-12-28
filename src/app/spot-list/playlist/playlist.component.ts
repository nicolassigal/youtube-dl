import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spot.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'yd-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  list = [];
  constructor(private spotifyService: SpotService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.list = this.spotifyService.getPlaylist();
    this.spotifyService.playlistSubject.subscribe(playlist => {
        this.list = playlist;
    });
  }

  searchByRef = (query, type) => {
    this.spotifyService.fromAlbum = false;
    this.spotifyService.searchByRef(query, type);
    this.router.navigate([type], {relativeTo: this.route.parent});
  }
}
