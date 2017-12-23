import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';
@Injectable()
export class YoutubeService  {
  opts = { maxResults: 50, key: 'AIzaSyCnqAFM5z0dsC_gPE-DQeFrQe2PScejMMw' };
  results: Array<any> = [];
  requests: Array<Observable<any>> = [];

  searchSubject: Subject<any> = new Subject<any>();
  requestSubject: Subject<any> = new Subject<any>();
  finishRequest: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) {
    this.requestSubject.subscribe(() => {
      forkJoin(this.requests).subscribe((file: any) => {
        this.requests.shift();
        this.downloadFile( `https://ytser.herokuapp.com/api/download/${file[0].data.videoTitle}.mp3`);
        this.finishRequest.next(file[0].data.videoId);
      });
    });
   }

   downloadFile = (filePath) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.click();
  }

  __getResults = () => {
    return this.results;
  }

  _download = (name: string) => {
    this.http.get(`https://ytser.herokuapp.com/api/download/${name}`).subscribe((res: any) => {
      console.log(res);
    });
  }

  _getlink = (id: string) => {
    this.requests.push( this.http.get(`https://ytser.herokuapp.com/api/getlink/${id}`));
    this.requestSubject.next();
  }

  _search = (query: string) => {
    return this.http.get(`https://ytser.herokuapp.com/api/search/${query}`).map((response: any) => {
      this.searchSubject.next(response);
    });
  }

  doUsersRequest(queryArr, previousObservable = null) {
    if (queryArr.length) {
        const url = 'https://ytser.herokuapp.com/api/getlink/' + queryArr.shift().id;
        let observable = null;
        if (previousObservable) {
            observable = previousObservable.flatMap(() => {
                return this.http.get(url);
            });
        } else {
            observable = this.http.get(url);
        }
        return this.doUsersRequest(queryArr, observable);
    } else {
        return previousObservable;
    }
}
}
