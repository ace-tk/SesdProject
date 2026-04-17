const userRepository = require('../repositories/UserRepository');
const residentRepository = require('../repositories/ResidentRepository');
const staffRepository = require('../repositories/StaffRepository');
const apartmentRepository = require('../repositories/ApartmentRepository');
const passwordUtils = require('../utils/passwordUtils');

class UserService {
  /**
   * Register a new user and their role-specific details
   */
  async registerUser(userData) {
    console.log(`📝 Registering new user: ${userData.username} (${userData.role})`);
    const { username, email, password, role, ...details } = userData;

    // 1. Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // 2. Hash the password
    const hashedPassword = await passwordUtils.hashPassword(password);

    // 3. Create basic user record
    const userId = await userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'Resident',
      phone_number: details.phone_number || null
    });

    // 4. Create role-specific record based on inheritance pattern
    if (role === 'Resident') {
      // Check if apartment exists
      const apartment = await apartmentRepository.findById(details.apartment_id);
      if (!apartment) {
        throw new Error('Invalid Apartment ID. Please use a valid Apartment ID (e.g., 1, 2, 3).');
      }

      await residentRepository.create({
        user_id: userId,
        apartment_id: details.apartment_id,
        is_owner: details.is_owner || false,
        move_in_date: details.move_in_date || new Date().toISOString().split('T')[0]
      });
    } else if (role === 'Staff') {
      await staffRepository.create({
        user_id: userId,
        specialization: details.specialization || 'General',
        shift_timing: details.shift_timing || '9 AM - 5 PM',
        join_date: details.join_date || new Date().toISOString().split('T')[0]
      });
    }

    // Return the created user (stripped of password)
    return await this.getUserProfile(userId, role);
  }

  /**
   * Fetch complete user profile including role-specific data
   */
  async getUserProfile(userId, role) {
    let profile = null;

    if (role === 'Resident') {
      profile = await userRepository.findDetailedResident(userId);
    } else if (role === 'Staff') {
      profile = await userRepository.findDetailedStaff(userId);
    } else {
      profile = await userRepository.findById(userId);
    }

    if (!profile) return null;

    // Remove password from response
    const { password, ...cleanProfile } = profile;
    return cleanProfile;
  }

  /**
   * Authenticate a user by email and password
   */
  async authenticate(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await passwordUtils.comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return await this.getUserProfile(user.user_id, user.role);
  }

  /**
   * Get all staff members for Admin tasks
   */
  async getAllStaff() {
    return await userRepository.findAllStaff();
  }
}

module.exports = new UserService();
