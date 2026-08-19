import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Tarea = {
  id: number;
  texto: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly tasks = signal<Tarea[]>([]);
  protected nuevaTarea = '';

  get totalTareas(): number {
    return this.tasks().length;
  }

  agregarTarea(): void {
    const texto = this.nuevaTarea.trim();

    if (!texto) {
      return;
    }

    this.tasks.update((actuales) => [
      ...actuales,
      {
        id: Date.now() + Math.random(),
        texto,
      },
    ]);

    this.nuevaTarea = '';
  }

  borrarTarea(id: number): void {
    this.tasks.update((actuales) => actuales.filter((tarea) => tarea.id !== id));
  }
}
