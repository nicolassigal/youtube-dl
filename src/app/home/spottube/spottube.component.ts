import { SpotService } from './../../spot-list/spot.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yd-spottube',
  templateUrl: './spottube.component.html',
  styleUrls: ['./spottube.component.scss']
})
export class SpottubeComponent implements OnInit {
  loading = false;
  constructor(private spotifyService: SpotService) { }

  ngOnInit() {
  }

}
