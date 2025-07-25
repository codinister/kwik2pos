import proformaMap from './map/proformaMap.js';
import proformaReduce from './reduce/proformaReduce.js';

const proformas = (data) => {
  const allproformas = Object.values(data)
    .map((v) => proformaMap(v))
    .reduce((a, b) => proformaReduce(a, b), {});

  return (cust_id) => {
    const prof = allproformas[cust_id];
    return {
      proforma_count: Number(prof?.proforma_count || 0),
      proforma_total: Number(prof?.proforma_total || 0),
      proforma_list: prof
        ? Object.values(prof?.proforma_list)
            .map((v) => v)
            .flat(2)
            .filter(Boolean)
        : [],
    };
  };
};

export default proformas;
