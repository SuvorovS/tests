import React, {useRef, useEffect, useState} from "react";
import {gql, useQuery, useLazyQuery} from "@apollo/client";
import debounce from "lodash.debounce";
const EXCHANGE_RATES = gql`
        query Test ($user: String!) { 
          user(login: $user) { 
            login
            repositories(first: 10) {
              nodes {
                name
              }
            }
          }
        }
`;

const useDebounced = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState();

    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            // @ts-ignore
            setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
            clearTimeout(handler);
        };

        // debounce(setDebouncedValue(value), delay)();

    }, [value, delay])

    return debouncedValue;

}
export const Header = () => {
    const [ user, setUser ] = React.useState('test');

    const [loadUserData,  { called, loading, data }] = useLazyQuery(
        EXCHANGE_RATES,
    { variables: { user } }
    );

    const debouncedUserValue = useDebounced(user, 2000);

    React.useEffect(() => {
        console.log('useEffect', user);
        loadUserData();
    }, [debouncedUserValue])

    // const testDebouncedFunction = React.useCallback(debounce((value) => {
    //     console.log('testDebouncedFunction', value);
    //     setUser(value);
    //     // console.log('user', user);
    //     loadUserData()
    // }, 3000), []);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setUser(value);
        // testDebouncedFunction(value);
    }

    // console.log('user:', user);

    return (
        <div>
            <input onChange={handleChange} value={user} type="text"/>
            {/*<input onChange={handleChange} type="text"/>*/}
            <button onClick={() => {setUser(user + '1')}}>changeUser</button>

        </div>
    );
}
