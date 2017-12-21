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
enableStop = false;
  constructor(private ytService: YoutubeService) { }

  ngOnInit() {
  }

  play = (id) => {
    this.ytService._play(id).subscribe((res: any) => {
      this.enableStop = true;
    });
  }
  stop = () => {
    this.ytService._stop().subscribe((res: any) => {
      this.enableStop = false;
    });
  }

  download = (id) => {
    this.downloading = true;
    this.ytService._download(id).subscribe((res: any) => {
      console.log(res);
      if(res.ok) {
        this.data = res.data;
        this.downloading = false;
      }
    });
  }
}
