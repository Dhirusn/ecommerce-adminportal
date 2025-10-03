export interface ShippingRule {
  id: string;
  name: string;
  description?: string;
  zone: ShippingZone;
  method: ShippingMethod;
  minOrderValue: number;
  maxOrderValue?: number;
  minWeight?: number;
  maxWeight?: number;
  rate: number;
  rateType: RateType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingZone {
  id: string;
  name: string;
  description?: string;
  countries: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description?: string;
  carrier: Carrier;
  estimatedDeliveryDays: number;
  trackingEnabled: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Carrier {
  id: string;
  name: string;
  code: string;
  trackingUrl?: string;
  apiKey?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingLabel {
  id: string;
  orderId: string;
  trackingNumber: string;
  carrier: Carrier;
  shippingMethod: ShippingMethod;
  labelUrl: string;
  cost: number;
  createdAt: Date;
}

export interface TrackingInfo {
  trackingNumber: string;
  carrier: string;
  status: TrackingStatus;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  events: TrackingEvent[];
  lastUpdated: Date;
}

export interface TrackingEvent {
  date: Date;
  status: string;
  description: string;
  location?: string;
}

export enum RateType {
  Fixed = 'fixed',
  Percentage = 'percentage',
  PerWeight = 'per_weight',
  PerItem = 'per_item'
}

export enum TrackingStatus {
  Created = 'created',
  InTransit = 'in_transit',
  OutForDelivery = 'out_for_delivery',
  Delivered = 'delivered',
  Exception = 'exception',
  Returned = 'returned'
}

export interface ShippingRuleCreateDto {
  name: string;
  description?: string;
  zoneId: string;
  methodId: string;
  minOrderValue: number;
  maxOrderValue?: number;
  minWeight?: number;
  maxWeight?: number;
  rate: number;
  rateType: RateType;
  isActive: boolean;
}

export interface ShippingZoneCreateDto {
  name: string;
  description?: string;
  countries: string[];
  isActive: boolean;
}

export interface ShippingMethodCreateDto {
  name: string;
  description?: string;
  carrierId: string;
  estimatedDeliveryDays: number;
  trackingEnabled: boolean;
  isActive: boolean;
}

export interface CarrierCreateDto {
  name: string;
  code: string;
  trackingUrl?: string;
  apiKey?: string;
  isActive: boolean;
}

export interface ShippingCalculation {
  rules: ShippingRule[];
  totalCost: number;
  estimatedDelivery: Date;
  availableMethods: ShippingMethod[];
}

export interface ShippingFilter {
  zoneId?: string;
  methodId?: string;
  carrierId?: string;
  isActive?: boolean;
  minRate?: number;
  maxRate?: number;
}
