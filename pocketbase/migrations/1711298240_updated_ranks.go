package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("sf00q2lme3knpnc")
		if err != nil {
			return err
		}

		collection.ListRule = types.Pointer("tierList.public = true || tierList.createdBy.id = @request.auth.id")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("sf00q2lme3knpnc")
		if err != nil {
			return err
		}

		collection.ListRule = nil

		return dao.SaveCollection(collection)
	})
}
