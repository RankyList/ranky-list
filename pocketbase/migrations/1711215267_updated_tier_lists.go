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

		collection, err := dao.FindCollectionByNameOrId("0uxolnvwwz0sr78")
		if err != nil {
			return err
		}

		collection.Name = "tierLists"

		json.Unmarshal([]byte(`[
			"CREATE INDEX ` + "`" + `idx_C79cqRc` + "`" + ` ON ` + "`" + `tierLists` + "`" + ` (\n  ` + "`" + `slug` + "`" + `,\n  ` + "`" + `createdBy` + "`" + `\n)"
		]`), &collection.Indexes)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("0uxolnvwwz0sr78")
		if err != nil {
			return err
		}

		collection.Name = "tier_lists"

		json.Unmarshal([]byte(`[
			"CREATE INDEX ` + "`" + `idx_C79cqRc` + "`" + ` ON ` + "`" + `tier_lists` + "`" + ` (\n  ` + "`" + `slug` + "`" + `,\n  ` + "`" + `createdBy` + "`" + `\n)"
		]`), &collection.Indexes)

		return dao.SaveCollection(collection)
	})
}
