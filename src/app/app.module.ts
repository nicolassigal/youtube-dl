import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongComponent } from './song-list/song/song.component';
import { YoutubeService } from './shared/youtube.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { SpotListComponent } from './spot-list/spot-list.component';

//const config: SocketIoConfig = { url: 'https://ytser.herokuapp.com/', options: {} };
const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    SongListComponent,
    SongComponent,
    NavbarComponent,
    SpinnerComponent,
    SpotListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
