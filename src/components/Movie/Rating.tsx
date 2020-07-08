import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});
type stateVariable = {
  value:number|null,
  hover:any
}

export default class HoverRating extends React.Component<{},stateVariable> {
  constructor(props:stateVariable){
    super(props);
    this.state = {
      value:2,
      hover:-1
    }
  }
  render(){
    return (
      <div className="this.classes.root">
        <Rating
          name="hover-feedback"
          value={this.state.value}
          precision={0.5}
          onChange={(event,newValue:any) => {
          this.setState({
            value:newValue
          })
          }}
          onChangeActive={(event,newHover:any) => {
            this.setState({
              hover:newHover
            })
          }}
        />
        {this.state.value !== null && <Box ml={2}>{labels[this.state.hover !== -1 ? this.state.hover : this.state.value]}</Box>}
      </div>
    );
  }
}
