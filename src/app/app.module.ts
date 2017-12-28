import { SpotService } from './spot-list/spot.service';
import { RoutingModule, routingComponents } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongComponent } from './song-list/song/song.component';
import { YoutubeService } from './shared/youtube.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { SpotListComponent } from './spot-list/spot-list.component';
import { HomeComponent } from './home/home.component';
import { SpottubeComponent } from './home/spottube/spottube.component';
import { YtubeComponent } from './home/ytube/ytube.component';
import { SearchBoxComponent } from './home/ytube/search-box/search-box.component';
import { FormComponent } from './home/spottube/form/form.component';
import { TrackComponent } from './spot-list/track/track.component';
import { AlbumComponent } from './spot-list/album/album.component';
import { ArtistComponent } from './spot-list/artist/artist.component';
import { PlaylistComponent } from './spot-list/playlist/playlist.component';

const config: SocketIoConfig = { url: 'https://ytser.herokuapp.com/', options: {} };
//const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    SongListComponent,
    SongComponent,
    SpinnerComponent,
    SpotListComponent,
    routingComponents,
    FormComponent,
    TrackComponent,
    AlbumComponent,
    ArtistComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    RoutingModule
  ],
  providers: [YoutubeService, SpotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
