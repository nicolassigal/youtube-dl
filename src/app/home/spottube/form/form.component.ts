import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotService } from '../../../spot-list/spot.service';

@Component({
  selector: 'yd-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  query: string;
  type = 'playlist';
  loading: false;
  constructor(private socket: Socket, private spotifyService: SpotService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  search = () => {
    if (this.query && this.type) {
      this.spotifyService.loadingSubject.next(true);
      this.socket.emit('spotify-search', {query: this.query, type: this.type});
      this.router.navigate([this.type], {relativeTo: this.route});
    }
  }
}
