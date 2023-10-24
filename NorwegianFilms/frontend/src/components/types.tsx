export type Movie = {
  id: number;
  title: string;
  directors: string[];
  plot: string;
  releaseYear: string;
  genres: Array<string>;
  IMDBrating: number;
  posterUrl: string;
  userRatings: {
    name: string;
    rating: number;
    comment: string;
  }[];
};
