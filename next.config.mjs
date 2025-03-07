/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
          protocol: 'https',
          hostname: 'fqxttxwgklighunmhwgq.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/images/realytics/assets/**'
        }, {
            protocol: 'https',
            hostname: 'img4.idealista.com',
            port: '',
            pathname: '/**'
        }]
      },
};

export default nextConfig;
