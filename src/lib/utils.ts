export function asyncDebounce<A extends unknown[], R>(
  fn: (...args: A) => Promise<R>,
  wait: number
): (...args: A) => Promise<R> {
  let lastTimeoutId: ReturnType<typeof setTimeout> | undefined = undefined

  return (...args: A): Promise<R> => {
    clearTimeout(lastTimeoutId)

    return new Promise((resolve, reject) => {
      const currentTimeoutId = setTimeout(async () => {
        try {
          if (currentTimeoutId === lastTimeoutId) {
            const result = await fn(...args)
            resolve(result)
          }
        } catch (err) {
          reject(err)
        }
      }, wait)

      lastTimeoutId = currentTimeoutId
    })
  }
}

/**
 * Util to convert a Uint8Array to a string
 * @param u8array
 * @returns string
 */
export const convertUint8ToString: (u8array: Uint8Array) => string = u8array => {
  const CHUNK_SZ = 0x8000
  const c = []
  for (let i = 0; i < u8array.length; i += CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8array.subarray(i, i + CHUNK_SZ)))
  }
  return c.join('')
}

export const extractSearchParam = (url: URL, param: string): string | null => {
  const val = url.searchParams.get(param)

  // clear the param from the URL
  url.searchParams.delete(param)
  history.replaceState(null, document.title, url.toString())

  return val
}