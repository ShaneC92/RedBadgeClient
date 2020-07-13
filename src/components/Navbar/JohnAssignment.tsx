import React from 'react';
import {Modal, Button} from "antd";
import 'antd/dist/antd.css';
//Will use Admin access for update and deleting the movies on the list.
//Will be seen by 'User' as a second table
type props = {
    jokeType: string,
    joke: any,
    condition: any,
    showMe:boolean
}
type stateVariable = {
    visible: boolean
}
class JohnAssignment extends React.Component<props,stateVariable> {
    constructor(props:props){
        super(props);
        this.state = {
            visible: true
        }
    }
    render() {
        console.log("This is props for jokes",this.props);
        return(
            <div>
                <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.props.condition}
                onCancel={this.props.condition}
            >
                <p>{this.props.jokeType}</p>
                <p>{this.props.joke}</p>
                </Modal>
            </div>
        )
    }
}

export default JohnAssignment;

// if(this.state.type === "single"){
//     return(
        // <Modal isOpen = {true}>
        //     <ModalHeader>{this.state.type}</ModalHeader>
        //     <ModalBody>
        //         <h1>{this.state.joke}</h1>
        //         <Button onClick = {this.props.condition}>Done</Button>
        //     </ModalBody>
        // </Modal>
//     )
// }
// else{
//     return(
//         <Modal isOpen = {true}>
//             <ModalHeader>{this.state.type}</ModalHeader>
//             <ModalBody>
//                 <h1>{this.state.setup}</h1>
//                 <h1>{this.state.delivery}</h1>
//                 <Button onClick = {this.props.condition}>Done</Button>
//             </ModalBody>
//         </Modal>
//     )
// }