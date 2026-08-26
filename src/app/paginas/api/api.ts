import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

interface Personaje {
  id: number;
  name: string;
  image: string;
}

interface RespuestaPersonajes {
  results: Personaje[];
}

@Component({
  selector: 'app-api',
  imports: [],
  templateUrl: './api.html',
  styleUrl: './api.css',
})
export class Personajes implements OnInit {
  private readonly http = inject(HttpClient);
  protected personajes: Personaje[] = [];

  ngOnInit(): void {
    this.http
      .get<RespuestaPersonajes>('https://rickandmortyapi.com/api/character')
      .subscribe((respuesta) => {
        this.personajes = respuesta.results;
      });
  }

  protected borrarPersonaje(id: number): void {
    this.personajes = this.personajes.filter((personaje) => personaje.id !== id);
  }
}
