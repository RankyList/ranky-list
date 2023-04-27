package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "0uxolnvwwz0sr78",
			"created": "2023-04-27 12:39:31.411Z",
			"updated": "2023-04-27 12:39:31.411Z",
			"name": "tierlists",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "ljka6qoe",
					"name": "name",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": 2,
						"max": 200,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "jikgvmi4",
					"name": "slug",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": 1,
						"max": 300,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "bxmhd7pi",
					"name": "description",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": 0,
						"max": 2000,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "4z69a2ab",
					"name": "public",
					"type": "bool",
					"required": false,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "hb3xglvk",
					"name": "canBeTemplate",
					"type": "bool",
					"required": false,
					"unique": false,
					"options": {}
				},
				{
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
				}
			],
			"indexes": [],
			"listRule": "",
			"viewRule": "",
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("0uxolnvwwz0sr78")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
