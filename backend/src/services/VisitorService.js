const visitorRepository = require('../repositories/VisitorRepository');

class VisitorService {
  /**
   * Resident pre-approves a visitor
   */
  async preApproveVisitor(visitorData) {
    const { host_resident_id, name, contact_number, purpose, expected_arrival } = visitorData;

    if (!host_resident_id || !name) {
      throw new Error('Host Resident ID and Visitor name are required');
    }

    const visitorId = await visitorRepository.create({
      host_resident_id,
      name,
      contact_number,
      purpose,
      expected_arrival,
      status: 'Expected'
    });

    return await visitorRepository.findById(visitorId);
  }

  /**
   * Security logs visitor entry
   */
  async logEntry(visitorId) {
    const visitor = await visitorRepository.findById(visitorId);
    if (!visitor) {
      throw new Error('Visitor record not found');
    }

    await visitorRepository.update(visitorId, {
      status: 'Checked-In',
      actual_entry: new Date()
    });

    return await visitorRepository.findById(visitorId);
  }

  /**
   * Security logs visitor exit
   */
  async logExit(visitorId) {
    const visitor = await visitorRepository.findById(visitorId);
    if (!visitor) {
      throw new Error('Visitor record not found');
    }

    if (visitor.status !== 'Checked-In') {
      throw new Error('Visitor is not currently checked-in');
    }

    await visitorRepository.update(visitorId, {
      status: 'Checked-Out',
      exit_time: new Date()
    });

    return await visitorRepository.findById(visitorId);
  }

  /**
   * Get visitor history for a resident
   */
  async getResidentVisitors(residentId) {
    return await visitorRepository.findByResidentId(residentId);
  }

  /**
   * Get today's expected and active visitors for Security Guard
   */
  async getSecurityDashboard() {
    const expectedToday = await visitorRepository.findExpectedToday();
    const activeVisitors = await visitorRepository.findActiveVisitors();

    return {
      expectedToday,
      activeVisitors
    };
  }
}

module.exports = new VisitorService();
