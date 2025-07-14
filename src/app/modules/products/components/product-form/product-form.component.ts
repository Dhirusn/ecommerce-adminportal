import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OffcanvasBodyComponent,
  OffcanvasComponent,
  OffcanvasHeaderComponent,
  OffcanvasTitleDirective,
  OffcanvasToggleDirective
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OffcanvasBodyComponent,
    OffcanvasComponent,
    OffcanvasHeaderComponent
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input() visible = false;
  @Input() product: any = {
    title: '',
    description: '',
    sku: '',
    price: 0,
    images: []
  };

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<any>();

  selectedFiles: File[] = [];

  handleImageUpload(event: any) {
    const files = Array.from(event.target.files);
    this.selectedFiles.push(...(files as File[]));

    // Optionally generate image previews
    for (let file of files as File[]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.product.images.push(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.product.images.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  emitSubmit() {
    this.submit.emit(this.product);
    this.visible = false;
    this.visibleChange.emit(false);
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
