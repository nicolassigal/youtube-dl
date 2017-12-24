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
  requests: Array<any> = [];
  searchSubject: Subject<any> = new Subject<any>();
  requestSubject: Subject<any> = new Subject<any>();
  finishRequest: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) {
    this.requestSubject.subscribe((id) => {
      this.requests.map(request => {
        const req = this.requests.filter((obs: any, index) => {
          if (obs.id === id) {
            this.requests.splice(index, 1);
          }
        });
        request.url.subscribe((file: any) => {
          this.downloadFile( `https://ytser.herokuapp.com/api/download/${file.data.videoTitle}.mp3`);
          console.log(this.requests);
          this.finishRequest.next(file.data.videoId);
        });
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

  _getlink = (id) => {
    return this.http.get(`https://ytser.herokuapp.com/api/getlink/${id}`);
  }

  _search = (query: string) => {
    return this.http.get(`https://ytser.herokuapp.com/api/search/${query}`).map((response: any) => {
      this.searchSubject.next(response);
    });
  }
}
