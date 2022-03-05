export const getPrice = (price: number, locale: string = "es-AR") => {
  const rules = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ARS",
  });

  return rules.format(price);
};
