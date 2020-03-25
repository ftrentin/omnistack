import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';


export default function Register(){
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [whatsapp, setwhats] = useState('');
    const [city, setcity] = useState('');
    const [uf, setuf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data ={
            name,
            email,
            whatsapp,
            city,
            uf
        };
        try{
            const response = await api.post('ongs',data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        }
        catch(err)
        {
            alert("Erro ao cadastrar, tente novamente");
        }
    

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas à encontrarem os casos da sua ONG.</p>
                    <Link to="/" className="back-link"> <FiArrowLeft size={16} color="#E02041"/> Voltar </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setname(e.target.value)}></input>
                    <input type="email" placeholder="e-mail" value={email} onChange={e => setemail(e.target.value)}></input>
                    <input placeholder="WhatsApp" value={whatsapp} onChange={e => setwhats(e.target.value)}></input>
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setcity(e.target.value)}></input>
                        <input placeholder="UF" value={uf} onChange={e => setuf(e.target.value)} ></input>
                    </div>
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )

};