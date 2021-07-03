import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache()
});

export const TestApp2 = () => {
    const EXCHANGE_RATES = gql`
      query GetExchangeRates {
        rates(currency: "USD") {
          currency
          rate
        }
      }
`;
    const { loading, error, data } = useQuery(EXCHANGE_RATES);
    console.log('loading', loading);
    console.log('error', error);
    console.log('data', data);
    return (
        <ApolloProvider client={client}>
            <div>TestApp2</div>
        </ApolloProvider>
    )
}
