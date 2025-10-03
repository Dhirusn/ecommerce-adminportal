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
  SpinnerComponent,
  TabsModule,
  TabContentComponent,
  TabPaneComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Customer } from '../../../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-details',
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
    SpinnerComponent,
    IconDirective,
    TabsModule,
    TabContentComponent,
    TabPaneComponent
  ],
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customer: Customer | null = null;
  loading = false;
  customerId: string = '';

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = params['id'];
      this.loadCustomer();
    });
  }

  loadCustomer(): void {
    this.loading = true;
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customer:', error);
        this.loading = false;
      }
    });
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
      day: 'numeric'
    });
  }

  editCustomer(): void {
    this.router.navigate(['/customers/edit', this.customerId]);
  }

  goBack(): void {
    this.router.navigate(['/customers/list']);
  }
getOrderStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      case 'canceled':
        return 'danger';
      case 'refunded':
        return 'info';
      default:
        return 'secondary';
    }
  }

}
