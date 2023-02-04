import React from 'react'
import ImageIcon from '@rsuite/icons/Image';
import { Panel, Button } from 'rsuite';
import Image from 'next/image';

const index = ({url, openMedia}) => {
  return (
    <div>
       <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
        <Image src={url ? url : ""} height="240" />
        <Panel>
          <Button onClick={openMedia}>Thêm ảnh</Button>
        </Panel>
      </Panel>
    </div>
  )
}

export default index