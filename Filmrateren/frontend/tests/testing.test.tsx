import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../src/apolloClient'; 
import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import React from "react";
import "@testing-library/jest-dom";

import { Movie } from '../src/components/types';
import MovieCard from "../src/components/MovieCard";
import RatingCard from "../src/components/RatingCard"
import HomePage from "../src/pages/HomePage";


describe("Test of HomePage", () => {
    let homePage
    beforeEach(() => {
        homePage = render(
            <StrictMode>
                <RecoilRoot>
                    <ApolloProvider client={apolloClient}>
                        <MemoryRouter>
                            <HomePage />
                        </MemoryRouter>,
                    </ApolloProvider>
                </RecoilRoot>
          </StrictMode>
        )
    })

    it("Snapshot test: HomePage has not changed design", () => {
        expect(homePage).toMatchSnapshot();
      });

    it("Content test: HomePage has not changed content", () => {
          expect(screen.getAllByText(/Bla ned for avansert søk/i)).toBeTruthy();
          expect(screen.getAllByText(/Sjanger/i)).toBeTruthy();
          expect(screen.getAllByText(/Sortering/i)).toBeTruthy();
          expect(screen.getAllByText(/Søk/i)).toBeTruthy();
          expect(screen.getAllByPlaceholderText(/Tittel.../i)).toBeTruthy();
        });
    }
)

describe("Test of MovieCard", () => {
    let movieCard
    const mockMovie: Movie = {
        id: 1,
        title: 'Sample Movie',
        directors: ['Director 1'],
        plot: 'Sample plot of the movie.',
        releaseYear: '2023',
        genres: ['Action'],
        IMDBrating: 7.5,
        posterUrl: 'https://example.com/poster.jpg',
        userRatings: [
          {
            name: 'User1',
            rating: 3.0,
            comment: 'Great movie!',
          },
          {
            name: 'User2',
            rating: 2,
            comment: 'Enjoyable but could be better.',
          },
        ],
      };
    beforeEach(() => {
        movieCard = render(
            <MovieCard movie={mockMovie}></MovieCard>
        )
    })

    it("Snapshot test: MovieCard has not changed design", () => {
        expect(movieCard).toMatchSnapshot();
      });

    it("Content test: MovieCard has not changed content", () => {
          expect(screen.getAllByText(/Sjanger/i)).toBeTruthy();
          expect(screen.getAllByText(/Regi/i)).toBeTruthy();
          expect(screen.getAllByText(/Utgivelsesår/i)).toBeTruthy();
          expect(screen.getAllByText(/Beskrivelse/i)).toBeTruthy();
          expect(screen.getAllByText(/IMDB rating/i)).toBeTruthy();
          expect(screen.getAllByText(/Average user rating/i)).toBeTruthy();
        });
    it("Displays correct movie details", () => {
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.genres}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.directors}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.releaseYear}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.plot}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.IMDBrating}`)).toBeInTheDocument();

    const averageUserRating = mockMovie.userRatings.reduce((acc, curr) => acc + curr.rating, 0) / mockMovie.userRatings.length;
    expect(screen.getByText(`${averageUserRating.toFixed(1)}`)).toBeInTheDocument();
    })
    }
)

describe("Test of RatingCard", () => {
  let ratingCard;
  const mockRating = {
      name: 'User1',
      rating: 3.0,
      comment: 'Great movie!',
  };

  beforeEach(() => {
      ratingCard = render(<RatingCard {...mockRating} />);
  });

  it("Snapshot test: RatingCard has not changed design", () => {
      expect(ratingCard).toMatchSnapshot();
  });

  it("Displays correct user name, rating, and comment", () => {
      const { getByText } = ratingCard;
      const nameElement = getByText(mockRating.name);
      const ratingElement = screen.getAllByText(`★`);
      const commentElement = getByText(mockRating.comment);
      
      expect(nameElement).toBeInTheDocument();
      expect(ratingElement).toBeTruthy();
      expect(commentElement).toBeInTheDocument();
  });
});