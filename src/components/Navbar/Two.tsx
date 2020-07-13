import React from 'react';
import {Modal, Button} from "antd";
import 'antd/dist/antd.css';
type props = {
    condition: any,
    jokeType: string,
    setup: any,
    delivery: any,
    showMe:boolean
}
type stateVariable = {
    visible: boolean
}
class Two extends React.Component<props,stateVariable> {
    constructor(props:props){
        super(props);
        this.state = {
            visible: true
        }
    }

    showModal: any = ()=>{
        this.setState({
            visible: true
        })
    }
    handleOk: any = (e:any)=>{
        this.setState({
            visible: false
        })
    }
    handleCancel: any = (e:any)=>{
        this.setState({
            visible: false
        });
    }
    render() {
        return(
            <div>
                <p onClick = {this.showModal}>Joke</p>
                <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.props.condition}
                onCancel={this.props.condition}
            >
                    <p>{this.props.jokeType}</p>
                    <p>{this.props.setup}</p>
                    <p>{this.props.delivery}</p>
                </Modal>
            </div>
        )
    }
}

export default Two;