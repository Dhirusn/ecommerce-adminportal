import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Customer, CustomerFilter, CustomerCreateDto, CustomerUpdateDto, CustomerStats, AddressType } from '../../../models/customer.model';
import { environment } from '../../../../environments/environment';
import { PaginatedResult, Result } from '../../../models/PaginatedResult.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = `${environment.apiUrl}/customers`;
  private fakeCustomers: Customer[] = this.generateFakeCustomers();

  constructor(private http: HttpClient) { }

  getCustomers(pageNumber: number = 1, pageSize: number = 10, filter: CustomerFilter = {}): Observable<Result<PaginatedResult<Customer>>> {
    let filteredCustomers = this.fakeCustomers;

    if (filter.isActive !== undefined) {
      filteredCustomers = filteredCustomers.filter(customer => customer.isActive === filter.isActive);
    }

    if (filter.searchTerm) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.firstName.toLowerCase().includes(filter.searchTerm!.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(filter.searchTerm!.toLowerCase()) ||
        customer.email.toLowerCase().includes(filter.searchTerm!.toLowerCase())
      );
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const items = filteredCustomers.slice(startIndex, startIndex + pageSize);

    const result: Result<PaginatedResult<Customer>> = {
      success: true,
      data: {
        items,
        totalCount: filteredCustomers.length,
        totalPages: Math.ceil(filteredCustomers.length / pageSize),
        // currentPage: pageNumber,
        pageSize,
        hasNext: pageNumber * pageSize < filteredCustomers.length,
        hasPrevious: pageNumber > 1,
        nextPageNumber: (pageNumber * pageSize < filteredCustomers.length) ? pageNumber + 1 : null,
        previousPageNumber: (pageNumber > 1) ? pageNumber - 1 : null,
        pageNumber: pageNumber
      },
      message: 'Customers retrieved successfully',
      errorCode: null
    };

    return of(result).pipe(delay(500));
  }

  getCustomerById(customerId: string): Observable<Customer> {
    const customer = this.fakeCustomers.find(c => c.id === customerId);
    return of(customer!).pipe(delay(300));
  }

  createCustomer(customerData: CustomerCreateDto): Observable<Customer> {
    const newCustomer: Customer = {
      id: this.generateId(),
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phone: customerData.phone,
      dateOfBirth: customerData.dateOfBirth,
      gender: customerData.gender,
      isActive: true,
      customerGroup: this.generateFakeCustomerGroup(),
      addresses: customerData.addresses?.map(addr => ({
        id: this.generateId(),
        customerId: '',
        type: addr.type,
        firstName: addr.firstName,
        lastName: addr.lastName,
        company: addr.company,
        addressLine1: addr.addressLine1,
        addressLine2: addr.addressLine2,
        city: addr.city,
        state: addr.state,
        postalCode: addr.postalCode,
        country: addr.country,
        phone: addr.phone,
        isDefault: addr.isDefault,
        createdAt: new Date(),
        updatedAt: new Date()
      })) || [],
      orders: [],
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.fakeCustomers.unshift(newCustomer);
    return of(newCustomer).pipe(delay(500));
  }

  updateCustomer(customerId: string, updateData: CustomerUpdateDto): Observable<Customer> {
    const customerIndex = this.fakeCustomers.findIndex(c => c.id === customerId);
    if (customerIndex !== -1) {
      this.fakeCustomers[customerIndex] = { ...this.fakeCustomers[customerIndex], ...updateData, updatedAt: new Date() };
      return of(this.fakeCustomers[customerIndex]).pipe(delay(300));
    }
    throw new Error('Customer not found');
  }

  deleteCustomer(customerId: string): Observable<void> {
    const customerIndex = this.fakeCustomers.findIndex(c => c.id === customerId);
    if (customerIndex !== -1) {
      this.fakeCustomers.splice(customerIndex, 1);
    }
    return of(void 0).pipe(delay(300));
  }

  getCustomerStats(): Observable<CustomerStats> {
    const stats: CustomerStats = {
      totalCustomers: this.fakeCustomers.length,
      newCustomersThisMonth: Math.floor(this.fakeCustomers.length * 0.15),
      activeCustomers: this.fakeCustomers.filter(c => c.isActive).length,
      averageOrderValue: 150.75,
      totalRevenue: this.fakeCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0),
      customerGrowthRate: 12.5
    };
    return of(stats).pipe(delay(300));
  }

  getCustomerOrders(customerId: string, pageNumber: number = 1, pageSize: number = 10): Observable<Result<PaginatedResult<any>>> {
    const customer = this.fakeCustomers.find(c => c.id === customerId);
    const orders = customer?.orders || [];

    const startIndex = (pageNumber - 1) * pageSize;
    const items = orders.slice(startIndex, startIndex + pageSize);

    const result: Result<PaginatedResult<any>> = {
      success: true,
      data: {
        items,
        totalCount: orders.length,
        totalPages: Math.ceil(orders.length / pageSize),
        pageNumber: pageNumber,
        pageSize: pageSize,
        hasNext: false,
        hasPrevious: false,
        nextPageNumber: 2,
        previousPageNumber: 0
      },
      message: 'Customer orders retrieved successfully',
      errorCode: null
    };

    return of(result).pipe(delay(300));
  }

  private generateFakeCustomers(): Customer[] {
    const customers: Customer[] = [];
    const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily', 'Chris', 'Lisa', 'Robert', 'Jessica'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Wilson'];

    for (let i = 0; i < 100; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const totalOrders = Math.floor(Math.random() * 20);
      const totalSpent = Math.round((Math.random() * 2000 + 100) * 100) / 100;

      customers.push({
        id: this.generateId(),
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
        phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        dateOfBirth: new Date(1980 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        gender: Math.random() > 0.5 ? 'male' : 'female',
        isActive: Math.random() > 0.1,
        customerGroup: this.generateFakeCustomerGroup(),
        addresses: this.generateFakeAddresses(),
        orders: this.generateFakeOrders(totalOrders),
        totalOrders,
        totalSpent,
        averageOrderValue: totalOrders > 0 ? totalSpent / totalOrders : 0,
        lastOrderDate: totalOrders > 0 ? new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000) : undefined,
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      });
    }
    return customers;
  }

  private generateFakeCustomerGroup() {
    const groups = ['Regular', 'VIP', 'Premium', 'Gold', 'Silver'];
    const groupName = groups[Math.floor(Math.random() * groups.length)];

    return {
      id: this.generateId(),
      name: groupName,
      description: `${groupName} customer group`,
      discountPercentage: Math.floor(Math.random() * 20),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  private generateFakeAddresses() {
    const addresses = [];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];

    // Generate 1-2 addresses per customer
    const addressCount = Math.floor(Math.random() * 2) + 1;

    for (let i = 0; i < addressCount; i++) {
      const cityIndex = Math.floor(Math.random() * cities.length);

      addresses.push({
        id: this.generateId(),
        customerId: '',
        type: i === 0 ? AddressType.Billing : AddressType.Shipping,
        firstName: 'John',
        lastName: 'Doe',
        addressLine1: `${Math.floor(Math.random() * 9999) + 1} Main St`,
        city: cities[cityIndex],
        state: states[cityIndex],
        postalCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: 'USA',
        phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        isDefault: i === 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return addresses;
  }

  private generateFakeOrders(count: number) {
    const orders = [];

    for (let i = 0; i < count; i++) {
      orders.push({
        id: this.generateId(),
        orderNumber: `ORD-${1000 + i}`,
        orderDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        status: ['pending', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)],
        totalAmount: Math.round((Math.random() * 500 + 50) * 100) / 100,
        paymentStatus: ['pending', 'paid', 'failed'][Math.floor(Math.random() * 3)]
      });
    }

    return orders;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
