import { VideoListComponent } from './home/video-list/video-list.component';
import { YtubeComponent } from './home/ytube/ytube.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpottubeComponent } from './home/spottube/spottube.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'spottube', component: SpottubeComponent },
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
  VideoListComponent
];
