import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlbumsList } from '../albums/albums-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-detail',
  imports: [RouterModule, CommonModule],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss',
})
export class AlbumDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  album: WritableSignal<AlbumsList | null> = signal(null);
  editedTitle = signal('');

  constructor() {
    const albumId = this.route.snapshot.params['id'];
    this.fetchAlbum(albumId);
  }

  fetchAlbum(id: number) {
    this.http
      .get<AlbumsList>(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .subscribe((album) => {
        this.album.set(album);
        this.editedTitle.set(album.title);
      });
  }

  updateTitle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.editedTitle.set(input.value);
  }

  saveChanges() {
    if (!this.album()) return;

    const updatedAlbum: AlbumsList = {
      id: this.album()!.id,
      userId: this.album()!.userId,
      title: this.editedTitle(),
    };

    this.http
      .put<AlbumsList>(
        `https://jsonplaceholder.typicode.com/albums/${updatedAlbum.id}`,
        updatedAlbum
      )
      .subscribe({
        next: (response) => {
          this.album.set(response);
          console.log('Album updated:', response);
        },
        error: (err) => console.error('Error updating album:', err),
      });
  }

  onTitleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.editedTitle.set(input.value);
  }

  goBack() {
    this.router.navigate(['/albums']);
  }
}
