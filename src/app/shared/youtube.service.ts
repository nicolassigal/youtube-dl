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

  _download = (name: string) => {
    this.http.get(`https://ytser.herokuapp.com/api/download/${name}`).subscribe((res: any) => {
      console.log(res);
    });
  }

  _getlink = (id: string) => {
    return this.http.get(`https://ytser.herokuapp.com/api/getlink/${id}`).map(response => response);
  }

  _search = (query: string) => {
    return this.http.get(`https://ytser.herokuapp.com/api/search/${query}`).subscribe((response: any) => {
      this.searchSubject.next(response);
    });
  }
}
