declare module '@next/bundle-analyzer' {
  import { Plugin } from 'next/dist/next-server/lib/utils';
  export default function withBundleAnalyzer(
    options: any
  ): (nextConfig: any) => any;
}
