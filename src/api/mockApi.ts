export type Article = {
  id: string;
  title: string;
  dateCreated: string;
  content: string;
  tags: string[];
};

let articles: Article[] = [
  { id: '1', title: 'First Article', dateCreated: 'June 14', content: 'Content of the first article', tags: ['tag1'] },
  { id: '2', title: 'Second Article', dateCreated: 'July 12', content: 'Content of the Second article', tags: ['tag1'] },
];

export const getArticles = async (): Promise<Article[]> => {
  return articles;
};

export const getArticle = async (id: string): Promise<Article | undefined> => {
  return articles.find((article) => article.id === id);
};

export const addArticle = async (article: Article): Promise<void> => {
  articles.push(article);
};

export const updateArticle = async (id: string, updatedArticle: Article): Promise<void> => {
  articles = articles.map((article) => (article.id === id ? updatedArticle : article));
};

export const deleteArticle = async (id: string): Promise<void> => {
  articles = articles.filter((article) => article.id !== id);
};
