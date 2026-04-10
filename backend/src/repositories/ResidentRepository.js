const BaseRepository = require('./BaseRepository');

class ResidentRepository extends BaseRepository {
  constructor() {
    super('RESIDENTS', 'resident_id');
  }
}

module.exports = new ResidentRepository();
