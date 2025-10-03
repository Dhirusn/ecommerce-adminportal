import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TableDirective,
  BadgeComponent,
  ButtonGroupComponent,
  FormSelectDirective,
  FormControlDirective,
  SpinnerComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Customer, CustomerFilter } from '../../../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    TableDirective,
    ButtonDirective,
    BadgeComponent,
    ButtonGroupComponent,
    FormSelectDirective,
    FormControlDirective,
    SpinnerComponent,
    IconDirective
  ],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  filter: CustomerFilter = {};

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getCustomers(this.currentPage, this.pageSize, this.filter)
      .subscribe({
        next: (result: any) => {
          this.customers = result.data.items;
          this.totalItems = result.data.totalItems;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading customers:', error);
          this.loading = false;
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCustomers();
  }

  clearFilters(): void {
    this.filter = {};
    this.currentPage = 1;
    this.loadCustomers();
  }

  viewCustomer(customerId: string): void {
    this.router.navigate(['/customers/details', customerId]);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  trackByCustomerId(index: number, customer: Customer): string {
    return customer.id;
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  Math = Math;
}
