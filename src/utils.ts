export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
