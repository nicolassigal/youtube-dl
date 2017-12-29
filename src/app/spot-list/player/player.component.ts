import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spot.service';

@Component({
  selector: 'yd-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  video: any;
  constructor(private spotifyService: SpotService) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.video = this.spotifyService.getVideo();
  }

}
