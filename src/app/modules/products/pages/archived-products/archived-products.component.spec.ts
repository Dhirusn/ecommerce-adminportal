import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedProductsComponent } from './archived-products.component';

describe('ArchivedProductsComponent', () => {
  let component: ArchivedProductsComponent;
  let fixture: ComponentFixture<ArchivedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
