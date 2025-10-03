import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  SpinnerComponent,
  FormModule
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Order, OrderFilter, OrderStatus } from '../../../../models/order.model';
import { OrderService } from '../../services/order.service';
import { PaginatedResult } from '../../../../models/PaginatedResult.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
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
    IconDirective,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  filter: OrderFilter = {};
  orderStatuses = Object.values(OrderStatus);

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get filter from route data if available
    this.route.data.subscribe(data => {
      if (data['filter']) {
        this.filter = { ...this.filter, ...data['filter'] };
      }
    });

    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getOrders(this.currentPage, this.pageSize, this.filter)
      .subscribe({
        next: (result: any) => {
          this.orders = result.data.items;
          this.totalItems = result.data.totalItems;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading orders:', error);
          this.loading = false;
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadOrders();
  }

  onStatusFilter(status: OrderStatus): void {
    this.filter.status = status;
    this.currentPage = 1;
    this.loadOrders();
  }

  clearFilters(): void {
    this.filter = {};
    this.currentPage = 1;
    this.loadOrders();
  }

  viewOrder(orderId: string): void {
    this.router.navigate(['/orders/details', orderId]);
  }

  getStatusBadgeColor(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Pending:
        return 'warning';
      case OrderStatus.Processing:
        return 'info';
      case OrderStatus.Shipped:
        return 'primary';
      case OrderStatus.Delivered:
        return 'success';
      case OrderStatus.Cancelled:
        return 'danger';
      case OrderStatus.Refunded:
        return 'secondary';
      default:
        return 'light';
    }
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

  trackByOrderId(index: number, order: Order): string {
    return order.id;
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
