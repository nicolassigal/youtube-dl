import { ArtistComponent } from './spot-list/artist/artist.component';
import { AlbumComponent } from './spot-list/album/album.component';
import { TrackComponent } from './spot-list/track/track.component';
import { VideoListComponent } from './home/video-list/video-list.component';
import { YtubeComponent } from './home/ytube/ytube.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpottubeComponent } from './home/spottube/spottube.component';
import { PlaylistComponent } from './spot-list/playlist/playlist.component';
import { PlayerComponent } from './spot-list/player/player.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'spottube', component: SpottubeComponent , children: [
      { path: 'playlist', component: PlaylistComponent },
      { path: 'track', component: TrackComponent },
      { path: 'album', component: AlbumComponent },
      { path: 'artist', component: ArtistComponent },
      { path: 'player', component: PlayerComponent }
    ] },
    { path: 'ytube', component: YtubeComponent, children: [
      { path: 'list', component: VideoListComponent }
    ]},
  ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }

export const routingComponents = [
  HomeComponent,
  SpottubeComponent,
  YtubeComponent,
  VideoListComponent,
  PlaylistComponent,
  TrackComponent,
  AlbumComponent,
  ArtistComponent,
  PlayerComponent
];
