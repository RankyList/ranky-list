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
		jsonData := `[
			{
				"id": "bdhlowmnbwukpxl",
				"created": "2023-04-27 12:39:31.409Z",
				"updated": "2023-05-04 14:45:23.467Z",
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
					},
					{
						"system": false,
						"id": "j6s6drka",
						"name": "slug",
						"type": "text",
						"required": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
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
			},
			{
				"id": "sf00q2lme3knpnc",
				"created": "2023-04-27 12:39:31.410Z",
				"updated": "2023-05-04 14:45:23.467Z",
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
					},
					{
						"system": false,
						"id": "swrzebg1",
						"name": "slug",
						"type": "text",
						"required": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
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
			},
			{
				"id": "0uxolnvwwz0sr78",
				"created": "2023-04-27 12:39:31.411Z",
				"updated": "2023-05-04 14:45:23.469Z",
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
			},
			{
				"id": "_pb_users_auth_",
				"created": "2023-05-04 14:31:53.081Z",
				"updated": "2023-05-04 14:45:23.470Z",
				"name": "users",
				"type": "auth",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "users_avatar",
						"name": "avatar",
						"type": "file",
						"required": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/png",
								"image/jpeg",
								"image/gif"
							],
							"thumbs": [],
							"protected": false
						}
					},
					{
						"system": false,
						"id": "kdgiytut",
						"name": "websites",
						"type": "json",
						"required": false,
						"unique": false,
						"options": {}
					},
					{
						"system": false,
						"id": "uf5qfpti",
						"name": "slug",
						"type": "text",
						"required": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					}
				],
				"indexes": [],
				"listRule": "id = @request.auth.id",
				"viewRule": "id = @request.auth.id",
				"createRule": "",
				"updateRule": "id = @request.auth.id",
				"deleteRule": "id = @request.auth.id",
				"options": {
					"allowEmailAuth": true,
					"allowOAuth2Auth": true,
					"allowUsernameAuth": true,
					"exceptEmailDomains": [],
					"manageRule": null,
					"minPasswordLength": 8,
					"onlyEmailDomains": [],
					"requireEmail": false
				}
			}
		]`

		collections := []*models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collections); err != nil {
			return err
		}

		return daos.New(db).ImportCollections(collections, true, nil)
	}, func(db dbx.Builder) error {
		return nil
	})
}
