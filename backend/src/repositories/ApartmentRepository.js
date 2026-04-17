const BaseRepository = require('./BaseRepository');

class ApartmentRepository extends BaseRepository {
  constructor() {
    super('APARTMENTS', 'apartment_id');
  }
}

module.exports = new ApartmentRepository();
