#Http笔记整理

> HttpClientModule

```js
import { HttpClientModule } from '@angular/common/http';
```

其提供 ```HttpClient``` 和相关服务的 ```NgModule```

> HttpClient

[https://angular.io/api/common/http/HttpClient] 的方法参数：
```js
class HttpClient {
  constructor(handler: HttpHandler)
  request(first: string | HttpRequest<any>, url?: string, options: {...}): Observable<any>
  delete(url: string, options: {...}): Observable<any>
  get(url: string, options: {...}): Observable<any>
  head(url: string, options: {...}): Observable<any>
  jsonp<T>(url: string, callbackParam: string): Observable<T>
  options(url: string, options: {...}): Observable<any>
  patch(url: string, body: any | null, options: {...}): Observable<any>
  post(url: string, body: any | null, options: {...}): Observable<any>
  put(url: string, body: any | null, options: {...}): Observable<any>
}
```
