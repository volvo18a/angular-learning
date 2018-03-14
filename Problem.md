# 自己不懂的一些知识整理

> 语法方面

```js
//需要引入才可使用 this.route.snapshot.paramMap.get('id')
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) { }

const id = +this.route.snapshot.paramMap.get('id');
```
语句中的 ```+``` 可将后面得到的 __id__ 隐式转换为 __number__
```this.route.snapshot.paramMap.get('id')``` 用于获取路由 __path/:id__ 配置的 __id__

> Subject

```js
import { Subject } from 'rxjs/Subject';

private searchTerms = new Subject<string>();

searchTerms.next(something);
```
引入的 ```Subject``` 可以被任意一个监听者监听到它的任意一个操作或改变

例如：
```js
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

searchTerms.pipe(
  //延迟300ms，使请求的最小间隔定为300ms
  debounceTime(300),
  
  //name重复不会请求
  distinctUntilChanged(),
  
  //为前两者都通过的name调用search
  switchMap((term: string) => 
  this.heroService.searchHeroes(term)),
);
```

> 关于父组件中变化的容器高度传递给子组件的解决方案

__parent.component.html__ 文件

```html
<child [innerH]="innerH"></child>
```

__child.component.ts__ 文件

```js
//主要是引入 Input OnChanges SimpleChanges
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

export class childComponent implements OnInit, OnChanges {
  @Input() innerH: number;
  
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
        if (changes[propName]) {
            const chng = changes[propName];
            const cur  = JSON.stringify(chng.currentValue);
            const prev = JSON.stringify(chng.previousValue);
            this.innerH = Number(cur);
            // console.log("cur:"+cur);
        }
    }
}
```

__@Input__ 用于接收父组件传的 innerH的值
__ngOnChanges 参数为一个 SimpleChanges对象__ 再取出其中变化的值进行处理

> 关于引入第三方 __js__ 使用其中方法修改 __this.xxx__ 视图不更新的解决方案

```js
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

constructor(private streamService: StreamService, private route: ActivatedRoute, private chRef: ChangeDetectorRef) {
  setInterval(() => {
    this.chRef.markForCheck();
  }, 1000);
}
```

引入 __ChangeDetectorRef__ 在 __constructor__ 构造中开一个定时器，调用 ```this.chRef.markForCheck()``` 手动触发脏检查
类似于 __angularJS 1.x__ 的 __$apply()__ 方法

持续更新ing( •̀ ω •́ )y
