/*
Instructions:
(1) Rewrite get with the Fetch API: https://davidwalsh.name/fetch
(2) Finish the getJSON method. getJSON should take a URL and return the parsed JSON response.
  (a) getJSON needs to return a Promise!
(3) Test by console.logging the response and by passing the query string from getJSON to addSearchHeader.
(4) Handle errors by passing "unknown" to addSearchHeader.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  /**
   * XHR wrapped in a Promise using Fetch.
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url, {method: 'get'}); // this should be a Promise?
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    return new Promise(function(resolve, reject) {
      get(url)
      .then(function(response){
        console.log(response);
        resolve(JSON.parse(response).query);
      })
      .catch(function(err){
        reject(err);
      });
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    getJSON('../data/earth-like-results.json')
    .then(function(query){
      console.log(query);
      addSearchHeader(query);
    })
    .catch(function(err){
      addSearchHeader('unknown');
    })
  });
})(document);
