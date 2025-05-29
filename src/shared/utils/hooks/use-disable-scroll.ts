import { useEffect } from 'react'

export const useDisableScroll = (bool: boolean) => {
  useEffect(() => {
    if (bool) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [bool])
}