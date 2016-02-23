# foundation

> The DrupalGap module for Foundation, built upon Foundation for Sites.

- http://foundation.zurb.com/sites/docs/

## Installation

First, download Foundation 6 for sites:

- http://foundation.zurb.com/sites/download/assets/complete-f6.zip

Then extract the `css` directory from the zip file into the app's `www` directory.

The file system will look something like this:

```
index.html       # DrupalGap's default index.html file
drupalgap.min.js # The DrupalGap Binary
jdrupal.min.js   # The jDrupal Binary
css/             # Foundation 6 CSS
...              # A bunch of other files...
```

Then include these two files in the `<head>` of your app's `index.html` file:

```
<!-- DrupalGap Modules -->
<script src="modules/contrib/foundation/foundation.js"></script>

<!-- Foundation CSS -->
<link rel="stylesheet" href="css/foundation.min.css" />
```
