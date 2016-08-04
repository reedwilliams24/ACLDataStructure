// Universally Unique Identifier (version 4)

function generateUUID () {
  var segmentLengths = [8,4,4,4,12];
  var result = [];

  segmentLengths.forEach(function(segmentLength){
    var segment = [];
    var count = 0;

    while (count < segmentLength){
      segment.push(randomHexDigit());
      count += 1;
    }

    result.push(segment);
  });

  result[2][0] = '4';
  result[3][0] = ['8','9','a','b'][Math.floor(Math.random() * 4)];

  return result.map(function(segment){
    return segment.join('');
  }).join('-');
}

function randomHexDigit () {
  var randomNumber = Math.floor(Math.random() * (36));
  var digit;

  // 0-9 = '0'-'9' and 10-36 = 'a'-'z'
  if (randomNumber < 10){
    digit = randomNumber.toString();
  } else {
    randomNumber += (87);
    digit = String.fromCharCode(randomNumber);
  }

  return digit;
}

// User

function User () {
  this.id = generateUUID();
  this.userGroups = {};
  this.resources = {};
}

User.prototype.getId = function () {
  return this.id;
};

User.prototype.getUserGroups = function () {
  return Object.keys(this.userGroups);
};

User.prototype.addUserGroup = function (groupId) {
  this.userGroups[groupId] = true;
};

User.prototype.removeUserGroup = function (groupId) {
  delete this.userGroups[groupId];
};

User.prototype.getResources = function () {
  return this.resources;
};

User.prototype.grantReadPermission = function (resourceId) {
  var resource = this.resources[resourceId];

  if (resource === undefined){
    this.resources[resourceId] = ['read'];
  } else if (resource.indexOf('read') === -1) {
    resource.unshift('read');
  }
};

User.prototype.grantWritePermission = function (resourceId) {
  var resource = this.resources[resourceId];

  if (resource === undefined){
    this.resources[resourceId] = ['write'];
  } else if (resource.indexOf('write') === -1) {
    resource.push('write');
  }
};

User.prototype.revokeReadPermission = function (resourceId) {
  var resource = this.resources[resourceId];
  if (resource === undefined) return;

  var idx = resource.indexOf('read');
  if (idx === -1) return;

  // delete resource if user does not have read or write access
  if (resource.length === 1){
    delete this.resources[resourceId];
  } else {
    resource.splice(idx, 1);
  }
};

User.prototype.revokeWritePermission = function (resourceId) {
  var resource = this.resources[resourceId];
  if (resource === undefined) return;

  var idx = resource.indexOf('write');
  if (idx === -1) return;

  // delete resource if user does not have read or write access
  if (resource.length === 1){
    delete this.resources[resourceId];
  } else {
    resource.splice(idx, 1);
  }
};

User.prototype.revokePermissions = function (resourceId) {
  delete this.resources[resourceId];
};

User.prototype.canRead = function (resourceId) {
  if (this.resources[resourceId] === undefined){
    return false;
  } else if (this.resources[resourceId].indexOf('read') === -1){
    return false;
  } else {
    return true;
  }
};

User.prototype.canWrite = function (resourceId) {
  if (this.resources[resourceId] === undefined){
    return false;
  } else if (this.resources[resourceId].indexOf('write') === -1){
    return false;
  } else {
    return true;
  }
};

User.prototype.toJSON = function () {
  var userObject = {
    id: this.getId(),
    userGroups: this.getUserGroups(),
    resources: this.getResources()
  };

  return JSON.stringify(userObject);
};

// Group

function Group () {
  this.id = generateUUID();
}

Group.prototype.getId = function () {
  return this.id;
};

// Resource

function Resource () {
  this.id = generateUUID();
}

Resource.prototype.getId = function () {
  return this.id;
};

module.exports = {
  User,
  Group,
  Resource
};
