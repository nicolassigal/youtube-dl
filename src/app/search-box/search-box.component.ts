import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../shared/youtube.service';

@Component({
  selector: 'yd-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  query: string;
  dir;
  constructor(private ytService: YoutubeService) { }

  ngOnInit() {
  }


  search = () => {
    this.ytService._search(this.query);
  }

}
