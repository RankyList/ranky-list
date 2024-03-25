package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("sf00q2lme3knpnc")
		if err != nil {
			return err
		}

		// update
		edit_tierList := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ai8coksm",
			"name": "tierList",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "0uxolnvwwz0sr78",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_tierList)
		collection.Schema.AddField(edit_tierList)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("sf00q2lme3knpnc")
		if err != nil {
			return err
		}

		// update
		edit_tierList := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ai8coksm",
			"name": "tierlist",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "0uxolnvwwz0sr78",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_tierList)
		collection.Schema.AddField(edit_tierList)

		return dao.SaveCollection(collection)
	})
}