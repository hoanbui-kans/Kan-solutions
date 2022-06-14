import React from 'react'

const HeaderSeo = () => {
  return (
    <div>HeaderSeo</div>
  )
}

export default HeaderSeo

export async function getServerSideProps(context) {
    console.log(context)      
    // Pass data to the page via props
    return { props: { 
    }
}
}