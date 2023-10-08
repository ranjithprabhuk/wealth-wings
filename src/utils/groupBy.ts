export function groupBy<ItemType>(items: ItemType[], key: string): Record<string, ItemType[]> {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {},
  );
}
