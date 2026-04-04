const User = require('./User');

class Security extends User {
  constructor(data = {}) {
    super(data);
    this.role = 'Security';
  }

  /**
   * Security specifically monitors entries
   */
  canLogVisitors() {
    return true;
  }
}

module.exports = Security;
