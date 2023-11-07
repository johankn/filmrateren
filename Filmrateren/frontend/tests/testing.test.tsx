import { beforeEach, describe, expect, it, vitest, test } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../src/apolloClient'; 
import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import userEvent from '@testing-library/user-event';
import React from "react";
import "@testing-library/jest-dom";

import { Movie } from '../src/components/types';
import MovieCard from "../src/components/MovieCard";
import RatingCard from "../src/components/RatingCard";
import HomePage from "../src/pages/HomePage";
import SearchHitCard from '../src/components/SearchHitCard';


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

/*
test("renders with MockedProvider", async () => {
  const mocks = [{
    request: {
      query: SEARCH_MOVIES_QUERY,
      variables: {
        title: ''
      }
    },
    result: {
      data: {
        searchMovies: {
          id: "1",
          title: "Title 1"
        }
      }
    }
  }, 
  {
    request: {
      query: GET_FILTERED_MOVIES_QUERY,
      variables: {
        title: '', 
        genres: [], 
        sort: '', 
        limit: 28,
        skip: 0
      },
    },
    result: {
      data: {
        getFilteredMovies: {
          id: "1",
          title: "Title 1",
          genres: [ 'action' ],
          posterUrl: 'title1.no'
        }
      }
    }
  }];

  const homePage = render(
    <StrictMode>
                <RecoilRoot>
                    <MockedProvider mocks={mocks} addTypename={false}>
                        <MemoryRouter>
                            <HomePage />
                        </MemoryRouter>,
                    </MockedProvider>
                </RecoilRoot>
          </StrictMode>
  );

  
  expect(homePage.getAllByText(/Bla ned for avansert søk/i)).toBeTruthy();
  await act(async () => {
    const movie1 = await waitFor(() => homePage.getByText('Title 1'));
    expect(movie1).toBeInTheDocument();
  });
});*/

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



// Write tests for stars, ratingpopup, sort, filter


/*
describe('Test of input', () => {
  it('Updates the input based on the typed search input.', async () => {
    const RecoilObserver = ({ node, onChange }) => {
      const value = useRecoilValue(node);
      useEffect(() => {
        console.log('Recoil state:', value);
        onChange(value);
      }, [onChange, value]);
      return null;
    };
    
      const setSelectedTitle = vi.fn();

      render(
      <StrictMode>
              <ApolloProvider client={apolloClient}>
                  <MemoryRouter>
                      <RecoilRoot>
                          <RecoilObserver node={selectedTitleState} onChange={setSelectedTitle} />
                          <HomePage />
                      </RecoilRoot>
                  </MemoryRouter>,
              </ApolloProvider>
        </StrictMode>,
    );

    const searchbar = screen.getByRole('textbox')// screen.getByTestId('Searchbar');
    expect(searchbar).toBeTruthy();
    console.log(searchbar)
    userEvent.type(searchbar, 'Test');
    expect(searchbar).toHaveValue('Test')

    /*
    expect(setSelectedTitle).toHaveBeenCalledTimes(2);
    expect(setSelectedTitle).toHaveBeenCalledWith(''); // New value on change.
    expect(setSelectedTitle).toHaveBeenCalledWith('Test'); // New value on change.
  });
});*/