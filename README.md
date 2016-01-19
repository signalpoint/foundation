# foundation

> The DrupalGap module for Foundation, built upon Foundation for Sites.

- http://foundation.zurb.com/sites/docs/

## Installation

1. Download Foundation 6 for Sites: http://foundation.zurb.com/sites/download/assets/complete-f6.zip
2. Extract the `css` directory from the zip file into the app's `www` directory

The file system will look something like this:

```
index.html       # DrupalGap's default index.html file
drupalgap.min.js # The DrupalGap Binary
jdrupal.min.js   # The jDrupal Binary
css/             # Foundation 6 CSS
...              # A bunch of other files...
```

3. Include the `foundation.css` file in the `<head>` of your app's `index.html` file

```
<!-- Foundation CSS -->
<link rel="stylesheet" href="css/foundation.css" />
```
