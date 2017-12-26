import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../shared/youtube.service';

@Component({
  selector: 'yd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  size: 0;
  constructor(private ytService: YoutubeService) { }

  ngOnInit() {
    this.ytService.queueSubject.subscribe(size => {
      this.size = size;
    });
  }

}
