export const authors = [
  {
    name: "Faraz Patankar",
    image: "https://og.railway.app/authors/faraz-patankar.jpeg",
  },
  {
    name: "Jake Cooper",
    image: "https://og.railway.app/authors/jake-cooper.jpeg",
  },
  {
    name: "Greg Schier",
    image: "https://og.railway.app/authors/greg-schier.jpeg",
  },
  {
    name: "Jake Runzer",
    image: "https://og.railway.app/authors/jake-runzer.jpeg",
  },
  {
    name: "Showfom",
    image: "https://s3.rsb.net/showfom.jpeg",
  }
];

const defaultAuthor = authors[0];

export const getAuthor = (name: string) => {
  const author = authors.find(author => author.name === name);

  return author ?? defaultAuthor;
};
