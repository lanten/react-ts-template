## Redux Actions

* 请按照领域拆分文件而非页面
* 请以 {name}.action.ts 格式名称文件

## 示例

```ts
export const initialState = {
  count: 1,
}

export function ACTION_ADD_COUNT(
  state: StoreStates,
  action: StoreAction<'ACTION_ADD_COUNT'>
): { count: number } {
  console.log({ state, action })
  return { count: state.count + 1 }
}

declare global {
  interface StoreStates {
    count: number
  }

  interface StoreActions {
    ACTION_ADD_COUNT: number
  }
}

```