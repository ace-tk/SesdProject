const BaseRepository = require('./BaseRepository');

class StaffRepository extends BaseRepository {
  constructor() {
    super('STAFF', 'staff_id');
  }
}

module.exports = new StaffRepository();
