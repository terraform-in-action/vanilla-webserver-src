import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../themes/withRoot';
import { styles } from './dialog.js';
import {
    Add as AddIcon,
} from '@material-ui/icons';

import {
    DialogContentText,
    TextField,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core';
import Dialog from './dialog.jsx';
class Create extends Component {
    state = {
        open: false,
        name: "",
        sex: "",
        species: "",
        color: "",
        breed: "",
        imageURL: "",
    };

    resetState = () => {
        this.setState({
            name: "",
            sex: "",
            species: "",
            color: "",
            breed: "",
            imageURL: "",
        })
    }
    handleClose = () => {
        this.setState({ open: false });
        this.resetState()
    }

    handleConfirm = () => {
        this.setState({ open: false });
        let pet = {
            name:this.state.name,
            sex:this.state.sex,
            species:this.state.species,
            color: this.state.color,
            breed: this.state.breed,
            imageURL: this.state.imageURL,
        }
        this.props.createPet({pet,petId:this.props.petActive.id})
        this.resetState()
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.resetState()
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (

            <div className={classes.root} autoComplete="off">
                <Dialog title="Add Pet"
                    icon={<AddIcon />}
                    open={open}
                    valid={true}
                    handleConfirm={this.handleConfirm}
                    handleOpen={this.handleOpen}
                    handleClose={this.handleClose}>
                    <DialogContentText id="alert-dialog-description" className={classes.dialogContentText}>
                        {"Fill out this form to add a new pet to the database"}
                    </DialogContentText>
                    <div>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange}

                            />
                        </FormControl>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Sex</FormLabel>
                            <RadioGroup
                                aria-label="sex"
                                name="sex"
                                className={classes.group}
                                value={this.state.sex}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel
                                    value="Female"
                                    control={<Radio color="primary" />}
                                    label="Female"

                                />
                                <FormControlLabel
                                    value="Male"
                                    control={<Radio color="primary" />}
                                    label="Male"
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="species-simple">Species</InputLabel>
                            <Select
                                value={this.state.species}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'species',
                                    id: 'species-simple',
                                }}
                                displayEmpty
                                className={classes.selectEmpty}
                            >
                                <MenuItem value="Cat">Cat</MenuItem>
                                <MenuItem value="Dog">Dog</MenuItem>
                                <MenuItem value="Rat">Rat</MenuItem>
                                <MenuItem value="Guinea Pig">Guinea Pig</MenuItem>
                                <MenuItem value="Fish">Fish</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="color"
                                name="color"
                                label="Color"
                                className={classes.textField}
                                value={this.state.color}
                                onChange={this.handleChange}

                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="breed"
                                name="breed"
                                label="Breed"
                                className={classes.textField}
                                value={this.state.breed}
                                onChange={this.handleChange}

                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="imageURL"
                                name="imageURL"
                                label="Pet Image URL"
                                className={classes.textField}
                                value={this.state.imageURL}
                                onChange={this.handleChange}
                                helperText="e.g. https://www.example.com/cat.jpg"
                            />
                        </FormControl>
                    </div>
                </Dialog>
            </div>
        );
    }
}



Create.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default withRoot(withStyles(styles, { withTheme: true })(Create));
