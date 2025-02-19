import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { AlbumsList } from './albums-list';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-albums',
  imports: [RouterModule, AlbumCardComponent],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent {
  albums: AlbumsList[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.fetchAlbums();
  }

  fetchAlbums(): void {
    this.http
      .get<AlbumsList[]>('https://jsonplaceholder.typicode.com/albums')
      .subscribe((data) => (this.albums = data));
  }

  deleteAlbum(id: number): void {
    this.albums = this.albums.filter((album) => album.id !== id);
  }

  openAlbumDetail(id: number): void {
    this.router.navigate(['/albums', id]);
  }
}
