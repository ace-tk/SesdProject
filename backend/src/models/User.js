class User {
  constructor(data = {}) {
    this.user_id = data.user_id || null;
    this.username = data.username || '';
    this.password = data.password || ''; // Hashed password
    this.email = data.email || '';
    this.phone_number = data.phone_number || '';
    this.role = data.role || 'Resident';
    this.created_at = data.created_at || new Date();
  }

  /**
   * Basic validation logic common to all users
   */
  validate() {
    if (!this.username || !this.email) {
      throw new Error('Username and Email are required');
    }
    return true;
  }

  /**
   * Strip sensitive data for responses
   */
  toJSON() {
    const { password, ...publicUser } = this;
    return publicUser;
  }
}

module.exports = User;
