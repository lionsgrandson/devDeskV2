import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Not found | ${config.site.name}` } satisfies Metadata;

export default function NotFound(): React.JSX.Element {
  return (
    <Box component="main" sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100vh', p: 3 }}>
      <Stack spacing={3} sx={{ alignItems: 'center', maxWidth: 560, textAlign: 'center' }}>
        <Typography variant="h2">404</Typography>
        <Typography variant="h4">Page not found</Typography>
        <Typography color="text.secondary" variant="body1">
          The page does not exist or has been removed.
        </Typography>
        <Button
          component={RouterLink}
          href={paths.dashboard.overview}
          startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          Back to DevDesk
        </Button>
      </Stack>
    </Box>
  );
}
