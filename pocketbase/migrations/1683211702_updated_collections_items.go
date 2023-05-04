package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db)

		if _, err := dao.DB().Update("_collections", dbx.Params{ "slug": "username" }, dbx.HashExp{"id": "_pb_users_auth_"}).Execute(); err != nil {
			return err
		}

		if _, err := dao.DB().Update("_collections", dbx.Params{ "slug": "name" }, dbx.Not(dbx.HashExp{"id": "_pb_users_auth_"})).Execute(); err != nil {
			return err
		}

		return nil
	}, func(db dbx.Builder) error {
		// add down queries...

		return nil
	})
}
