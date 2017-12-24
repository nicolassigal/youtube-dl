import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from '../../shared/youtube.service';

@Component({
  selector: 'yd-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
@Input('song') song;
@ViewChild('card') card;
downloading = false;
data;
replace = false;
status = 0;
enableStop = false;
  constructor(private ytService: YoutubeService, private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.song.link = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.song.id}?autoplay=1`);
    this.ytService.finishRequest.subscribe(id => {
      if (this.song.id === id) {
        this.downloading = false;
        this.status = 2;
      }
    });
  }

  download = (song) => {
    this.status = 1;
    this.downloading = true;
    this.ytService._getlink(song);
  }
}
