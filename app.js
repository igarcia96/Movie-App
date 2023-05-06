import React, { useState, useEffect, Component } from 'react';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavourites from' ./Components/AddFavourites';
import RemoveFavourites from './Components/RemoveFavourites';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, seSearchValue] = useState([]);

    const getMovieRequest = async (searchValue) => {
        const reponse = await fetch(url);
        const reponseJson = await reponse.json();

        if (reponseJson.Search) {
            setMovies(reponseJson.Search);
        }
    };

    useEffect(() => {
        getMovieRequest(searchValue);    
    }, [searchValue]);

    useEffect(() => {
        const movieFavourites = Json.parse(
            localStorage.getItem('react-movie-app-favourites')
        );

        if (movieFavourites) {
            setFavourites(movieFavourites);
        }
    }, []);

    const saveToLocalStorage = (Items) => {
        localStorage.setItems('react-movie-app-favourites', Json.stringfly(Items));
    };

    const AddFavouritesMovie = (movie) => {
        const newFavouritesList = [...favourites, movie];
        setFavourites(newFavouritesList);
        saveToLocalStorage(newFavouritesList);
    };

    const RemoveFavouritesmovie = (movie) => {
        const newFavouritesList = favourites.filter(
            (favourites) => favourites.imdbID !== movie.imdbID        
        );

        setFavourites(newFavouritesList);
        saveToLocalStorage(newFavouritesList);
    };

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex algin-items-center mt-4 mb-4'>
                <MovieListHeading heading='Movies'/>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className='row'>
                <MovieList
                        movies={movies}
                        handleFavouritesClick={AddFavouritesMovie}
                        favouritesComponent={AddFavourites}
                />        
            </div>
            <div className='row d-flex align-items-center mt-4 mb4'>
                <MovieListHeading heading='Favourites'/>
            </div>
            <div className='row'>
                    <MovieList
                            movies={favourites}
                            handleFavouritesClick={RemoveFavouritesmovie}
                            favouritesComponent={RemoveFavourites}
                    />        
            </div>
        </div>
    );
};