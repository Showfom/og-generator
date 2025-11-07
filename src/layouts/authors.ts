// Parse authors from environment variable
// Format: name1:imageUrl1,name2:imageUrl2
function parseAuthors(): Array<{ name: string; image: string }> {
  const authorsEnv = process.env.NEXT_PUBLIC_AUTHORS || "宝硕:https://macdn.net/images/baoshuo.jpeg,Showfom:https://macdn.net/showfom.jpeg";

  return authorsEnv.split(",").map(item => {
    const [name, image] = item.split(":");
    return { name: name.trim(), image: image.trim() };
  });
}

export const authors = parseAuthors();

const defaultAuthor = authors[0];

export const getAuthor = (name: string) => {
  const author = authors.find(author => author.name === name);

  return author ?? defaultAuthor;
};
