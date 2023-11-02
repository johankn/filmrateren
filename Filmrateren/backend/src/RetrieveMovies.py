import os
import requests
import json

genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
}


# Function to extract genre names from the TMDb response
def extract_genre_names(genre_ids):
    genre_names = []
    for gid in genre_ids:
        if gid in genres:
            genre_names.append(genres[gid])
    return genre_names

# Get the directory of the current Python file
script_dir = os.path.dirname(os.path.realpath(__file__))

api_key = '921ba8fa9fe83d7834c0080a1c9f24de'

# Define the endpoint for discovering movies
discover_endpoint = 'https://api.themoviedb.org/3/discover/movie'

# Set the query parameters to filter Norwegian movies
params = {
    'api_key': api_key,
    'language': 'no',
    'with_original_language': 'no',
    'page': 1
}

norwegian_movies = []
movie_count = 0
page = 0

# Loop to paginate through the results
while True:
    page += 1
    response = requests.get(discover_endpoint, params=params)
    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        break

    data = response.json()
    movie_id = 0
    
    # Extract the desired parameters
    for movie in data['results']:
        movie_id += 1
        mid = int(str(page) + str(movie_id))
        directors = []
        credits_url = f"https://api.themoviedb.org/3/movie/{movie['id']}/credits"
        credits_response = requests.get(credits_url, params={'api_key': api_key})
        if credits_response.status_code == 200:
            credits_data = credits_response.json()
            directors = [crew['name'] for crew in credits_data.get('crew', []) if crew['job'] == 'Director']

        # Extract and set the genre names
        genre_names = extract_genre_names(movie.get('genre_ids'))

        movie_data = {
            'id': mid,
            'title': movie.get('title'),
            'plot': movie.get('overview'),
            'language': movie.get('original_language'),
            'posterUrl': f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}",
            'IMDBrating': movie.get('vote_average'),
            'directors': directors,
            'genres': genre_names,
            'releaseYear': movie.get('release_date')[:4] if movie.get('release_date') else 'Unknown',
            'userRatings': []
        }
        norwegian_movies.append(movie_data)
        movie_count += 1 
        print('Movie added:', len(norwegian_movies))

    # Check if there are more pages of results, and if not, break out of the loop
    if data['page'] >= data['total_pages']:
        break
    else:
        params['page'] = data['page'] + 1

# Write the extracted movie data to a JSON file in the same directory as the script
output_file_path = os.path.join(script_dir, 'norwegian_movies.json')
with open(output_file_path, 'w') as json_file:
    json.dump(norwegian_movies, json_file, indent=4)

print(f'Retrieved and extracted {len(norwegian_movies)} Norwegian movies. JSON file saved to {output_file_path}')
