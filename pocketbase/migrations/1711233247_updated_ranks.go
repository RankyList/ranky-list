package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("sf00q2lme3knpnc")
		if err != nil {
			return err
		}

		json.Unmarshal([]byte(`[
			"CREATE INDEX ` + "`" + `idx_p0rclkv` + "`" + ` ON ` + "`" + `ranks` + "`" + ` (\n  ` + "`" + `position` + "`" + `,\n  ` + "`" + `tierList` + "`" + `\n)"
		]`), &collection.Indexes)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("sf00q2lme3knpnc")
		if err != nil {
			return err
		}

		json.Unmarshal([]byte(`[]`), &collection.Indexes)

		return dao.SaveCollection(collection)
	})
}
