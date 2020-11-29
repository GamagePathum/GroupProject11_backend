const pool = require("../../config/database");

module.exports = {
  InsertPaymetPostToBenifisher: (data, callBack) => {
    console.log(data);
    pool.query(
      "INSERT INTO `payments_post_office_to_benifishers`( `elder_id`,`divisional_payment_id`, `district_id`, `divisional_id`, `post_office_id`, `agent_id`, `year`, `month`,`money_amount`, `ajent_available`)SELECT elder.elder_id, ? , elder.district_id, elder.divisional_secratory_id,elder.near_post_office_id, (SELECT agent.agent_id FROM agent WHERE agent.elder_id = elder.elder_id and agent.is_deleted = '0') as 'agent',? , ?, '1900' , IF((SELECT agent.agent_id FROM agent WHERE agent.elder_id = elder.elder_id and agent.is_deleted = '0') IS Null, '0', '1') as ajent_available FROM`elder`, `benifesher` WHERE elder.elder_id = benifesher.elder_id AND elder.is_deleted = '0' and benifesher.is_deleted = '0' AND elder.near_post_office_id = ? ",
      [data.divisional_payment_id, data.year, data.month, data.post_office_id],
      (error, results, fields) => {
        if (error) {
          console.log(results);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getBenifisherPayemtList: (callBack) => {
    pool.query(
      "SELECT * FROM `payments_post_office_to_benifishers` ",
      [],
      (error, results, fields) => {
        if (error) {
          console.log(results);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getBenifisherPayemtListByDivision: (data, callBack) => {
    pool.query(
      "SELECT payments_post_office_to_benifishers.payment_id ,elder.elder_id, elder.name , payments_post_office_to_benifishers.money_amount , IF(ajent_available = 1, 'Available', 'No') AS ajent_available, IF(is_taken_money = 1, 'Available', 'No') AS is_taken_money , elder.nic_id ,elder.number FROM `payments_post_office_to_benifishers` ,`elder` WHERE elder.elder_id = payments_post_office_to_benifishers.elder_id and elder.divisional_secratory_id=? and payments_post_office_to_benifishers.month = ?  and payments_post_office_to_benifishers.year=?",
      [data.div_id, data.month, data.year],
      (error, results, fields) => {
        if (error) {
          console.log(results);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getBenifisherPayemtListByPostOffice: (data, callBack) => {
    pool.query(
      "SELECT payments_post_office_to_benifishers.payment_id ,elder.elder_id, elder.name , payments_post_office_to_benifishers.money_amount , IF(ajent_available = 1, 'Available', 'No') AS ajent_available , elder.nic_id ,elder.number FROM `payments_post_office_to_benifishers` ,`elder` WHERE elder.elder_id = payments_post_office_to_benifishers.elder_id and elder.near_post_office_id=? and payments_post_office_to_benifishers.month = ? AND payments_post_office_to_benifishers.year=?",
      [data.post, data.month, data.year],
      (error, results, fields) => {
        if (error) {
          console.log(results);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
