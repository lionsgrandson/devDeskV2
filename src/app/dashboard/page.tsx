import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { Revenue } from '@/components/dashboard/overview/revenue';
import { Sales } from '@/components/dashboard/overview/sales';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';

export const metadata = { title: `Overview | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h4">Overview</Typography>
        <Typography color="text.secondary" variant="body2">
          A small demo snapshot. These values are intentionally hard-coded until the backend is added.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ md: 4, xs: 12 }}>
          <TotalCustomers sx={{ height: '100%' }} value="3" />
        </Grid>
        <Grid size={{ md: 4, xs: 12 }}>
          <Revenue sx={{ height: '100%' }} value="₪18.5k" />
        </Grid>
        <Grid size={{ md: 4, xs: 12 }}>
          <TotalProfit sx={{ height: '100%' }} value="₪12k" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Sales chartSeries={[{ name: 'Revenue', data: [8, 9, 7, 11, 10, 13, 12, 14, 15, 16, 17, 18] }]} />
        </Grid>
      </Grid>
    </Stack>
  );
}
