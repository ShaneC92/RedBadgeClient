import React from "react";
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from "reactstrap";

type props = {
    memberUpdate: any,
    updateOff:any,
    token:any,
    users:any
}
type stateVariables = {
    firstName:string,
    lastName:string
}

class MemberEdit extends React.Component<props,stateVariables>{
    constructor(props:props){
        super(props);
        this.state = {
            firstName:this.props.memberUpdate.firstName,
            lastName:this.props.memberUpdate.lastName
        }
    }
    cancel: any = (e:any)=>{
        e.preventDefault();
        this.props.users();
        this.props.updateOff();
    }
    memberUpdate: any = (e:any)=>{
        e.preventDefault();
        const id = this.props.memberUpdate.id;
        fetch(`http://localhost:3000/user/memberUpdate/${id}`,{
            method: "PUT",
            body:JSON.stringify({firstName:this.state.firstName,lastName:this.state.lastName}),
            headers:new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
        .then(res=>{
            this.props.users();
            this.props.updateOff();
        })
    }
    render(){
        console.log("Member update from memberedit.tsx",this.props.memberUpdate);
        return(
            <Modal isOpen = {true}>
                <ModalHeader>Edit a member's information</ModalHeader>
                <ModalBody>
                    <Form onSubmit = {this.memberUpdate}>
                        <FormGroup>
                            <Label htmlFor = "firstName">First Name: </Label>
                            <Input name = "firstName" type = "text" value = {this.state.firstName} required
                            onChange = {e=>this.setState({firstName:e.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor = "lastName">Last Name: </Label>
                            <Input name = "lastName" type = "text" value = {this.state.lastName} required
                            onChange = {e=>this.setState({lastName:e.target.value})}/>
                        </FormGroup>
                        <Button type = "submit">Update a member</Button> &nbsp;	&nbsp;	&nbsp;
                        <Button type = "button" onClick = {this.cancel}>Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}
export default MemberEdit;