import React from "react";
import { Modal } from 'antd';
import 'antd/dist/antd.css';

type Bored= {
  activity: any,
  type: string,
  visible: boolean
}
class Mikaela extends React.Component<{},Bored> {
  constructor(props:Bored){
    super(props);
    this.state = {
      visible: false,
      activity: "",
      type: ""
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
    
    fetch(`https://www.boredapi.com/api/activity?type:type`)
            .then(data=>data.json())
            .then(json=>{
                console.log(json);
                this.setState({
                  activity: json.activity,
                  type: json.type
              })
            })
  };

  handleOk = (e:any) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e:any) => {
    //console.log(e);
    this.setState({
      visible: false
    });
  };

  // componentDidMount = () =>{
  //         fetch(`https://www.boredapi.com/api/activity?type:type`)
  //           .then(data=>data.json())
  //           .then(json=>{
  //               console.log(json);
  //               this.setState({
  //                 activity: json.activity,
  //                 type: json.type
  //             })
  //           })
  //     }

  render() {
    return (
      <div>
        <p className="Mikaela" onClick={this.showModal}>
          Bored?
        </p>
        <Modal
          title="Try this activity!"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.state.activity}</p>
          <p>Type: {this.state.type}</p>
        </Modal>
      </div>
    );
  }
}
export default Mikaela;