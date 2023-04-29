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
			"id": "bdhlowmnbwukpxl",
			"created": "2023-04-27 12:39:31.409Z",
			"updated": "2023-04-27 12:39:31.409Z",
			"name": "items",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "d1mhzs2g",
					"name": "name",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": 1,
						"max": 100,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "awq3vzbr",
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
					"id": "krdnoa5u",
					"name": "position",
					"type": "number",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null
					}
				},
				{
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
				}
			],
			"indexes": [],
			"listRule": "",
			"viewRule": "",
			"createRule": "",
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

		collection, err := dao.FindCollectionByNameOrId("bdhlowmnbwukpxl")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
