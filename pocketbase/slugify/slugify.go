package slugify

import (
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
)

type Slugify struct {
	models.Collection
	Slug string `db:"slug" json:"slug"`
}

func New(dao *daos.Dao, r *models.Record) (Slugify, error) {
	collection := Slugify{}

	if err := dao.DB().Select().Model(r.Collection().Id, &collection); err != nil {
		return collection, err
	}

	return collection, nil
}
