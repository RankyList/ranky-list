package main

import (
	"log"

	_ "github.com/RankyList/ranky-list/migrations"
	"github.com/RankyList/ranky-list/slugify"
	"github.com/gosimple/slug"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, &migratecmd.Options{
		Automigrate: true,
	})

	app.OnRecordBeforeCreateRequest().Add(func(e *core.RecordCreateEvent) error {
		collection, err := slugify.New(app.Dao(), e.Record)
		if err != nil {
			return err
		}

		if collection.Slug != "" {
			e.Record.Set("slug", slug.Make(e.Record.Get(collection.Slug).(string)))
		}

		return nil
	})

	app.OnRecordBeforeUpdateRequest().Add(func(e *core.RecordUpdateEvent) error {
		collection, err := slugify.New(app.Dao(), e.Record)
		if err != nil {
			return err
		}

		if collection.Slug != "" {
			e.Record.Set("slug", slug.Make(e.Record.Get(collection.Slug).(string)))
		}

        return nil
    })

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
