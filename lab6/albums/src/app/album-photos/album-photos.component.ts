import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PhotosList } from './photos-list';

@Component({
  selector: 'app-album-photos',
  imports: [RouterModule],
  templateUrl: './album-photos.component.html',
  styleUrl: './album-photos.component.scss',
})
export class AlbumPhotosComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  albumId = this.route.snapshot.paramMap.get('id');
  photos = signal<PhotosList[]>([]);

  constructor() {
    this.fetchPhotos();
  }

  fetchPhotos() {
    this.http
      .get<PhotosList[]>(
        `https://jsonplaceholder.typicode.com/albums/${this.albumId}/photos`
      )
      .subscribe((data) => this.photos.set(data));
  }

  goBack() {
    this.router.navigate(['/albums', this.albumId]);
  }
}
