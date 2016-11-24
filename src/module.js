angular.module('sfObibaCountriesUiSelect', [
  'schemaForm',
  'ui.select',
  'ngObiba',
  'sfObibaCountriesUiSelectTemplates'
]).config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider, sfPathProvider) {

    var sfObibaCountriesUiSelect = function (name, schema, options) {
      if (schema.type === 'array' && schema.format === 'obibaCountriesUiSelect') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'obibaCountriesUiSelect';
        f.multiple = 'multiple';
        f.autoComplete = {
          format: ':label [:value]',
            value: 'code',
            label: 'name'
        };
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.array.unshift(sfObibaCountriesUiSelect);


    var sfObibaCountriesUiSelect = function (name, schema, options) {

      if (schema.type === 'string' && schema.format === 'obibaCountriesUiSelect') {

        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'obibaCountriesUiSelect';
        f.autoComplete = {
          format: ':label [:value]',
          value: 'code',
          label: 'name'
        };
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(sfObibaCountriesUiSelect);

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',           // Name of the decorator you want to add to.
      'obibaCountriesUiSelect',                      // Form type that should render this add-on
      'src/templates/sf-obiba-countries-ui-select.html',  // Template name in $templateCache
      sfBuilderProvider.stdBuilders   // List of builder functions to apply.
    );

  }])
  .controller('sfObibaCountriesUiSelectController', ['$scope', function ($scope) {
    $scope.data = OBiBa.CountryCodes;
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
        $scope.form.disableErrorState = $scope.form.hasOwnProperty('readonly') && $scope.form.readonly;
        $scope.selectedLocale = $scope.form.locales && $scope.form.locales.length > 0 ? $scope.form.locales[0] : 'en';
      }
    });

    $scope.$on('sfLocalizedStringLocaleChanged', function (event, locale) {
      $scope.selectedLocale = locale;
    });

  }]);
