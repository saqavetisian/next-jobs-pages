const convertQueryParams = (query: { [key: string]: string | undefined | number } = {}): string => {
  const items: string[] = [];
  Object.keys(query).forEach((key: string) => {
    const value = query[key];
    if (value) {
      items.push(`${key}=${value}`);
    }
  });
  return items.length > 0 ? `?${items.join("&")}` : "";
};

export default convertQueryParams;
