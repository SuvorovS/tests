import React from "react";
import {
    concat,
    HttpLink,
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import { Header } from './components/Header';

const token = process.env.REACT_APP_GT_TOKEN;
const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null
        }
    }));

    return forward(operation);
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
    connectToDevTools: true,
});

export const TestApp2 = () => (
    <ApolloProvider client={client}>
        <Header />
    </ApolloProvider>
);
