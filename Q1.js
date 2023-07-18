// @TODO: This is the model/class you should work out
/* var User; */
var data = [];
function loadSampleData() {
	var xhr = new XMLHttpRequest();
  xhr.open('GET', 'sampleData.json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      data = JSON.parse(xhr.responseText);
    }
  };
  xhr.send();
}
loadSampleData();
class User {
  constructor() {
    this.selectedFields = undefined;
    this.attributeFields = [];
    this.whereCondition = {};
    this.orderByFields = [];
  }

  select(field) {
    this.selectedFields = field;
    return this;
  }

  attributes(fields) {
    this.attributeFields = fields;
    return this;
  }

  where(condition) {
    this.whereCondition = condition;
    return this;
  }

  order(fields) {
    this.orderByFields = fields;
    return this;
  }
  
  filter() {
  	let res = data;
    if (this.selectedFields) {
    	res = _.get(res, this.selectedFields);
    }
    if (Object.keys(this.whereCondition).length) {
    	res = _.filter(res, this.whereCondition)
    }
    if (this.orderByFields.length) {
    	const direcitons = Array(this.orderByFields.length).fill('asc');
      res = _.orderBy(res, this.orderByFields, direcitons);
    }
    if (this.attributeFields.length) {
    	res = res.map(item => _.pick(item, this.attributeFields))
    }
    
    return res
  }
  
  findAll() {
  	const res = this.filter()
  	return Promise.resolve(res);
  }
  
  findOne() {
  	const res = this.filter()
  	return Promise.resolve(res[0]);
  }
}
// ------------------------------------------
// You shouldn't need to edit below this line

var user = new User({
	id: 123
});


// Mimic what a ORM-like query engine would do by filtering the
// "sampleData" based on the query and the expected result example.
// Hint: lodash can be quite handly in dealing with this.
user
	.select('apps')
  .attributes(['id', 'title'])
  .where({ published: true })
  .order(['title'])
  .findAll()
  .then(function (apps) {
    // The expected result is for the "apps" array is:
    // [ { id: 6, title: 'Et' }, { id: 1, title: 'Lorem' } ]
    console.log(apps);
  })
  
user
	.select('organizations')
  .attributes(['name'])
  .where({ suspended: false })
  .findOne()
  .then(function (organization) {
    // The expected result is for the "organization" object is:
    // { id: 3, name: 'Fliplet' }
    console.log(organization);
  })