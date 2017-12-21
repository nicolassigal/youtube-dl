import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yd-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
@Input('song') song;
  constructor() { }

  ngOnInit() {
  }

}
