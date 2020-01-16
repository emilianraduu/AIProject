import sqlite3
conn = sqlite3.connect('movie-database-small.db')

c = conn.cursor()
d = conn.cursor()
e = conn.cursor()
tags = ('Tom Hardy',)
c.execute("SELECT title FROM movies m JOIN tags t ON m.movieId=t.movieId WHERE tag=?", tags)
d.execute("SELECT title FROM movies m JOIN tags t ON m.movieId=t.movieId WHERE tag='Leonardo DiCaprio'")
e.execute("SELECT title FROM movies m JOIN links l ON m.movieID=l.movieId WHERE tmdbId='343611'")

print(c.fetchall())
print(d.fetchall())
print(e.fetchall())