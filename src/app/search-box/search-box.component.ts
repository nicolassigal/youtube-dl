import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../shared/youtube.service';
declare var $;
@Component({
  selector: 'yd-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  query: string;
  loading = false;

  constructor(private ytService: YoutubeService) { }

  ngOnInit() {
  }


  search = () => {
    this.loading = true;
    $('.spinner-container').focus();
    this.ytService._search(this.query).subscribe(() => {
      this.loading = false;
    });
  }

}
