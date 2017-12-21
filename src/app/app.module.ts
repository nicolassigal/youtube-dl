import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongComponent } from './song-list/song/song.component';
import { YoutubeService } from './shared/youtube.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    SongListComponent,
    SongComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
