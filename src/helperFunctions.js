export const sortObj = (a, b) => {
  const company1 = a.company_id;
  const company2 = b.company_id;

  let comparison = 0;
  if (company1 > company2) {
    comparison = 1;
  } else if (company1 < company2) {
    comparison = -1;
  }
  return comparison;
};
export const sortPropertyObj = (a, b) => {
  const company1 = a.property_id;
  const company2 = b.property_id;

  let comparison = 0;
  if (company1 > company2) {
    comparison = 1;
  } else if (company1 < company2) {
    comparison = -1;
  }
  return comparison;
};

export const sortObjUnit = (a, b) => {
  const unit1 = a.unit;
  const unit2 = b.unit;

  let comparison = 0;
  if (unit1 > unit2) {
    comparison = 1;
  } else if (unit1 < unit2) {
    comparison = -1;
  }
  return comparison;
};

export const sortObjTenant = (a, b) => {
  const unit1 = a.tenant_id;
  const unit2 = b.tenand_id;

  let comparison = 0;
  if (unit1 > unit2) {
    comparison = 1;
  } else if (unit1 < unit2) {
    comparison = -1;
  }
  return comparison;
};

export const countOccupiedUnits = (units) => {
  if (units) {
    const occupied = units.filter((unit) => {
      return unit.occupied;
    });

    return occupied;
  }
  return 0;
};

export const totalUnitsRent = (units) => {
  let totalRent = 0;

  if (units) {
    units.forEach((unit) => {
      let num = parseInt(unit.rent);
      if (unit.rent !== "" && unit.rent !== null) {
        totalRent = totalRent + num;
      }
    });
  }
  return totalRent;
};
