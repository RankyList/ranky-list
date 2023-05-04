package migrations

import (
	"os"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db)
		
		admin := models.Admin{
			Avatar: 1,
			Email:  os.Getenv("DB_USER"),
		}
		admin.SetPassword(os.Getenv("DB_PASS"))
		admin.IsNew()
		
		if err := dao.SaveAdmin(&admin); err != nil {
			return err
		}

		return nil
	}, func(db dbx.Builder) error {
		// add down queries...

		return nil
	})
}
