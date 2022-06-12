import React, { useState} from 'react'

const SocialButton = (props) => {
  const { children, triggerLogin } = useState({...props});
  console.log(children);
  return (
    <button onClick={triggerLogin}>
      demo
    </button>
  )
}

export default SocialButton