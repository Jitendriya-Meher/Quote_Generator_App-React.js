import React, { useState } from 'react';
import './Quotes.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Quotes = () => {

    const [quote, setQuote] = useState({
        text: 'In the middle of difficulty lies opportunity.',
        author: 'Albert Einstein'
    });

    const [showFav, setShowFav] = useState(false);

    const toggleFav = () => {
        setShowFav(!showFav);
    }

    const [favorites, setFavorites] = useState([]);

    const addToFavorites = () => {
        const isAlreadyFavorited = favorites.some((fav) => fav.text===quote.text && fav.author===quote.author);

        if( !isAlreadyFavorited ){
            setFavorites([...favorites, quote]);
            toast.success("Quote added to Favorites");
        }
        else{
            toast.error("Quote already added to Favorites");
        }
    }

    const fetchNewQuotes = async () => {

        try{
            const url = 'http://api.quotable.io/random';
            const response = await axios.get(url);
            const data = await response.data;

            // console.log('data', data);
            
            setQuote({
                text: data.content,
                author: data.author
            });
        }
        catch(error){
            console.error('Failed to fetch new quotes', error);
        }

    }

  return (
    <div className='container'>

        <div className="quotes-app">

            <h1 className='app-heading'>
                Quote.
            </h1>

            <i className='bx bxs-heart fav-icon'
            onClick={toggleFav}
            ></i>

            <div className="quote">

                <i className="bx bxs-quote-alt-left left-quote"></i>

                <p className=" quote-text">
                    {quote.text}
                </p>

                <p className="quote-author">
                    {quote.author}
                </p>

                <i className="bx bxs-quote-alt-right right-quote"></i>

            </div>

            <div className="circles">

                <div className="circle-1"></div>
                <div className="circle-2"></div>
                <div className="circle-3"></div>
                <div className="circle-4"></div>
                
            </div>

            <div className="buttons">

                <button className="btn btn-new"
                onClick={fetchNewQuotes}
                >
                    New Quote
                </button>

                <button className="btn btn-fav"
                onClick={addToFavorites}
                >
                    Add to Favorities
                </button>

            </div>


            {showFav && <div className="favorites">

                <button className=' btn-close'
                onClick={toggleFav}
                >
                    <i className="bx bx-x"></i>
                </button>

                {
                    favorites.map((item,i) => (
                        <div className="fav-quote" key={i}>

                            <div className="fav-quote-delete">
                                <i className="bx bx-x-circle"
                                onClick={() => {
                                    const updatedFav = favorites.filter((item,index) => (i!==index));

                                    setFavorites(updatedFav);

                                    toast.success("Quote removed from favorites");
                                }}
                                ></i>
                            </div>

                            <div className="fav-quote-content">
                                <div className="fav-quote-text">
                                    {item.text}
                                </div>

                                <div className="fav-quote-author">
                                    {item.author}
                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>}

        </div>

    </div>
  )
}

export default Quotes