import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'yd-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  query: string;
  type: string;
  loading: false;
  constructor(private socket: Socket) { }

  ngOnInit() {
  }

  search = () => {
    console.log();
    this.socket.emit('spotify-search', {query: this.query, type: this.type});
  }

}
