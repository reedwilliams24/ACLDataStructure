# ACL Data Structure

Create an ACL data structure as JS objects that represent:
- user
- user group
- resource
- resource permissions

Each user, group and resource is identified by an UUID (v. 4)

User Functions:
- getId()
- getUserGroups()
- addUserGroup(groupId)
- removeUserGroup(groupId)
- getResources()
- grantReadPermission(resourceId)
- grantWritePermission(resourceId)
- revokeReadPermission(resourceId)
- revokeWritePermission(resourceId)
- revokePermissions(resourceId)
- canRead(resourceId)
- canWrite(resourceId)
- toJSON()
