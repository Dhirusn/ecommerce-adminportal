export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: Customer;
  orderDate: Date;
  status: OrderStatus;
  totalAmount: number;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  orderItems: OrderItem[];
  orderNotes: OrderNote[];
  trackingNumber?: string;
  shippingDate?: Date;
  deliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productImage?: string;
}

export interface OrderNote {
  id: string;
  orderId: string;
  note: string;
  isInternal: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
  Refunded = 'refunded'
}

export enum PaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Refunded = 'refunded',
  PartiallyRefunded = 'partially_refunded'
}

export interface OrderCreateDto {
  customerId: string;
  orderItems: OrderItemCreateDto[];
  shippingAddressId: string;
  billingAddressId: string;
  paymentMethod: string;
  notes?: string;
}

export interface OrderItemCreateDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderUpdateDto {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  trackingNumber?: string;
  notes?: string;
}

export interface OrderFilter {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  customerId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
}
