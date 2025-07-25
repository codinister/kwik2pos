const proformaFields = (v) => {


  return {
    addbank: v.addbank,
    code: v.code,
    covid: v.covid,
    covid_rate: v.covid_rate,
    createdAt: v.createdAt,
    cust_id: v.cust_id,
    discount: v.discount,
    getfund: v.getfund,
    getfund_rate: v.getfund_rate,
    installation: v.installation,
    location: v.location,
    nhil: v.nhil,
    nhil_rate: v.nhil_rate,
    note: v.note,
    prepared_by: v.prepared_by,
    profile: v.profile,
    ss_id: v.ss_id,
    subtotal: v.subtotal,
    total: v.total,
    trans_type: v.trans_type,
    transportation: v.transportation,
    user_id: v.user_id,
    uuid: v.uuid,
    vat: v.vat,
    vat_rate: v.vat_rate,
    withholdingtax: v.withholdingtax,
    withholdingtax_rate: v.withholdingtax_rate,
  };
};

export default proformaFields;
