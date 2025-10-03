import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingRulesComponent } from './shipping-rules.component';

describe('ShippingRulesComponent', () => {
  let component: ShippingRulesComponent;
  let fixture: ComponentFixture<ShippingRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingRulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
