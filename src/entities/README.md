This folder is used when we are making some class (or constructor functions) for data that is comming from API. For example:

```javascript
class User {
  constructor(user) {
    this.id = user.userId;
    this.name = user.name;
    this.email = user.email;
    this.about = user.about;
    this.avatarUrl = user.avatarUrl;
    this.postsCount = user.postsCount;
    this.commentsCount = user.commentsCount;
  }
}

export default User;
```
