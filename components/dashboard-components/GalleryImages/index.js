import React, { useState, useEffect } from 'react'
import { Panel } from 'rsuite';
import { Modal, ButtonToolbar, Button, Placeholder, Uploader } from 'rsuite';
import ImageIcon from '@rsuite/icons/Image';
import Image from 'next/image';
import axios from 'axios';

const index = ({open, handleClose}) => {
  const API_UPLOAD = `${process.env.NEXT_PUBLIC_SITE_URL}/api/uploads`;
  const [images, setImages] = useState([]);
  async function getAllImages () {
    const response = await axios.get(API_UPLOAD);
    if(response){
      setImages(response)
    }
  } 
  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <div>
      <Modal size="lg" open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Thư viện hình ảnh</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {
                Array.isArray(images) && images.length ? 
                images.map((val) => {
                  return (
                  <Panel key={val.id} shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                    <Image src={val.file_name} height="240" />
                  </Panel>
                )}) : ""
              }
              <Uploader action={API_UPLOAD} draggable>
                <div style={{ padding: '35px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{textAlign: 'center'}}>
                    <ImageIcon width={32} height={32} style={{marginBottom: 22}}/>
                    <p>Click hoặc kéo hình ảnh từ máy của bạn vào đây</p>
                  </div>
                </div>
              </Uploader>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
            <Button onClick={handleClose} appearance="primary">
              Ok
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default index