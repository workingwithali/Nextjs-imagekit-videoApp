'use client';

import { ImageKitProvider } from '@imagekit/next';
import { SessionProvider } from 'next-auth/react';
import { NotificationProvider } from './Notification'; // ✅ Make sure the path is correct

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <ImageKitProvider urlEndpoint={urlEndPoint}>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ImageKitProvider>
    </SessionProvider>
  );
}
