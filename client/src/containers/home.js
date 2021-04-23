import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Home from '../components/views/home.jsx'
import {
    createPet,
    refreshPets,
    selectPet,
    deletePet,
} from '../actions/home.js';

const mapStateToProps=(state)=>{
   
return{
    pets: state.pets.pets,
    petsLoading: state.pets.petsLoading,
    petActive: state.pets.petActive,
    router: state.router,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
      refreshPets: bindActionCreators(refreshPets,dispatch),
      selectPet: bindActionCreators(selectPet,dispatch),
      createPet: bindActionCreators(createPet,dispatch),
      deletePet: bindActionCreators(deletePet,dispatch),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);