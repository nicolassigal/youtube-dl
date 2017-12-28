import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { YoutubeService } from '../shared/youtube.service';
import { SpotService } from './spot.service';
@Component({
  selector: 'yd-spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.scss']
})
export class SpotListComponent implements OnInit {
  loading: boolean;
  constructor(private spotifyService: SpotService) { }

  ngOnInit() {
    this.loading = false;
    this.spotifyService.loadingSubject.subscribe((status) => this.loading = status);
  }
}
