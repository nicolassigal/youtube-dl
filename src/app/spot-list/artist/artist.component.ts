import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spot.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'yd-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  constructor(private spotifyService: SpotService, private router: Router, private route: ActivatedRoute) { }
  list = [];
  ngOnInit() {
    window.scroll(0, 0);
    this.list = this.spotifyService.getArtists();
    this.spotifyService.artistSubject.subscribe(artists => {
        this.list = artists;
    });
  }

  searchByRef = (query, type) => {
    this.spotifyService.searchByName(query.name, type);
    this.router.navigate([type], {relativeTo: this.route.parent});
  }
}
