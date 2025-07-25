import actualExpDaysLeft from '../../../../../utils/actualExpDaysLeft.js';
import expDate from '../../../../../utils/expDate.js';

const expiriesList = (v) => {
  return actualExpDaysLeft(v.duration, v.createdAt) > 0
    ? 
        {
          [expDate(v.duration, v.createdAt)]: {
            cust_id: v.cust_id,
            fullname: v?.fullname,
            phone: v?.phone,
            ss_id: v.ss_id,
            exp_date: expDate(v.duration, v.createdAt),
            profile: v.profile,
          },
        }
      
    : '';
};

export default expiriesList;
