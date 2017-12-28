import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ThemesService {
  default = 'dark';
  selected;
  themeSubject: Subject<any> = new Subject<any>();
  themes = [
    {
      'name': 'pink',
      'primaryColor': '#ef4581',
      'bgColor': '#783393',
      'fontColor': 'white'
    },
    {
      'name': 'dark',
      'primaryColor': 'white',
      'bgColor': '#3e3e3e',
      'fontColor': '#2e2e2e'
    }
  ];

  constructor() {
    this._setTheme(this.default);
  }

  _setTheme = (theme: string) => {
    this.selected = this.themes.filter(th => th.name === theme)[0];
    this.themeSubject.next(this.selected);
  }

  _getTheme = () => {
    return this.selected;
  }
}
