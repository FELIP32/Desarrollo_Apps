import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Personajes } from './api';

describe('Personajes', () => {
  let component: Personajes;
  let fixture: ComponentFixture<Personajes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personajes],
    }).compileComponents();

    fixture = TestBed.createComponent(Personajes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
