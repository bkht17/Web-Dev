import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotosList } from './photos-list';

@Injectable({
  providedIn: 'root',
})
export class AlbumPhotosService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums';

  getPhotos(albumId: number): Observable<PhotosList[]> {
    return this.http.get<PhotosList[]>(`${this.apiUrl}/${albumId}/photos`);
  }

  constructor() {}
}
