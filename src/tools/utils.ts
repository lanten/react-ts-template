/**
 * 全局函数
 */

/** 获取 url 参数 */
export function getQuery(search = window.location.search) {
  const query: AnyObj = {}
  search
    .substr(1)
    .split('&')
    .forEach((str) => {
      const strArr = str.split('=')
      const key = strArr[0]

      if (!key) return

      let val = decodeURIComponent(strArr[1])
      try {
        val = JSON.parse(val)
      } catch (err) {}
      query[key] = val
    })
  return query
}

/** 转换成 url search */
export function toSearch(obj: AnyObj) {
  const arr = Object.keys(obj).map((key) => {
    let val = obj[key]

    if (typeof val !== 'string') {
      try {
        val = JSON.stringify(val)
      } catch (err) {
        console.error(err)
      }
    }

    return `${key}=${encodeURIComponent(val)}`
  })
  return '?' + arr.join('&')
}
