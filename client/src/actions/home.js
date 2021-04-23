import {
    PETS,
    PETS_LOADING,
    PET_ACTIVE,
    API_URL,
} from '../constants/actions.js';
import { push } from 'connected-react-router';
import { isNullOrUndefined } from '../utility/utility.js';

//pipelines
export function refreshPets({petId}) {
    return (dispatch) => {
        dispatch(petsLoading(true));
        dispatch(listPets(petId));
    }
}

export function selectPet({ pet }) {
    return (dispatch) => {
        if(isNullOrUndefined(pet)){
            dispatch(activePet({}));
            dispatch(push({ pathname: '/',search:``}))
            return
        }
        dispatch(activePet(pet));
        dispatch(push({ pathname: '/', search: `?pet=${pet.id}` }))
        dispatch(refreshPets({petId:null}));
    }
}

export function createPet({ pet,petId }) {
    return (dispatch) => {
        const data = pet
        const endpoint = `${API_URL}/pets`;
        dispatch(petsLoading(true));
        fetch(endpoint,{
                method: 'POST',
                mode: "cors",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
        })
        .then(()=>{dispatch(refreshPets({petId:null}))})
        .catch(
            e => {console.log(e);dispatch(petsLoading(false))}

        )
    }
}
export function deletePet( {petId} ) {
    return (dispatch) => {
        const endpoint = `${API_URL}/pets/${petId}`;
        dispatch(petsLoading(true));
        fetch(endpoint,{
                method: 'DELETE',
                mode: "cors",
        })
        .then(()=>{dispatch(refreshPets({petId:null}))})
        .catch(
            e => {console.log(e);dispatch(petsLoading(false))}
        )
    }
}

function activePet(pet) {
    return {
        type: PET_ACTIVE,
        payload: pet
    }
}

function listPets(petId=null) {
    return (dispatch) => {
        const endpoint = `${API_URL}/pets`;
        dispatch(petsLoading(true));
        fetch(endpoint, { method: 'GET', mode: "cors", })
            .then(res => {
                res.json().then((json) => {
                    dispatch(pets(json.pets));
                    if(!isNullOrUndefined(petId)){
                        let pet = json.pets.find((pet)=>{return pet.id===petId})
                        dispatch(selectPet({pet}))
                    }
                }).catch(e => { console.log(e) })
            })
            .catch(e => { console.log(e)})
            .finally(()=>{dispatch(petsLoading(false))})
    }
}


export function petsLoading(bool) {
    return {
        type: PETS_LOADING,
        payload: bool
    }
}


export function pets(petsList) {
    return {
        type: PETS,
        payload: petsList
    }
}