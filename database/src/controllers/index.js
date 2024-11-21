const { catched_async } = require('../utils');
const create_record = require('./create_record');
const patch_record = require('./patch_record');
const put_records = require('./put_record');
const search_records = require('./search_records');
// const mid_perfil = require('./mid_perfil');

module.exports = {
  create_record: catched_async(create_record),
  patch_record: catched_async(patch_record),
  search_records: catched_async(search_records),
  put_records: catched_async(put_records),
  // mid_perfil: catched_async(mid_perfil),
};
