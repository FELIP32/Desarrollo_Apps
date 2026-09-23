import { Component } from '@angular/core';

type Tarea = {
  id: number;
  texto: string;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tareas: Tarea[] = [];
  nuevaTarea = '';

  agregarTarea(): void {
    const texto = this.nuevaTarea.trim();

    if (!texto) {
      return;
    }

    this.tareas = [...this.tareas, { id: Date.now() + Math.random(), texto }];
    this.nuevaTarea = '';
  }

  borrarTarea(id: number): void {
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
  }

}
