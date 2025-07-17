import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CardModule,
  ButtonModule,
  BadgeModule,
  ButtonDirective,
  ButtonGroupComponent,
  ButtonGroupModule,
  OffcanvasBodyComponent,
  OffcanvasComponent,
  OffcanvasHeaderComponent,
  OffcanvasTitleDirective,
  OffcanvasToggleDirective
} from '@coreui/angular';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../../services/product/product.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ButtonDirective,
    ButtonModule,
    BadgeModule,
    ButtonGroupModule,
    OffcanvasBodyComponent,
    OffcanvasComponent,
    OffcanvasHeaderComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  public constructor(private productService: ProductService, private route: ActivatedRoute) { }

  product!: Product;
  showEditor = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getById(id).subscribe({
        next: (response) => {
          console.log(response);
          this.product = response.data;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        }
      });
    } else {
      console.error('No product ID found in route');
    }

  }

  openEditor() {
    this.showEditor = true;
  }

  saveProduct() {
    console.log('Saving product', this.product);
    this.showEditor = false;
    // You can call productService.update here if needed
  }
}
