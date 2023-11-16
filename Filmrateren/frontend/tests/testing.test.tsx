import { beforeEach, afterEach, describe, expect, it, vitest, test, vi } from "vitest";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { MockedProvider } from "@apollo/client/testing";
import { apolloClient } from '../src/apolloClient'; 
import { StrictMode } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import userEvent from '@testing-library/user-event';
import React from "react";
import "@testing-library/jest-dom";

import { Movie } from '../src/components/types';
import MovieCard from "../src/components/MovieCard";
import RatingCard from "../src/components/RatingCard";
import HomePage from "../src/pages/HomePage";
import SearchHitCard from '../src/components/SearchHitCard';
import RatingPopup from '../src/components/RatingPopup';
import { ADD_RATING_TO_MOVIE } from '../src/queries/AddRatingMutation';

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

describe("Test of SearchHitCard", () => {
  let searchHitCard;
  const mockMovie = {
    id: 1,
    title: 'Sample Movie',
    directors: ['Director 1'],
    plot: 'Sample plot of the movie.',
    releaseYear: '2023',
    genres: ['Action'],
    IMDBrating: 7.5,
    posterUrl: 'https://example.com/poster.jpg',
    userRatings: [],
  };

  beforeEach(() => {
    searchHitCard = render(
      <MemoryRouter>
        <SearchHitCard movie={mockMovie} smallScreen={false} />
      </MemoryRouter>
    );
  });

  it("Snapshot test: SearchHitCard has not changed design", () => {
    expect(searchHitCard).toMatchSnapshot();
  });

  it("Displays correct movie title", () => {
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });

  it("Renders movie poster", () => {
    const posterImage = screen.getByRole('img');
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', mockMovie.posterUrl);
    expect(posterImage).toHaveAttribute('alt', mockMovie.title);
  });

  it("Links to the correct path", () => {
    expect(screen.getByRole('link')).toHaveAttribute('href', `/project2/moviePage/${mockMovie.id}`)
  });
});

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

describe("Test of RatingPopup", () => {
  const mockOnClose = vi.fn();
  const mockMovieID = 1;
  let movieIdOfAddedRating = 0;

  const mocks = [
    {
      request: {
        query: ADD_RATING_TO_MOVIE,
        variables: {
          movieId: mockMovieID,
          rating: {
            name: 'User1',
            rating: 4,
            comment: 'Great movie!',
          },
        },
      },
      result: () => {
        movieIdOfAddedRating = mockMovieID;
        return {
          data: {
            addRatingToMovie: {
              id: mockMovieID,
              userRatings: {
                name: 'User1',
                rating: 4,
                comment: 'Great movie!',
              },
            },
          },
        }
      },     
    },
  ];

  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RatingPopup onClose={mockOnClose} movieID={mockMovieID} />
      </MockedProvider>);
  });

  afterEach(() => {
      mockOnClose.mockClear();
      movieIdOfAddedRating = 0;
  });

  it("Renders RatingPopup correctly", () => {
    const nameInput = screen.getByPlaceholderText('Eks: Ola Nordmann');
    const ratingButtons = screen.getAllByRole('button', { name: '★' });
    const commentInput = screen.getByPlaceholderText('Eks: En skummel, men spennende film!');
    const submitButton = screen.getByText('Send inn');

    expect(nameInput).toBeInTheDocument();
    expect(ratingButtons.length).toBe(5); 
    expect(commentInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });


  it("Adds correct rating with valid data", async () => {
    const nameInput = screen.getByPlaceholderText('Eks: Ola Nordmann');
    const ratingButtons = screen.getAllByRole('button', { name: '★' });
    const commentInput = screen.getByPlaceholderText('Eks: En skummel, men spennende film!');
    const submitButton = screen.getByText('Send inn');

    await userEvent.type(nameInput, 'User1');
    await userEvent.click(ratingButtons[3]);
    await userEvent.type(commentInput, 'Great movie!');
    
    await userEvent.click(submitButton);
    
    expect(mockOnClose).toHaveBeenCalled();
    expect(movieIdOfAddedRating).toBe(mockMovieID);
  });

  

  it("Does not add rating with invalid data", async() => {
    const submitButton = screen.getByText('Send inn'); 

    await userEvent.click(submitButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(0);
    expect(movieIdOfAddedRating).toBe(0);
  });
});


