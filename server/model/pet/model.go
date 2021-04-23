package pet

type Pet struct {
	ID    string `gorm:"primary_key" json:"id"`
	Name  string `json:"name"`
	Sex  string `json:"sex"`
	Species  string `json:"species"`
	Color string `json:"color"`
	Breed string `json:"breed"`
	ImageURL string `json:"imageURL"`
}
