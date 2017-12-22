import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../shared/youtube.service';

@Component({
  selector: 'yd-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  results: Array<any> = [];
  constructor(private ytService: YoutubeService) { }

  ngOnInit() {
    this.results = this.ytService.__getResults();
    this.ytService.searchSubject.subscribe(results => {
      this.results = results;
      console.log(results);
    });
  }

}
