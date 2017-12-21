import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
@Injectable()
export class YoutubeService {
  opts = { maxResults: 50, key: 'AIzaSyCnqAFM5z0dsC_gPE-DQeFrQe2PScejMMw' };
  results: Array<any> = [];
  searchSubject: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) { }

  __getResults = () => {
    return this.results;
  }

  _download = (id: string) => {
    return this.http.get(`/api/download/${id}`).map(response => response);
  }

  _stop = () => {
    return this.http.get(`/api/stop/`).map(response => response);
  }

  _play = (id: string) => {
    return this.http.get(`/api/play/${id}`).map(response => response);
  }

  _search = (query: string) => {
    return this.http.get(`/api/search/${query}`).subscribe((response: any) => {
      this.searchSubject.next(response);
    });
  }
}
