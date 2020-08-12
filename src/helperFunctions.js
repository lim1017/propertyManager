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
}