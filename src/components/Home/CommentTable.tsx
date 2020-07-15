import React from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Button } from "reactstrap";
import APIURL from "../helpers/environment";
type props = {
    commentUpdate: any,
    updateOff: any,
    token: any,
    commentPosted:any
}
type stateVariable = {
    comment: string
}

class CommentTable extends React.Component<props,stateVariable>{
    constructor(props:props){
        super(props);
        this.state = {
            comment: this.props.commentUpdate.comment
        }
    }
    cancel: any = (e: any) => {
        e.preventDefault();
        this.props.updateOff();
    }
    commentUpdate: any = (e: any) => {
        e.preventDefault();
        const id = this.props.commentUpdate.id;
        fetch(`${APIURL}/movie/commentUpdate/${id}`, {
            method: "PUT",
            body: JSON.stringify({comment: this.state.comment}),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then(res => {
                this.props.updateOff();
                this.props.commentPosted();
            })
    }
    render(){
        return(
            <Modal isOpen={true}>
                <ModalHeader>Edit a member's information</ModalHeader>
                <ModalBody>
                    <Form onSubmit = {this.commentUpdate}>
                        <FormGroup>
                            <Input type="textarea" value = {this.state.comment} onChange = {e=>{this.setState({comment:e.target.value})}}/>
                        </FormGroup>
                        <Button type="submit">Update a comment</Button> &nbsp;	&nbsp;	&nbsp;
                        <Button type = "button" onClick = {this.cancel}>Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}
export default CommentTable;