import store from "@/store/index";
import React from "react";
import { Provider } from "react-redux";
import { AppProps } from "../../node_modules/next/app";
import '../style/global.scss'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
        )
}