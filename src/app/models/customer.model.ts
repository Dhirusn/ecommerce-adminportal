export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: string;
  isActive: boolean;
  customerGroup: CustomerGroup;
  addresses: Address[];
  orders: Order[];
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerGroup {
  id: string;
  name: string;
  description?: string;
  discountPercentage: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  customerId: string;
  type: AddressType;
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
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: Date;
  status: string;
  totalAmount: number;
  paymentStatus: string;
}

export enum AddressType {
  Billing = 'billing',
  Shipping = 'shipping'
}

export interface CustomerCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: string;
  customerGroupId?: string;
  addresses?: AddressCreateDto[];
}

export interface AddressCreateDto {
  type: AddressType;
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
  isDefault: boolean;
}

export interface CustomerUpdateDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: string;
  customerGroupId?: string;
  isActive?: boolean;
}

export interface CustomerFilter {
  customerGroupId?: string;
  isActive?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
  minTotalSpent?: number;
  maxTotalSpent?: number;
}

export interface CustomerStats {
  totalCustomers: number;
  newCustomersThisMonth: number;
  activeCustomers: number;
  averageOrderValue: number;
  totalRevenue: number;
  customerGrowthRate: number;
}

export interface CustomerReview {
  id: string;
  customerId: string;
  productId: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
