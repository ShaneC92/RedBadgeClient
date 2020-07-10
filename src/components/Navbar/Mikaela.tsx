import React from "react";
import { Modal, Button } from 'antd';

class Mikaela extends React.Component {
  constructor(props:any){
    super(props);
  }
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e:any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e:any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  componentDidMount = () =>{
          fetch(``)
          fetch(`http://www.boredapi.com/api/activity?type:type`)
            .then(data=>data.json())
            .then(json=>{
                console.log(json);
            })
      }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default Mikaela;