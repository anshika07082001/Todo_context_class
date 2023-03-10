import React from "react";

const LoaderContext = React.createContext();

const LoaderProvider = LoaderContext.Provider;
const LoaderConsumer = LoaderContext.Consumer;

export { LoaderProvider, LoaderConsumer };
