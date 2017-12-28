import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spot.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'yd-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  list = [];
  constructor(private spotifyService: SpotService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.list = this.spotifyService.getAlbums();
    this.spotifyService.albumSubject.subscribe(playlist => {
        this.list = playlist;
    });
  }

  searchByRef = (query, type) => {
    this.spotifyService.fromAlbum = true;
    this.spotifyService.searchByRef(query, type);
    this.router.navigate([type], {relativeTo: this.route.parent});
  }
}
