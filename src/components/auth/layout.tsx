import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100%',
        p: 3,
      }}
    >
      <Stack spacing={4} sx={{ maxWidth: 450, width: '100%' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          DevDesk
        </Typography>
        {children}
      </Stack>
    </Box>
  );
}
