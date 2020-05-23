import React from 'react';

interface IState<T> {
  data: T;
  error: Error;
  loaded: boolean;
}

interface IFetcher<T> {
  (...args: any[]): Promise<T>;
}

interface IPerformFetchProps<T> {
  fullAPICaller: () => Promise<T>;
  onSuccess: (data: T) => void;
  onError: (error: Error) => void;
  reset: () => void;
}

const performAPICall = async <T>({ fullAPICaller, onSuccess, onError, reset }: IPerformFetchProps<T>) => {
  try {
    reset();
    const data = await fullAPICaller();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const useAPI = <T>(fetcher: IFetcher<T>, ...args: any[]) => {
  const [state, setState] = React.useState<IState<T>>({
    data: undefined,
    error: undefined,
    loaded: false,
  });

  const handleSuccess = React.useCallback((data: T) => {
    setState({ data, error: undefined, loaded: true });
  }, []);

  const handleError = React.useCallback((error) => {
    setState({ data: undefined, error, loaded: true });
  }, []);

  const reset = React.useCallback(() => {
    setState({ data: undefined, error: undefined, loaded: false });
  }, []);

  const load = React.useCallback(
    () =>
      performAPICall({ fullAPICaller: () => fetcher(...args), onSuccess: handleSuccess, onError: handleError, reset }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...args, fetcher, handleError, handleSuccess, reset],
  );

  React.useEffect(() => {
    load();
  }, [fetcher, handleError, handleSuccess, load, reset]);

  return { ...state, load };
};
