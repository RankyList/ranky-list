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

		collection, err := dao.FindCollectionByNameOrId("0uxolnvwwz0sr78")
		if err != nil {
			return err
		}

		// update
		edit_createdBy := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "rqkfegky",
			"name": "createdBy",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_createdBy)
		collection.Schema.AddField(edit_createdBy)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("0uxolnvwwz0sr78")
		if err != nil {
			return err
		}

		// update
		edit_createdBy := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "rqkfegky",
			"name": "createdBy",
			"type": "relation",
			"required": false,
			"unique": false,
			"options": {
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_createdBy)
		collection.Schema.AddField(edit_createdBy)

		return dao.SaveCollection(collection)
	})
}
