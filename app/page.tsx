'use client';

import dynamic from 'next/dynamic';
import { InitialPageLoader } from '../src/components/InitialPageLoader';

const App = dynamic(() => import('../src/App'), {
  ssr: false,
  loading: () => <InitialPageLoader />,
});

export default function Page() {
  return <App />;
}
