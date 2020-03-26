import React, {useEffect, useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

export default function Profile(){
    const ongID = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);



    async function instanceDelete(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongID,
                }});
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(erro){
            alert("Erro, não foi possíve deletar o caso!");
        }
    }

    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization: ongID,
            }
        }).then( Response =>{
            setIncidents(Response.data);
        })
    }, [ongID]);

    function handleLogout(){
        localStorage.removeItem('ongId');
        localStorage.removeItem('ongName');
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be ThevHero" className=""/>
                <span>Bem vinda, {ongName}</span>
                
                <Link className="button" to="/incidents/new">Cadastrar Caso Novo</Link>
                <button type="button">
                    <FiPower size={18} color="#e02041" onClick={handleLogout}></FiPower> 
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button">
                            <FiTrash2 size={20} color="#333" onClick={() => instanceDelete(incident.id)}/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};