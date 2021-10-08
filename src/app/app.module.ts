import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';

import { OmdbApiService } from './services/omdb-api.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
  ],
  providers: [OmdbApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
