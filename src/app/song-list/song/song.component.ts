import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { YoutubeService } from '../../shared/youtube.service';

@Component({
  selector: 'yd-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
@Input('song') song;
downloading = false;
data;
replace = false;
enableStop = false;
  constructor(private ytService: YoutubeService, private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.song.link = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.song.id}`);
  }

  downloadFile = (filePath) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.click();
  }

  download = (id) => {
    this.downloading = true;
    this.ytService._getlink(id).subscribe((res: any) => {
      if(res.ok) {
        this.data = res.data;
        this.song.downloadLink = `https://ytser.herokuapp.com/api/download/${this.data.videoTitle}.mp3`;
        this.downloadFile(this.song.downloadLink);
      }
    });
  }
}
