import { Component, Input, OnInit } from '@angular/core';
import { YoutubeService } from '../../shared/youtube.service';

@Component({
  selector: 'yd-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
@Input('song') song;
  constructor(private ytService: YoutubeService) { }

  ngOnInit() {
  }

  download = (id) => {
    this.ytService._download(id);
  }
}
