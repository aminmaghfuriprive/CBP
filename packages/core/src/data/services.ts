
import { ServiceItem } from '../types';
import { LITIGATION_SERVICES } from './services/litigation';
import { BUSINESS_SERVICES } from './services/business';
import { AGRARIAN_SERVICES } from './services/agrarian';
import { CORPORATE_SERVICES } from './services/corporate';

// Aggregation of all service modules
export const SERVICES: ServiceItem[] = [
  ...LITIGATION_SERVICES,
  ...BUSINESS_SERVICES,
  ...AGRARIAN_SERVICES,
  ...CORPORATE_SERVICES
];
