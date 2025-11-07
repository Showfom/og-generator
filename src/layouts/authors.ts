export const authors = [
  {
    name: "宝硕",
    image: "https://macdn.net/images/baoshuo.jpeg",
  },
  {
    name: "Showfom",
    image: "https://macdn.net/showfom.jpeg",
  }
];

const defaultAuthor = authors[0];

export const getAuthor = (name: string) => {
  const author = authors.find(author => author.name === name);

  return author ?? defaultAuthor;
};
