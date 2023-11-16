import json

# Load the JSON data from the file
with open('norwegian_movies.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Iterate through the movies and update posterUrl if it's null
for movie in data['movies']:
    if movie['posterUrl'] is None:
        movie['posterUrl'] = "https://image.tmdb.org/t/p/w500None"

# Write the updated JSON data back to the file
with open('norwegian_movies.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

print("Updated posterUrl properties in the JSON file.")