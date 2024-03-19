# Emails

Sending emails with PocketBase is very easy. However, to test emails during development, you have to make PocketBase aware of our `mailcatcher` service.

- [Emails](#emails)
  - [Testing emails in dev](#testing-emails-in-dev)
  - [Creating custom emails](#creating-custom-emails)

## Testing emails in dev

Go to [http://local.pocketbase.ranky-list.com/_/#/settings/mail](http://local.pocketbase.ranky-list.com/_/#/settings/mail), enable `Use SMTP mail server` and edit the following settings :

| Setting          | Value             |
| ---------------- | ----------------- |
| SMTP server host | `mailcatcher`     |
| Port             | `1025`            |
| TLS encryption   | `Auto (StartTLS)` |
| AUTH method      | `PLAIN (default)` |

You are done! You can now go to [http://local.mailcatcher.ranky-list.com](http://local.mailcatcher.ranky-list.com) to see sent emails.
You can send emails to any address, they will always be caught by the `mailcatcher` service.

## Creating custom emails

Check the [sending emails](https://pocketbase.io/docs/sending-emails#send-custom-email) part of the PocketBase documentation.
