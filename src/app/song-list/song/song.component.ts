import { DomSanitizer } from "@angular/platform-browser";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { YoutubeService } from "../../shared/youtube.service";
@Component({
  selector: "yd-song",
  templateUrl: "./song.component.html",
  styleUrls: ["./song.component.scss"]
})
export class SongComponent implements OnInit {
  @Input("song") song;
  @Input("vidId") vidId;
  @ViewChild("card") card;
  downloading = false;
  data;
  replace = false;
  status = 0;
  enableStop = false;
  progress = 0;
  streamFile;
  constructor(
    private ytService: YoutubeService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.song.link = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.song.id}?autoplay=1`
    );

    this.ytService.finishedVidSubject.subscribe(id => {
      if (this.song.id === id){
        this.replace = false;
      }
    })
  }

  replaceVid = () => {
    this.replace = true;
    this.ytService._play(this.vidId, this.song.id);
  }

  download = song => {
    this.status = 1;
    this.downloading = true;
    this.ytService._getlink(song);
    this.ytService.downloadSubject.subscribe(data => {
      if (data.id === this.song.id) {
        this.progress = data.progress;
        if (this.progress === 100) {
          this.downloading = false;
          this.status = 2;
        } else {
          this.status = 1;
        }
      }
    });
  }
}
