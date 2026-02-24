/* eslint-disable no-unused-vars */
import { AxiosRequestConfig } from 'axios';
import React, { createContext, useContext } from 'react';

interface APIInstanceParams {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  configs?: AxiosRequestConfig;
  body?: any;
  showError?: boolean;
  showToast?: boolean;
}

interface APIInstanceResponse {
  data?: any;
  error?: any;
  eData?: any;
}

interface Props {
  apiInstance: (rParams: APIInstanceParams) => Promise<APIInstanceResponse>;
  children: any;
}

interface TValue {
  apiInstance: (rParams: APIInstanceParams) => Promise<APIInstanceResponse>;
}

// @ts-ignore
const APIContext = createContext<TValue>();

class APIProvider extends React.PureComponent<Props, any> {
  static apiInstance: (
    rParams: APIInstanceParams
  ) => Promise<APIInstanceResponse>;

  constructor(props: any) {
    super(props);
    this.state = {};
    APIProvider.apiInstance = this.props.apiInstance;
  }

  render() {
    return (
      <APIContext.Provider value={{ apiInstance: APIProvider.apiInstance }}>
        {this.props.children}
      </APIContext.Provider>
    );
  }
}

const useAPIContext = (): TValue => useContext(APIContext);

export { APIContext, APIProvider, useAPIContext };
