import React from 'react';
import FavoritesItem from './item/FavoritesItem';
import axios from 'axios';
import style from './favorites.module.css'
import { AppContext } from '../../App';

const Favotites =(props)=>{
    
  const context = React.useContext(AppContext)
        
           const onAddOverlay = (obj)=>{
        axios.post('https://637f91d02f8f56e28e904f63.mockapi.io/Cart', obj)
        context.setOverlayItems([...props.overlayItems, obj]);
      }


      const onDeleteFav =(id)=>{
        console.log(id)
        axios.delete(`https://637f91d02f8f56e28e904f63.mockapi.io/favorites/${id}`)
      props.setFavorites((fav) => fav.filter(item => item.id !==id));
    }

    return(
        <div className={style.cart_section}>
        <div className={style.search}>
            <h1>Избранные Туры:</h1>
            
        </div>

        <div className={style.cart}>
        
        {
                            props.favorites.map(obj =>{
                                return(
                                    <FavoritesItem 
                         key={obj.id}
                         id={obj.id}
                         title={obj.title} 
                         price={obj.price}
                          img={obj.img}

                          onDeleteFav={
                            (id) => {
                              onDeleteFav(id)
                            }
                        }

                        onPlus={(cartObj)=>{
                            console.log(cartObj)
                            onAddOverlay(cartObj)
                        }
                    }
                          />
                                )
                            })
                        
                        }
        
        </div>
    </div>
    )
    
    
}

export default Favotites;