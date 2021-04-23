import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import purple from '@material-ui/core/colors/purple';

import {
  Delete as DeleteIcon,
} from '@material-ui/icons';

import withRoot from '../../themes/withRoot';
import { styles } from './pet.js';
import { isNullOrUndefined } from '../../utility/utility.js'

class Pet extends Component {
  state = {
  };

  isActivePet = (pet, petActive) => {
    if (isNullOrUndefined(pet) || isNullOrUndefined(petActive)) {
      return false
    }
    return pet.id === petActive.id;
  }

  hashCode = (s)=>{
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  }

  random = (seed) => {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  //generate random color based on hash of id
  randomColorStyle = () => {
    let colors = [
      red[500],
      blue[500],
      green[500],
      yellow[500],
      purple[500],
      orange[500]
    ];
    let seed = this.hashCode(this.props.pet.id)
    let randomColor = colors[Math.floor(this.random(seed) * colors.length)];
    let style = { backgroundColor: randomColor }
    return style
  }

  render() {
    const { pet, petActive, classes } = this.props
    const isActive = this.isActivePet(pet, petActive)
    const selected = isActive ? classes.selected : null;
    return (
      <div className={classNames(classes.root)}>
        <Card className={classNames(classes.card, selected)} onClick={() => { this.props.selectPet({ pet: pet }) }}>
          <CardHeader
            avatar={
              <Avatar aria-label="avatar" style={this.randomColorStyle()} >{pet.name.charAt(0).toUpperCase()}</Avatar>
            }
            title={pet.name}
            subheader={pet.species}
            action={
              <IconButton onClick={() => {this.props.selectPet({pet:null}); this.props.deletePet({ petId: pet.id }) }}>
                <DeleteIcon />
              </IconButton>
            }
          />
          <CardMedia
            className={classes.media}
            image={pet.imageURL!==""?pet.imageURL: "https://s3-us-west-2.amazonaws.com/terraform-in-action/cat-0.jpg"}
            title="#selfie"
          />
          <CardContent className={classes.content}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Sex</TableCell>
                  <TableCell>Breed</TableCell>
                  <TableCell>Color</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  <TableCell >{pet.sex}</TableCell>
                  <TableCell >{pet.breed}</TableCell>
                  <TableCell >{pet.color}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>

        </Card>
      </div>
    )
  }
}


Pet.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  pet: PropTypes.object.isRequired,
  petActive: PropTypes.object.isRequired,
  selectPet: PropTypes.func.isRequired,
};

export default withRoot(withStyles(styles, { withTheme: true })(Pet));