import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    const ongID = localStorage.getItem('ongId');

    async function handleEnvio(e){
        e.preventDefault();
        try{
            console.log(title);
            console.log(description);
            console.log(value);
            let data = {
                title,
                description,
                value,
            };
            data['value'] = parseFloat(data['value'].replace(',', '.'));
            const response = await api.post('incidents',data, {
                headers:{
                Authorization: ongID,
            }});
            console.log(response);
            alert('Cadastrado com SUCESSO!')
            history.push('/profile');
        }catch(err){
            alert('Falha de cadastrar, tente novamente.');
            console.log(err);
        }
    }
    
    return(
        
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso</p>
                    <Link to="/profile" className="back-link"> <FiArrowLeft size={16} color="#E02041"/> Voltar para Home</Link>
                </section>

                <form onSubmit={handleEnvio}>
                    <input 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Título do caso"></input>
                    <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição"></textarea>
                    <input 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em Reais"></input>
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
};
