const user = require('./users.js');

describe('addUser', function() {
  it('should be a function', function() {
    expect(user.addUser).toBeInstanceOf(Function);
  });
});
