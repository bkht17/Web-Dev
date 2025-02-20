import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumsList } from './albums-list';

@Injectable({
  providedIn: 'root',
})
export class AlbumListService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums';

  getAlbums(): Observable<AlbumsList[]> {
    return this.http.get<AlbumsList[]>(this.apiUrl);
  }

  deleteAlbum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  constructor() {}
}
