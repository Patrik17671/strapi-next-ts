export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
            NEXT_PUBLIC_BACKEND_API: string
            BASE_URL: string
            NEXT_PUBLIC_STRIPE_SECRET_KEY: string
            AUTH0_CLIENT_SECRET: string
            AUTH0_CLIENT_ID: string
            AUTH0_ISSUER_BASE_URL: string
            AUTH0_SECRET: string
            AUTH0_BASE_URL: string
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
        }
    }
}