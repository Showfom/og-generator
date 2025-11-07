// Parse authors from environment variables
function parseAuthors(): Array<{ name: string; image: string }> {
  const defaultNames = "宝硕,Showfom";
  const defaultImages = "https://macdn.net/images/baoshuo.jpeg,https://macdn.net/showfom.jpeg";

  const namesEnv = process.env.NEXT_PUBLIC_AUTHOR_NAMES || defaultNames;
  const imagesEnv = process.env.NEXT_PUBLIC_AUTHOR_IMAGES || defaultImages;

  const names = namesEnv.split(",").map(name => name.trim());
  const images = imagesEnv.split(",").map(url => url.trim());

  // Combine names and images, ensure they have the same length
  const authors: Array<{ name: string; image: string }> = [];
  const length = Math.min(names.length, images.length);

  for (let i = 0; i < length; i++) {
    if (names[i] && images[i]) {
      authors.push({
        name: names[i],
        image: images[i],
      });
    }
  }

  return authors.length > 0 ? authors : [{ name: "Default Author", image: "" }];
}

export const authors = parseAuthors();

const defaultAuthor = authors[0];

export const getAuthor = (name: string) => {
  const author = authors.find(author => author.name === name);

  return author ?? defaultAuthor;
};
