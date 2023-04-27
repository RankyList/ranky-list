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
			"id": "sf00q2lme3knpnc",
			"created": "2023-04-27 12:39:31.410Z",
			"updated": "2023-04-27 12:39:31.410Z",
			"name": "ranks",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "fawyjlwr",
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
					"id": "csaqedrb",
					"name": "color",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
					}
				},
				{
					"system": false,
					"id": "b58bzjwu",
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
					"id": "pulpupb3",
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
				}
			],
			"indexes": [],
			"listRule": null,
			"viewRule": null,
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

		collection, err := dao.FindCollectionByNameOrId("sf00q2lme3knpnc")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
