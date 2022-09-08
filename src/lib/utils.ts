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

/**
 * Generate a new uuid
 * @returns uuid
 */
export const uuid: () => string = () =>
  // @ts-expect-error disable number[] + number warning
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
