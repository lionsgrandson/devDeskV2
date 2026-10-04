export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in' },
  dashboard: {
    overview: '/dashboard',
    customers: '/dashboard/customers',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
