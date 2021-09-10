import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
// import storeConfig from './../store';

// const defaultOptions = {
//   timeout: 2000,
// };

class Request {
  private request: AxiosInstance;

  constructor() {
    this.request = axios;
    this.setupRequest();
    this.setupInterceptors();
  }

  setupInterceptors() {
    // this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  //   private setupRequestInterceptor(): void {
  //     this.request.interceptors.request.use(async function (
  //       config: AxiosRequestConfig,
  //     ) {
  //       const storageToken = await getAccessToken();
  //       const {
  //         AuthState: {accessToken = storageToken},
  //       } = storeConfig.store.getState();

  //       if (accessToken) {
  //         config.headers['Authorization'] = `Bearer ${accessToken}`;
  //       }
  //       return config;
  //     });
  //   }

  private setupResponseInterceptor(): void {
    this.request.interceptors.response.use(
      function (res) {
        return res.data?.payload ?? res?.data;
      },
      function (err: AxiosError) {
        // if (err?.response?.status === 401) {
        //   storeConfig.store.dispatch(userLogout(false));
        // }

        return Promise.reject(err);
      },
    );
  }

  private setupRequest(): void {
    this.request.defaults = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  get<T>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
    return this.request.get(url, options);
  }

  post<T>(
    url: string,
    body: any,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    return this.request.post(url, body, options);
  }

  put<T>(url: string, body: any, options: AxiosRequestConfig = {}): Promise<T> {
    return this.request.put(url, body, options);
  }

  delete<T>(
    url: string,
    body: any,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    return this.request.delete(url, {data: body, ...options});
  }
}

const request = new Request();

export default request;
