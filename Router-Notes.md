# Router笔记整理

_app.module.ts_ 文件

```js
import {APP_BASE_HREF} from '@angular/common';

providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
]
```

使用 _base href_ 会导致路由中的index.html丢失

配合使用hash路由

_app-routing.module.ts_ 文件

```js
import { ExtraOptions } from '@angular/router';

const config: ExtraOptions = {
  useHash: true,
};

imports: [ RouterModule.forRoot(routes, config) ]
```

会让路由 _/_ 后带有 _#/xxxxx_ 效果

_app-routing.module.ts_ 文件中

```js
const routes: Routes = [
  { path: 'screen', component: ScreenProjectorComponent },
  { path: 'screen/:id', component: ScreenProjectorComponent },
  { path: 'rooms', component: CustomerComponent },
  { path: 'rooms/:id', component: CustomerComponent },
  { path: 'manage', component: DispatcherComponent },
  { path: 'manage/:id', component: DispatcherComponent },
  { path: '**', redirectTo: '/manage' },
  { path: '', redirectTo: 'manage/:id', pathMatch: 'full' },
];
```

路由判断是从上至下的规则，因此末尾两句适合写在最后的位置，不然优先级太高会导致不必要的麻烦
