# 路由Query

Cabloy-Front 对路由`Query`进行了强化，提供了 Typescript 类型化支持

## 创建页面组件

为了完整的演示如何定义和使用类型化的`Query`，这里我们在模块`test-demo`中创建一个新的页面组件`user`：

```bash
$ cabloy front:create:page user
```

## 定义Query

在`mother.ts`中定义 Query：

`src/module/test-demo/src/page/user/mother.ts`

```typescript{4-5}
import { zz } from '@cabloy/front';

export const QuerySchema = zz.object({
  name: zz.string().optional(),
  age: zz.number().optional(),
});
```

- Cabloy-Front 对[zod](https://zod.dev)进行了封装，提供了`zz`对象
- 使用`zz`定义了一个`object`，包含两个字段：`name`和`age`

## 使用Query

在`render.ts`中，可以直接获取 Query，并渲染出来

`src/module/test-demo/src/page/user/render.tsx`

```typescript{6-11}
@Local()
export class RenderPageUser extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div>
          name: {this.$query.name}, {typeof this.$query.name}
        </div>
        <div>
          age: {this.$query.age}, {typeof this.$query.age}
        </div>
      </div>
    );
  }
}
```

- `$query.name`的类型是`string | undefined`
- `$query.age`的类型是`number | undefined`

## 传入Query

接下来，我们需要在导航路由时传入`Query`参数

直接在页面组件`user`中添加一个按钮，响应单击事件，并采用不同的`Query参数`导航至当前页面。这样，我们可以看到`$query`是响应式的

```typescript{12-20}
@Local()
export class RenderPageUser extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div>
          name: {this.$query.name}, {typeof this.$query.name}
        </div>
        <div>
          age: {this.$query.age}, {typeof this.$query.age}
        </div>
        <button
          onClick={() => {
            const age = (this.$query.age ?? 0) + 1;
            const url = this.$router.resolvePath('/test/demo/user', { name: 'tom', age });
            this.$router.push(url);
          }}
        >
          Go To Current Page
        </button>
      </div>
    );
  }
}
```