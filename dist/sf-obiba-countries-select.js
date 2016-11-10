angular.module("sfObibaCountriesUiSelectTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("src/templates/sf-obiba-countries-select.html","<div ng-controller=\"sfObibaCountriesUiSelectController\" schema-validate=\"form\" sf-field-model>\n  <form-ui-select ng-if=\"locales && locales.length > 1\"\n                  title=\"form.title\"\n                  show-title=\"!form.notitle\"\n                  items=\"data[selectedLocale]\"\n                  auto-complete=\"form.autoComplete\"\n                  sf-field-model=\"replaceAll\"\n                  model=\"$$value$$\"\n                  description=\"form.description\"></form-ui-select>\n</div>\n");}]);
angular.module('sfObibaCountriesUiSelect', [
  'schemaForm',
  'ui.select',
  'ngObiba',
  'sfObibaCountriesUiSelectTemplates'
]).config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider, sfPathProvider) {

    var sfObibaCountriesUiSelect = function (name, schema, options) {
      if (schema.type === 'array' && schema.format == 'obibaCountriesUiSelect') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'obibaCountriesUiSelect';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.array.unshift(sfObibaCountriesUiSelect);

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',           // Name of the decorator you want to add to.
      'obibaCountriesUiSelect',                      // Form type that should render this add-on
      'src/templates/sf-obiba-countries-select.html',  // Template name in $templateCache
      sfBuilderProvider.stdBuilders   // List of builder functions to apply.
    );

  }])
  .controller('sfObibaCountriesUiSelectController', ['$scope', 'ObibaCountriesIsoCodes', function ($scope, ObibaCountriesIsoCodes) {
    console.log(obibaCountryCodes);
    console.log("éééêêêêê");
    $scope.data = obibaCountryCodes;
    $scope.locales = $scope.data ? Object.keys($scope.data) : [];

    $scope.$watch('ngModel.$modelValue', function () {
      if ($scope.ngModel.$validate) {
        // Make sure that allowInvalid is always true so that the model is preserved when validation fails
        $scope.ngModel.$options = $scope.ngModel.$options || {};
        $scope.ngModel.$options = {allowInvalid: true};
        $scope.ngModel.$validate();
        if ($scope.ngModel.$invalid) { // The field must be made dirty so the error message is displayed
          $scope.ngModel.$dirty = true;
          $scope.ngModel.$pristine = false;
        }
      }
      else {
        $scope.ngModel.$setViewValue(ngModel.$viewValue);
      }
    }, true);

    $scope.$watch('form', function () {
      if ($scope.form) {
        console.log('existingLocales',$scope.locales);
        $scope.form.disableErrorState = $scope.form.hasOwnProperty('readonly') && $scope.form.readonly;
        $scope.selectedLocale = $scope.form.locales && $scope.form.locales.length > 0 ? $scope.form.locales[0] : 'en';
      }
    });

    $scope.$on('sfLocalizedStringLocaleChanged', function (event, locale) {
      $scope.selectedLocale = locale;
    });

  }]);
