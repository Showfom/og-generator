export const authors = [
  {
    name: "Showfom",
    image: "https://s3.rsb.net/showfom.jpeg",
  },
  {
    name: "宝硕",
    image: "https://s3.rsb.net/images/baoshuo.jpeg",
  }
];

const defaultAuthor = authors[0];

export const getAuthor = (name: string) => {
  const author = authors.find(author => author.name === name);

  return author ?? defaultAuthor;
};
