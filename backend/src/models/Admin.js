const User = require('./User');

class Admin extends User {
  constructor(data = {}) {
    super(data);
    this.role = 'Admin';
  }

  /**
   * Admins have full permissions
   */
  hasFullAccess() {
    return true;
  }
}

module.exports = Admin;
