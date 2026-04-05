const Admin = require('./Admin');
const Resident = require('./Resident');
const Staff = require('./Staff');
const Security = require('./Security');

class UserFactory {
  /**
   * Factory method to create a user instance based on their role
   */
  static create(data) {
    const role = data.role ? data.role.toLowerCase() : 'resident';

    switch (role) {
      case 'admin':
        return new Admin(data);
      case 'resident':
        return new Resident(data);
      case 'staff':
      case 'maintenance staff':
        return new Staff(data);
      case 'security':
      case 'security guard':
        return new Security(data);
      default:
        throw new Error(`Invalid user role provided: ${data.role}`);
    }
  }
}

module.exports = UserFactory;
