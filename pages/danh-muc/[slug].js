import React from 'react'
import { useRouter } from 'next/router'

const Category = () => {
  const router = useRouter();
  const { slug } = router.query
  return (
    <div>Category {slug}</div>
  )
}

export default Category