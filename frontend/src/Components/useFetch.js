import { useState, useEffect } from "react";

const useFetch = (url) =>  {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        // Wrap the fetch logic in an async function to allow for aborting
        const fetchData = async () => {
            try {
                const response = await fetch(url, { signal: abortCont.signal });

                if (!response.ok) {
                    throw Error('Could not fetch the data!');
                }

                const data = await response.json();


                // Check if the component is unmounted before updating the state
                if (!abortCont.signal.aborted) {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                }
            } catch (err) {
                // Check if the component is unmounted before updating the state
                if (!abortCont.signal.aborted) {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted.');
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                }
            }
        };

        fetchData();

        // Return the cleanup function to abort the fetch when the component unmounts
        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error }
}

export default useFetch;
