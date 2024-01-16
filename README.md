# firefox-extension-inst
A Firefox extension to browse Instagram

Open page in Firefox:
about:debugging#/runtime/this-firefox

Click Load Temporary Add-on

Select manifest.json

Open another tab and change the form factor to mobile

Open https://www.instagram.com/xxxxxxxxxxxxxxxx/feed in that tab and the first five post should be sent to the server API.

In the dev console, for success:

Object { message: "Success" }

one for each post

For error:

Object { message: "Source already exists" }
