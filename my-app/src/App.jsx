import './App.css';
import Header from './components/header/Header.jsx';
import Banner from './components/banner/Banner.jsx';
import Cart from './components/cart/Cart.jsx';
import Footer from './components/footer/Footer.jsx';
import Overlay from './components/overlay/Overlay';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Favotites from './components/favorites/Favorites';
import Home from './components/Home';
import Form from './components/form/Form';

export const AppContext = React.createContext({})


function App() {

    const [overlayOpen, setOverlayOpen] = React.useState(false);

    const [tyrs, setTyrs] = useState([]);

    const [overlayItems, setOverlayItems] = useState([]);

    const [search, setSearch] = React.useState('');

    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        async function axiosData(){
            
            const tyrsData = await axios.get('https://637f91d02f8f56e28e904f63.mockapi.io/tyrs')
            const cartData = await axios.get('https://637f91d02f8f56e28e904f63.mockapi.io/Cart')
            const favoritesData = await axios.get('https://637f91d02f8f56e28e904f63.mockapi.io/favorites')
            
    
              setTyrs(tyrsData.data)
              setOverlayItems(cartData.data)
              setFavorites(favoritesData.data)
            }
          axiosData();
           
         
        }, [])



    const deleteItems = (id)=>{
        console.log(id);
        axios.delete(`https://637f91d02f8f56e28e904f63.mockapi.io/Cart/${id}`)
        setOverlayItems((objDelete)=> objDelete.filter(item=>item.id !== id))
    }
    
    const isAdded =(myId)=>{
        return overlayItems.some((objisAdded)=> objisAdded.myId === myId)
    }

    const isFav =(myId)=>{
        return favorites.some((objIsFav)=> objIsFav.myId === myId)
    }

    return (

        <AppContext.Provider

        value={{
            tyrs,
            setTyrs,
            overlayItems,
            setOverlayItems,
            favorites,
            setFavorites,
            isAdded,
            isFav
        }}
        
        
        >

        <div className="app">
            {overlayOpen? <Overlay 

                total_price={
                    overlayItems.reduce((elements = overlayItems.length, obj) =>
                    elements + obj.price, 0)
                }
            
            
            overlayProp={overlayItems}closeOverlay={()=> setOverlayOpen(false)}
            deleteItems={deleteItems}
            />: null}
            
            
            <Header openOverlay={()=> setOverlayOpen(true)} overlayItems={overlayItems}/>

            <Routes>
                <Route path='/favorites'
                element={
                    <Favotites
                    favorites={favorites}
                    setFavorites={setFavorites}
                    item={tyrs}
                    overlayItems={overlayItems}
                    setOverlayItems={setOverlayItems}/>
                }
                />

                <Route path='/'
                element={
                    <Home
                            item={tyrs}
                            overlayItems={overlayItems}
                            setOverlayItems={setOverlayItems}
                            setSearch={setSearch}
                            search={search}
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                }
                />

                <Route path='/form'
                element={
                    <Form/>
                }
                />
                
            </Routes>
            
           

            <Footer/>




        </div>
        </AppContext.Provider>

    )
}
export default App