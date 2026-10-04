import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

export const metadata = { title: `Clients | ${config.site.name}` } satisfies Metadata;

const customers = [
  {
    id: 'CLIENT-001',
    name: 'Demo Client A',
    email: 'client-a@example.com',
    phone: '050-000-0001',
    address: { city: 'Tel Aviv', country: 'Israel' },
  },
  {
    id: 'CLIENT-002',
    name: 'Demo Client B',
    email: 'client-b@example.com',
    phone: '050-000-0002',
    address: { city: 'Haifa', country: 'Israel' },
  },
  {
    id: 'CLIENT-003',
    name: 'Demo Client C',
    email: 'client-c@example.com',
    phone: '050-000-0003',
    address: { city: 'Jerusalem', country: 'Israel' },
  },
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h4">Clients</Typography>
        <Typography color="text.secondary" variant="body2">
          Three sample records for the starting UI. Real create, edit, search, and persistence will be built step by step.
        </Typography>
      </Stack>
      <CustomersTable rows={customers} />
    </Stack>
  );
}
