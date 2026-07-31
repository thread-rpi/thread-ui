export const formatDate = (rawDate: string): string =>
  new Date(rawDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });