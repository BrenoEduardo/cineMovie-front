export interface MovieModel {
  _id: string;
  name: string;
  description: string;
  duration: number;
  ratings: number;
  quantRatings: number;
  releaseYear: string;
  genres: string[];
  coverImage: string;
  directors: string[];
  actors: string[];
  createdAt: Date;
}
