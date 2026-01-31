
"use client";

import React from 'react';
import { useAuth } from '@cbp/core';
import { InternalDashboardView } from '../../src/components/dashboard/internal/InternalDashboardView';
import { FieldDashboardView } from '../../src/components/dashboard/field/FieldDashboardView';
import { ClientDashboardView } from '../../src/components/dashboard/client/ClientDashboardView';

export default function DashboardPage() {
  const { user } = useAuth();

  // 1. TAMPILAN FIELD OPS (Lapangan) - Mobile First UI
  if (user?.role === 'FIELD_OPS') {
    return <FieldDashboardView />;
  }

  // 2. TAMPILAN CLIENT PORTAL
  if (user?.role === 'CLIENT') {
    return <ClientDashboardView />;
  }

  // 3. TAMPILAN INTERNAL (Admin, Produksi, Finance, IT)
  return <InternalDashboardView />;
}
