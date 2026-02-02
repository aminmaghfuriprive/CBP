
import { UserRole } from '@cbp/core';
import React from 'react';

export interface MenuItem {
  label: string;
  path: string;
  matchPaths?: string[]; 
  icon: React.ElementType;
  roles: UserRole[]; 
}
