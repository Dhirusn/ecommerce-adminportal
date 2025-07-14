import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkImportExportComponent } from './bulk-import-export.component';

describe('BulkImportExportComponent', () => {
  let component: BulkImportExportComponent;
  let fixture: ComponentFixture<BulkImportExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkImportExportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
