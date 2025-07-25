import proformaFields from '../fields/proformaFields.js';

const proformaMap = (v) => {
  return {
    ...v,
    proforma_count: 1,
    proforma_total: Number(v.total),
    proforma_list: {
      [v.ss_id]: proformaFields(v),
    },
  };
};

export default proformaMap;
