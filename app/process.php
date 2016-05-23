<?php

  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(-1);

  $payload = json_decode(file_get_contents('php://input'));

  if ($payload) {
      @$wTemp    = $payload->wTemp;
      @$wSummary = $payload->wSummary;
      @$wAlert   = $payload->wAlert;
      @$sQuote   = $payload->stockQuote;
      @$sChange  = $payload->stockChange;
      @$sChangeP = $payload->stockChangeP;

      $basepath            = 'output';
      $output_weather      = trim($basepath.'/'.'output_weather.txt');
      $output_wSummary     = trim($basepath.'/'.'output_wSummary.txt');
      $output_wAlert       = trim($basepath.'/'.'output_wAlert.txt');
      $output_stockQuote   = trim($basepath.'/'.'output_stockQuote.txt');
      $output_stockChange  = trim($basepath.'/'.'output_stockChange.txt');
      $output_stockChangeP = trim($basepath.'/'.'output_stockChangeP.txt');

      function check_and_write($final_path, $data, $flags = 0)
      {
          if (!is_dir(dirname($final_path))) {

              // Path does not exist. Creating.
              mkdir(dirname($final_path), 0777, true) or die("Error creating path!");

              // Path created. Writing files.
              return file_put_contents($final_path, $data);
          } else {

              // Path exists. Writing files.
              return file_put_contents($final_path, $data);
          }
      }

      if (isset($wTemp)) {
          check_and_write($output_weather, $wTemp);
      }
      if (isset($wSummary)) {
          check_and_write($output_wSummary, $wSummary);
      }
      if (isset($wAlert)) {
          check_and_write($output_wAlert, $wAlert);
      }
      if (isset($sQuote)) {
          check_and_write($output_stockQuote, $sQuote);
      }
      if (isset($sChange)) {
          check_and_write($output_stockChange, $sChange);
      }
      if (isset($sChangeP)) {
          check_and_write($output_stockChangeP, $sChangeP);
      }
  } else {
      error_log('No data. Shutting down!');
      exit;
  }
