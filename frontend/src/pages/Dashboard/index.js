import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import api from '../../services/Api'
import './style.css'


export default function Dashboard(){
    
    const [spots, setSpots] = useState([]);

    useEffect(() =>{
        async function loadSpots() {
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

           setSpots(response.data)
        }
        loadSpots();
    }, []);
    
    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumnail_url})`}}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            
                <buttom className="btn" ><Link to="/new">Cadastrar novo spot</Link></buttom>
            
        </>
    )
}