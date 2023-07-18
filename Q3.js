function parse(inputArray) {
  // @TODO
  // 1. retrieve list from https://api.fliplet.com/v1/widgets/assets
  // 		note: you may need to use a CORS proxy
  // 2. parse the inputArray into a list of assets using the above list
  var results = [];
  var data;

	var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.fliplet.com/v1/widgets/assets', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      data = JSON.parse(xhr.responseText);
      if(data) {
        inputArray.map(inputKey => {
        	if(data.assets[inputKey].dependencies) {
          	results = results.concat(data.assets[inputKey].dependencies);
          }
        });
      }
    } else {
    	console.error('Request failed. Status:', xhr.status);
  	}
  };
  xhr.send();
  return Promise.resolve(results);
}


parse(['bootstrap', 'fliplet-core', 'moment', 'jquery']).then(function (assets) {
  /*
   
   assets is expected to be an array with the
   following values in the same order as here:
   
   [
   	 "fonts/glyphicons-halflings-regular.ttf",
		 "fonts/glyphicons-halflings-regular.woff",
		 "fonts/glyphicons-halflings-regular.woff2",
     'bootstrap-css.bundle.css',
     'bootstrap-js.bundle.js',
     'jquery.js',
   	 'fliplet-core.bundle.css',
		 'fliplet-core.bundle.js',
     'moment.min.js'
   ]
   
   */
   
   console.log('The list is', assets);
});