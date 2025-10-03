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
  TabsModule,
  TabContentComponent,
  TabPaneComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Order, OrderStatus, PaymentStatus } from '../../../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
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
    TabsModule,
    TabContentComponent,
    TabPaneComponent
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: Order | null = null;
  loading = false;
  orderId: string = '';
  orderStatuses = Object.values(OrderStatus);
  paymentStatuses = Object.values(PaymentStatus);

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.loadOrder();
    });
  }

  loadOrder(): void {
    this.loading = true;
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading order:', error);
        this.loading = false;
      }
    });
  }

  updateOrderStatus(status: OrderStatus): void {
    if (!this.order) return;
    
    this.orderService.updateOrder(this.order.id, { status }).subscribe({
      next: (updatedOrder) => {
        this.order = updatedOrder;
      },
      error: (error) => {
        console.error('Error updating order status:', error);
      }
    });
  }

  updatePaymentStatus(paymentStatus: PaymentStatus): void {
    if (!this.order) return;
    
    this.orderService.updateOrder(this.order.id, { paymentStatus }).subscribe({
      next: (updatedOrder) => {
        this.order = updatedOrder;
      },
      error: (error) => {
        console.error('Error updating payment status:', error);
      }
    });
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

  getPaymentStatusColor(status: PaymentStatus): string {
    switch (status) {
      case PaymentStatus.Paid:
        return 'success';
      case PaymentStatus.Pending:
        return 'warning';
      case PaymentStatus.Failed:
        return 'danger';
      case PaymentStatus.Refunded:
        return 'secondary';
      case PaymentStatus.PartiallyRefunded:
        return 'info';
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  printInvoice(): void {
    // Implementation for printing invoice
    console.log('Printing invoice for order:', this.orderId);
  }

  editOrder(): void {
    this.router.navigate(['/orders/edit', this.orderId]);
  }

  goBack(): void {
    this.router.navigate(['/orders/list']);
  }
}
