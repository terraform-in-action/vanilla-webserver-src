import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
    IconButton,
    Typography,
    Toolbar,
    CircularProgress
} from '@material-ui/core';
import {
    Refresh as RefreshIcon,
} from '@material-ui/icons';
import withRoot from '../../themes/withRoot';
import { styles } from './home.js';
import Pet from '../cards/pet.jsx';
import { isNullOrUndefined } from '../../utility/utility.js'
import Create from '../dialog/create.jsx';

class Home extends Component {
    state = {};
    componentWillMount = () => {
        const kvs = this.props.router.location.search.split("&")
        let petId
        for (let kv of kvs) {
          const kv_pair = kv.split("=")
          const key = kv_pair[0]
          const value = kv_pair[1]
          if (key.includes("pet")){
             petId = value;
          }
          if(isNullOrUndefined(petId)){
            petId=null;

          }
            this.props.refreshPets({petId});
        }
    }

    renderPets = (pets,petActive) => {
        if (isNullOrUndefined(pets)) {
            return null
        }
        return pets.map((pet, index) => {
            return (
                <Pet
                    key={index}
                    index={index}
                    pet={pet}
                    selectPet={this.props.selectPet}
                    petActive={petActive}
                    deletePet={this.props.deletePet}
                />
            )
        })
    }

    renderContent = (petsList,petsLoading) => {
        if(petsLoading){
            return   <CircularProgress/>
        }
        return petsList.length>0?petsList:<Typography variant="h5">Click the "+" button to add pets</Typography>
        
    }

    render() {
        const { pets, petActive, petsLoading,classes } = this.props;
        const petsList = this.renderPets(pets,petActive)
        const content = this.renderContent(petsList,petsLoading)
        return (
            <div className={classNames(classes.root)}>
                <Toolbar>
                     <Typography variant="h3" internalDeprecatedVariant>My Pets!</Typography>
                    <div className={classes.flex}/>
                    <Create createPet={this.props.createPet} petActive/>
                    <IconButton onClick={() => { this.props.refreshPets({petId:petActive.id}) }} >
                        <RefreshIcon />
                    </IconButton>
                </Toolbar>
               {content}
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    refreshPets: PropTypes.func.isRequired,
    selectPet: PropTypes.func.isRequired,
    pets: PropTypes.array.isRequired,
    petActive: PropTypes.object.isRequired,
    petsLoading:PropTypes.bool.isRequired,
    deletePet: PropTypes.func.isRequired,
    createPet: PropTypes.func.isRequired,
};


export default withRoot(withStyles(styles, { withTheme: true })(Home));