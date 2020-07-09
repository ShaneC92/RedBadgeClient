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
type prop = {
  vote:number
}

export default class HoverRating extends React.Component<prop,stateVariable> {
  constructor(props:prop){
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
          name="read-only"
          value={this.props.vote}
          max = {10}
          precision={0.5}
          readOnly
        />
      </div>
    );
  }
}
