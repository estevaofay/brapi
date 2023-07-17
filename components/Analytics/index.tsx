'use client';

import { useEffect } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import * as gtag from '~/utils/gtag';
import { usePathname } from 'next/navigation';
import { clarity } from 'clarity-js';

export const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    clarity.start({
      projectId: 'i08gpgdcs7',
      upload: 'https://m.clarity.ms/collect',
      track: true,
      content: true,
    });
  }, []);

  useEffect(() => {
    const url = new URL(pathname, window.location.origin);
    gtag.pageview(url);
  }, [pathname]);

  return <VercelAnalytics />;
};
