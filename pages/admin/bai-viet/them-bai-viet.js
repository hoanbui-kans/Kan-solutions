import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { Breadcrumb } from 'rsuite'
import { Container, Row, Col, Form, Schema, ButtonToolbar, Button, Input } from 'rsuite';
import slugify from 'slugify';
import styles from '../../../styles/dashboard.module.css';
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../../components/Editor"), { ssr: false });

const addPosts = () => {
    const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
    const [content, setContent] = useState( '' );
    const [post, setPost] = useState({
        title: "",
        name: "",
        content: "",
        thumbnail: ""
    });

    const { Types } = Schema;

    const model = Schema.Model({
        title: Types.StringType().isRequired('Trường tiêu đề không được để trống.'),
    });

    useEffect(() => {
        if(post.title){
            const name = slugify(post.title, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true,      // convert to lower case, defaults to `false`
                strict: false,     // strip special characters except replacement, defaults to `false`
                locale: 'vi',       // language code of the locale to use
                trim: true         // trim leading and trailing replacement chars, defaults to `true`
            });
            setPost((post) => ({...post, name: name}));  
        }
    }, [post])

    const onEditorChange = ( event, editor ) => {
        const data = editor.getData();
        setContent( data );
      };

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Quản trị</Breadcrumb.Item>
                <Breadcrumb.Item active>Thêm bài viết</Breadcrumb.Item>
            </Breadcrumb>
            <div>
            <Form 
                                model={model}
                                onChange={setPost}
                                fluid
                            >
                <Container>
                    <Row>
                        <Col xs={24} md={16}>
                                <Form.Group controlId="name">
                                    <Form.ControlLabel>Username</Form.ControlLabel>
                                    <Form.Control name="title" />
                                    <Form.HelpText>Username is required</Form.HelpText>
                                </Form.Group>
                                <Form.Group controlId="slug">
                                    <Form.ControlLabel>slug</Form.ControlLabel>
                                    <Form.Control name="name" value={post.name} readOnly disabled/>
                                </Form.Group>
                                <Form.Group controlId="email">
                                <Form.ControlLabel>Email</Form.ControlLabel>
                                <Form.Control name="email" type="email" />
                                    <Form.HelpText tooltip>Email is required</Form.HelpText>
                                </Form.Group>
                                    <Form.Group controlId="password">
                                    <Form.ControlLabel>Password</Form.ControlLabel>
                                    <Form.Control name="password" type="password" autoComplete="off" />
                                </Form.Group>
                                <Form.Group controlId="textarea">
                                    <Form.ControlLabel>Textarea</Form.ControlLabel>
                                    <Editor value={content} onChange={(v) => setContent(v)}/>
                                </Form.Group>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Group>
                                <ButtonToolbar>
                                    <Button appearance="primary">Submit</Button>
                                    <Button appearance="default">Cancel</Button>
                                </ButtonToolbar>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
                </Form>
            </div>
        </>
    )
}

export default addPosts