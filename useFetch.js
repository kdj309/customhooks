import React, { useState,useCallback } from "react";

export default function useFetch( responseHandler) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestHandler=  useCallback(
        async (requestConfig) => {
            // console.log(requestConfig);
            setIsLoading(true);
            setError(null);
            try {
              fetch(requestConfig.url, {
                method: requestConfig.method,
                headers:
                  requestConfig.method === "GET"
                    ? {}
                    : {
                        "Content-type": "application/json",
                      },
                body: requestConfig.method === "GET" ? null : requestConfig.body,
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Request failed!");
                  }
                 return response.json();
                })
                .then((data) => {
                    responseHandler(data)
                });
             
            } catch (err) {
              setError(err.message || "Something went wrong!");
            }
            setIsLoading(false);
          },
      [],
    )
    
  return {
    isLoading,
    error,
    requestHandler,
  };
}
//
