import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

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
    this.http.get('http://localhost:4200/api/download/' + id).subscribe(response => {
      console.log(response);
    });
  }

  _search = (query: string) => {
    return this.http.get('http://localhost:4200/api/search/' + query).subscribe((response: any) => {
      this.searchSubject.next(response);
    });
  }
}
