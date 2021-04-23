package pets

import (
	"github.com/jinzhu/gorm"
	"github.com/scottwinkler/vanilla-webserver-src/server/model/pet"
)

//DeletePetRequest request struct
type DeletePetRequest struct {
	ID string
}

//DeletePetResponse response struct
type DeletePetResponse struct {
}

//DeletePet deletes a pet from database
func DeletePet(db *gorm.DB, req *DeletePetRequest) (*DeletePetResponse, error) {
	err := pet.Delete(db, req.ID)
	res := &DeletePetResponse{}
	return res, err
}
