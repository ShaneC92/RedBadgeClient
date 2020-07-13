import React from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import '../Navbar.css';

type AcceptedProps = {
    shell: any,
    mixin: any,
    seasoning: any,
    condiment: any,
    base_layer: any,
    visible: boolean
}
// shell, mixin, seasoning, condiment, base_layer 

class Shane extends React.Component<{}, AcceptedProps> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
            shell: '',
            mixin: '',
            seasoning: '',
            condiment: '',
            base_layer: '',
            visible: false
        }
    }
    //Ant Design Modal
    showModal = () => {
        this.setState({
        visible: true,
        });

        fetch('https://taco-randomizer.herokuapp.com/random/')
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                shell: json.shell.name,
                mixin: json.mixin.name,
                seasoning: json.seasoning.name,
                condiment: json.condiment.name,
                base_layer: json.base_layer.name,
            })
        })
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

  //Taco

        // componentDidMount = () => {
        //     console.log("Component Mounted")
    
        //     fetch('https://taco-randomizer.herokuapp.com/random/')
        //         .then(res => res.json())
        //         .then(json => {
        //             console.log(json);
        //             this.setState({
        //                 shell: json.shell.name,
        //                 mixin: json.mixin.name,
        //                 seasoning: json.seasoning.name,
        //                 condiment: json.condiment.name,
        //                 base_layer: json.base_layer.name,
        //             })
        //         })
        // }


  render() {
    return (
      <div>
        <p className="Shane" onClick={this.showModal}>
          Tacos
        </p>
        <Modal
          title="What should I eat?"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
           <ul>
               <h4>A Taco of Course!</h4>
                <li>Shell: {this.state.shell}</li>
                <li>Mixing: {this.state.mixin}</li>
                <li>Seasoning: {this.state.seasoning}</li>
                <li>Condiment: {this.state.condiment}</li>
                <li>Base Layer: {this.state.base_layer}</li>
           </ul>
        </Modal>
      </div>
    );
  }
}

export default Shane;