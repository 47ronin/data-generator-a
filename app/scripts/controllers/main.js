'use strict';

/**
 * @ngdoc function
 * @name dataGenApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dataGenApp
 */
angular.module('dataGenApp')
  .controller('MainCtrl',
    ['$scope', '$http', '$q', function ($scope, $http, $q) {

    // Initialize everything
    var wAPIkey    = 'aa2e1ab4b00e266dd4c047b77ee8793d', // forecast.io API key
		    targetGeo  = '32.718371,-117.162531', // latitude, longitude
        wOptions   = '&exclude=minutely,hourly,daily,flags', // API exclusions
		    stationURL = 'https://api.forecast.io/forecast/' + wAPIkey +
                      '/' + targetGeo + '?callback=JSON_CALLBACK' + wOptions,
        weather    = $http.jsonp(stationURL);

    // Retrieve weather data
    $q.all([weather])
    .then(function (promise) {
      var wRaw = promise[0].data.currently;
      $scope.wTemp = Math.round(wRaw.temperature);
      $scope.wSummary = wRaw.summary;
      if (promise[0].data.alerts) {
        $scope.wAlert = promise[0].data.alerts[0].description.replace(/\\n/g,' ');
      } else {
        $scope.wAlert = '';
      }

      // Push data to PHP processor
      var payLoad = {
        wTemp    : $scope.wTemp,
        wSummary : $scope.wSummary,
        wAlert   : $scope.wAlert
      };
      $http({
        method: 'POST',
        url: 'process.php',
        data: payLoad,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      })
      .success(function () {
        console.log('Payload delivered: Weather');
      })
      .error(function () {
        console.log('Problem pushing payload: Weather');
      });
    });

  }]) // end controller MainCtrl

  .controller('StockCtrl',
    ['$scope', '$http', '$q', function ($scope, $http, $q) {

    // Initialize everything
    var symbol     = 'SRE', // stock symbol
        marketURL  = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' +
                      symbol + '&callback=JSON_CALLBACK',
        stocks     = $http.jsonp(marketURL);

    // Retrieve stock data
    $q.all([stocks])
    .then(function (promise) {
      var sRaw = promise[0].data;
      $scope.stockQuote = parseFloat(Math.round(sRaw.LastPrice * 100) / 100).toFixed(2);
      if (sRaw.Change >= 0) {
        $scope.stockChange = '+' + parseFloat(Math.round(sRaw.Change * 100) / 100).toFixed(2);
      } else {
        $scope.stockChange = parseFloat(Math.round(sRaw.Change * 100) / 100).toFixed(2);
      }
      if (sRaw.ChangePercent >=0) {
        $scope.changePercent = '+' + sRaw.ChangePercent.toFixed(2) + '%';
      } else {
        $scope.changePercent = sRaw.ChangePercent.toFixed(2) + '%';
      }

      // Push data to PHP processor
      var payLoad = {
        stockQuote   : $scope.stockQuote,
        stockChange  : $scope.stockChange,
        stockChangeP : $scope.changePercent
      };
      $http({
        method: 'POST',
        url: 'process.php',
        data: payLoad,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      })
      .success(function () {
        console.log('Payload delivered: Stocks');
      })
      .error(function () {
        console.log('Problem pushing payload: Stocks');
      });
    });

  }]); // end controller StockCtrl
