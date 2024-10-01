"use client";

import Header from '@/components/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export default function QueryWrapper({ children }) {
    const queryClient = new QueryClient()
    const pathName = usePathname()

    return (
        <QueryClientProvider client={queryClient}>
            {pathName !== '/login' && <Header />}
            {children}
        </QueryClientProvider>
    );
}