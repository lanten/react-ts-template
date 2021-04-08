interface State {
  /** 用户权限列表 */
  userPermissions: string[]
}

export const initialState: State = {
  userPermissions: [],
}

/** 更新用户权限列表 */
export function UPDATE_USER_PERMISSIONS(data: State['userPermissions']) {
  return { userPermissions: data }
}

declare global {
  interface StoreStates extends State {}

  interface StoreActions {
    UPDATE_USER_PERMISSIONS: State['userPermissions']
  }
}
