package pets

import (
	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
	"github.com/scottwinkler/vanilla-webserver-src/server/model/pet"
)

//CreatePetRequest request struct
type CreatePetRequest struct {
	Name     string `json:"name" binding:"required"`
	Sex      string `json:"sex"`
	Species  string `json:"species"`
	Color    string `json:"color"`
	Breed    string `json:"breed"`
	ImageURL string `json:"imageURL"`
}

//CreatePetResponse response struct
type CreatePetResponse struct {
	ID string `json:"id"`
}

//CreatePet creates a pet in database
func CreatePet(db *gorm.DB, req *CreatePetRequest) (*CreatePetResponse, error) {
	uuid, _ := uuid.NewRandom()
	newPet := &pet.Pet{
		ID:       uuid.String(),
		Name:     req.Name,
		Sex:      req.Sex,
		Species:  req.Species,
		Color:    req.Color,
		Breed:    req.Breed,
		ImageURL: req.ImageURL,
	}
	id, err := pet.Create(db, newPet)
	res := &CreatePetResponse{ID: id}
	return res, err
}
