import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Order, OrderFilter, OrderCreateDto, OrderUpdateDto, OrderStatus, PaymentStatus } from '../../../models/order.model';
import { environment } from '../../../../environments/environment';
import { PaginatedResult, Result } from '../../../models/PaginatedResult.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;
  private fakeOrders: Order[] = this.generateFakeOrders();

  constructor(private http: HttpClient) { }

  getOrders(pageNumber: number = 1, pageSize: number = 10, filter: OrderFilter = {}): Observable<Result<PaginatedResult<Order>>> {
    // For demo purposes, return fake data
    let filteredOrders = this.fakeOrders;

    if (filter.status) {
      filteredOrders = filteredOrders.filter(order => order.status === filter.status);
    }

    if (filter.searchTerm) {
      filteredOrders = filteredOrders.filter(order =>
        order.orderNumber.toLowerCase().includes(filter.searchTerm!.toLowerCase()) ||
        order.customer.firstName.toLowerCase().includes(filter.searchTerm!.toLowerCase()) ||
        order.customer.lastName.toLowerCase().includes(filter.searchTerm!.toLowerCase())
      );
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const items = filteredOrders.slice(startIndex, startIndex + pageSize);

    const result: Result<PaginatedResult<Order>> = {
      success: true,
      data: {
        items,
        totalCount: filteredOrders.length,
        totalPages: Math.ceil(filteredOrders.length / pageSize),
        pageNumber: pageNumber,
        pageSize: pageSize,
        hasNext: true,
        hasPrevious: true,
        nextPageNumber: 2,
        previousPageNumber: 0
      },
      message: 'Orders retrieved successfully',
      errorCode: null
    };

    return of(result).pipe(delay(500));
  }

  getOrderById(orderId: string): Observable<Order> {
    const order = this.fakeOrders.find(o => o.id === orderId);
    return of(order!).pipe(delay(300));
  }

  createOrder(order: OrderCreateDto): Observable<Order> {
    const newOrder: Order = {
      id: this.generateId(),
      orderNumber: `ORD-${Date.now()}`,
      customerId: order.customerId,
      customer: this.generateFakeCustomer(),
      orderDate: new Date(),
      status: OrderStatus.Pending,
      totalAmount: order.orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0),
      subtotal: order.orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0),
      taxAmount: 0,
      shippingAmount: 0,
      discountAmount: 0,
      paymentMethod: order.paymentMethod,
      paymentStatus: PaymentStatus.Pending,
      shippingAddress: this.generateFakeAddress(),
      billingAddress: this.generateFakeAddress(),
      orderItems: order.orderItems.map(item => ({
        id: this.generateId(),
        orderId: '',
        productId: item.productId,
        productName: 'Sample Product',
        productSku: 'SKU-001',
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice * item.quantity
      })),
      orderNotes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.fakeOrders.unshift(newOrder);
    return of(newOrder).pipe(delay(500));
  }

  updateOrder(orderId: string, updateData: OrderUpdateDto): Observable<Order> {
    const orderIndex = this.fakeOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      this.fakeOrders[orderIndex] = { ...this.fakeOrders[orderIndex], ...updateData, updatedAt: new Date() };
      return of(this.fakeOrders[orderIndex]).pipe(delay(300));
    }
    throw new Error('Order not found');
  }

  deleteOrder(orderId: string): Observable<void> {
    const orderIndex = this.fakeOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      this.fakeOrders.splice(orderIndex, 1);
    }
    return of(void 0).pipe(delay(300));
  }

  private generateFakeOrders(): Order[] {
    const orders: Order[] = [];
    const statuses = Object.values(OrderStatus);
    const paymentStatuses = Object.values(PaymentStatus);

    for (let i = 0; i < 50; i++) {
      orders.push({
        id: this.generateId(),
        orderNumber: `ORD-${1000 + i}`,
        customerId: this.generateId(),
        customer: this.generateFakeCustomer(),
        orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        totalAmount: Math.round((Math.random() * 500 + 50) * 100) / 100,
        subtotal: Math.round((Math.random() * 400 + 40) * 100) / 100,
        taxAmount: Math.round((Math.random() * 50 + 5) * 100) / 100,
        shippingAmount: Math.round((Math.random() * 20 + 5) * 100) / 100,
        discountAmount: Math.round((Math.random() * 25) * 100) / 100,
        paymentMethod: ['credit_card', 'paypal', 'bank_transfer'][Math.floor(Math.random() * 3)],
        paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
        shippingAddress: this.generateFakeAddress(),
        billingAddress: this.generateFakeAddress(),
        orderItems: this.generateFakeOrderItems(),
        orderNotes: [],
        trackingNumber: Math.random() > 0.5 ? `TRK${Math.floor(Math.random() * 1000000)}` : undefined,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      });
    }
    return orders;
  }

  private generateFakeCustomer() {
    const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily', 'Chris', 'Lisa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

    return {
      id: this.generateId(),
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      email: `customer${Math.floor(Math.random() * 1000)}@example.com`,
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  private generateFakeAddress() {
    return {
      id: this.generateId(),
      firstName: 'John',
      lastName: 'Doe',
      addressLine1: `${Math.floor(Math.random() * 9999) + 1} Main St`,
      city: 'New York',
      state: 'NY',
      postalCode: `${Math.floor(Math.random() * 90000) + 10000}`,
      country: 'USA',
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`
    };
  }

  private generateFakeOrderItems() {
    const products = ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Headphones'];
    const items = [];
    const itemCount = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < itemCount; i++) {
      const quantity = Math.floor(Math.random() * 3) + 1;
      const unitPrice = Math.round((Math.random() * 200 + 10) * 100) / 100;

      items.push({
        id: this.generateId(),
        orderId: '',
        productId: this.generateId(),
        productName: products[Math.floor(Math.random() * products.length)],
        productSku: `SKU-${Math.floor(Math.random() * 1000)}`,
        quantity,
        unitPrice,
        totalPrice: quantity * unitPrice
      });
    }

    return items;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
