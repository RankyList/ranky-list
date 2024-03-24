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

		collection, err := dao.FindCollectionByNameOrId("bdhlowmnbwukpxl")
		if err != nil {
			return err
		}

		// add
		new_tierList := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "tupaapcc",
			"name": "tierList",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "0uxolnvwwz0sr78",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), new_tierList)
		collection.Schema.AddField(new_tierList)

		// update
		edit_rank := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "jlwvewrl",
			"name": "rank",
			"type": "relation",
			"required": false,
			"unique": false,
			"options": {
				"collectionId": "sf00q2lme3knpnc",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_rank)
		collection.Schema.AddField(edit_rank)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("bdhlowmnbwukpxl")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("tupaapcc")

		// update
		edit_rank := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "jlwvewrl",
			"name": "rank",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "sf00q2lme3knpnc",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_rank)
		collection.Schema.AddField(edit_rank)

		return dao.SaveCollection(collection)
	})
}
