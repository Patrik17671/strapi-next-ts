import type {AppProps} from 'next/app'
import '../styles/main.sass'
import {Provider as ProviderApi, createClient} from "urql";
import Nav from "../components/header/Nav";
import {store} from '@/redux/store';
import { Provider } from 'react-redux';
import {Toaster} from 'react-hot-toast';


// @ts-ignore
const client = createClient({url: process.env.NEXT_PUBLIC_BACKEND_API});

export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <ProviderApi value={client}>
                <Toaster />
                <Nav />
                <Component {...pageProps} />
            </ProviderApi>
        </Provider>
    )
}
