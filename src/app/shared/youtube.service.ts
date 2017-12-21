import { Injectable } from '@angular/core';
import * as youtubeSearch from 'youtube-search';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class YoutubeService {
  opts = { maxResults: 50, key: 'AIzaSyCnqAFM5z0dsC_gPE-DQeFrQe2PScejMMw' };
  results: Array<any> = [];
  searchSubject: Subject<any> = new Subject<any>();
  constructor() { }

  __getResults = () => {
    return this.results;
  }

  _search = (query: string) => {
    youtubeSearch(query, this.opts, (err, results) => {
      if (err) {
        return console.log(err);
      }
      this.results = results;
      this.searchSubject.next(this.results);
    });
  }
}
