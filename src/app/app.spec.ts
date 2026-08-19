import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should add a task and update the count', () => {
    const fixture = TestBed.createComponent(App);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;

    input.value = 'Comprar pan';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('1 tarea');
  });
});
