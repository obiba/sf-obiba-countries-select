Schema Form ui-select Add-on
============================
 
**sf-obiba-countries-ui-select** add-on 

Installation
------------

```
$ bower install sf-obiba-countries-ui-select --save
```

Alternatively:

```
$ bower install https://github.com/obiba/sf-obiba-countries-ui-select.git#<release-number> --save
```


Make sure to include `sf-obiba-countries-ui-select.min.js` in your index file and load the module in your application:

```
var myModule = angular.module('myModule', [
 ...
 'sfObibaCountriesUiSelect',
]);
```

Usage
-----

The Schema:

```
"countries": {
  "type": "object",
  "properties": {
    "name": {
      "type": "array",
      "format": "obibaCountriesUiSelect",
      "title": "Name",
      "description": "Name or alias"
    }
  }
}
```

The Definition:

```
{
  "type":"obibaCountriesUiSelect",
  "key":"countries"
}
```

The Options

To populate the ui-select auto complete list you need to pass them to the form default options:

```
$scope.sfOptions = {formDefaults: { items: [{value: value1, label: label1}, ...]}};
```


