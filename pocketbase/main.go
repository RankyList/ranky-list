package main

import (
	"fmt"
	"log"
	"os"

	_ "github.com/RankyList/ranky-list/migrations"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, &migratecmd.Options{
		Automigrate: true,
	})

	fmt.Println(os.Getenv("DB_USER"))
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
