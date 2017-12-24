import { Component, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from '../shared/youtube.service';
@Component({
  selector: 'yd-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  query: string;
  loading = false;
  @ViewChild('searchElement') searchElement;
  constructor(private ytService: YoutubeService) { }

  ngOnInit() {
  }


  search = () => {
    this.loading = true;
    this.searchElement.nativeElement.blur();
    this.ytService._search(this.query).subscribe(() => {
      this.loading = false;
    });
  }

}
