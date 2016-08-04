var acl = require('./acl');

// Tests

console.log('Beginning Tests');
var errorCount = 0;

var group1 = new acl.Group();
var group2 = new acl.Group();
var group3 = new acl.Group();

var resource1 = new acl.Resource();
var resource2 = new acl.Resource();
var resource3 = new acl.Resource();

// getId()
var myUser = new acl.User();
var test1 = myUser.getId().length === 36;
if (!test1) console.log((++errorCount).toString() + '.', 'Failed test ', 1);

// getUserGroups(), addUserGroup(groupId), and removeUserGroup(groupId)
var myUser2 = new acl.User();

var test2 = myUser2.getUserGroups().length === 0;
if (!test2) console.log((++errorCount).toString() + '.', 'Failed test ', 2);

myUser2.addUserGroup(group1.getId());
myUser2.addUserGroup(group1.getId());
var test3 = JSON.stringify(myUser2.getUserGroups()) ===
            JSON.stringify([group1.getId()]);
if (!test3) console.log((++errorCount).toString() + '.', 'Failed test ', 3);

myUser2.addUserGroup(group2.getId());
myUser2.addUserGroup(group3.getId());
myUser2.removeUserGroup(group2.getId());
myUser2.removeUserGroup(group2.getId());
var test4 = JSON.stringify(myUser2.getUserGroups()) ===
            JSON.stringify([group1.getId(), group3.getId()]);
if (!test4) console.log((++errorCount).toString() + '.', 'Failed test ', 4);

// grantReadPermission(resourceId), canRead(resourceId),
// and revokeReadPermission(resourceId)
var myUser3 = new acl.User();

var test5 = myUser3.canRead(resource1.getId()) === false;
if (!test5) console.log((++errorCount).toString() + '.', 'Failed test ', 5);

myUser3.grantReadPermission(resource1.getId());
myUser3.revokeWritePermission(resource1.getId());
var test6 = myUser3.canRead(resource1.getId()) === true;
if (!test6) console.log((++errorCount).toString() + '.', 'Failed test ', 6);

myUser3.revokeReadPermission(resource1.getId());
var test7 = myUser3.canRead(resource1.getId()) === false;
if (!test7) console.log((++errorCount).toString() + '.', 'Failed test ', 7);

// grantWritePermission(resourceId) and canWrite(resourceId),
// and revokeWritePermission(resourceId)
var myUser4 = new acl.User();

var test8 = myUser4.canWrite(resource2.getId()) === false;
if (!test8) console.log((++errorCount).toString() + '.', 'Failed test ', 8);

myUser4.grantWritePermission(resource2.getId());
myUser4.revokeReadPermission(resource2.getId());
var test9 = myUser4.canWrite(resource2.getId()) === true;
if (!test9) console.log((++errorCount).toString() + '.', 'Failed test ', 9);

myUser4.revokeWritePermission(resource2.getId());
var test10 = myUser4.canWrite(resource2.getId()) === false;
if (!test10) console.log((++errorCount).toString() + '.', 'Failed test ', 10);

// revokePermissions
var myUser5 = new acl.User();
myUser5.canWrite(resource1.getId());
myUser5.canRead(resource1.getId());
myUser5.revokePermissions(resource1.getId());

var test11 = (myUser5.canWrite(resource1.getId()) ||
              myUser5.canRead(resource1.getId()) === false);
if (!test11) console.log((++errorCount).toString() + '.', 'Failed test ', 11);

// toJSON()
var myUser6 = new acl.User();
var myUser7 = new acl.User();

var myObject = {
  id: myUser6.getId(),
  userGroups: [],
  resources: {}
};

var test12 = (myUser6.toJSON() === JSON.stringify(myObject)) === true;
if (!test12) console.log((++errorCount).toString() + '.', 'Failed test ', 12);

var test13 = (myUser7.toJSON() === JSON.stringify(myObject)) === false;
if (!test13) console.log((++errorCount).toString() + '.', 'Failed test ', 13);

var resources = {};
resources[resource1.getId()] = ['read', 'write'];

var myObject2 = {
  id: myUser6.getId(),
  userGroups: [group1.getId(), group2.getId()],
  resources: resources
};

var myObject3 = {
  id: myUser7.getId(),
  userGroups: [group1.getId(), group2.getId()],
  resources: resources
};

// grant read then write
myUser6.addUserGroup(group1.getId());
myUser6.addUserGroup(group2.getId());
myUser6.grantReadPermission(resource1.getId());
myUser6.grantWritePermission(resource1.getId());

var test14 = (myUser6.toJSON() === JSON.stringify(myObject2)) === true;
if (!test14) console.log((++errorCount).toString() + '.', 'Failed test ', 14);

// grant write then read
myUser7.addUserGroup(group1.getId());
myUser7.addUserGroup(group2.getId());
myUser7.grantWritePermission(resource1.getId());
myUser7.grantReadPermission(resource1.getId());

var test15 = (myUser7.toJSON() === JSON.stringify(myObject3)) === true;
if (!test15) console.log((++errorCount).toString() + '.', 'Failed test ', 15);

console.log('Testing complete, passed (', 15-errorCount, '/', 15, ') specs');
