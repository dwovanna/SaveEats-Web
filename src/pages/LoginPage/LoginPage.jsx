//React
import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

//Import Axios para integração e Yup para validação dos campos
import axios from 'axios'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';


//Components
import { ContainerLeft } from '../../components/ContainerLeft/ContainerLeft.jsx'

//Images and style
import hamburger from './img/hamburguer.png'
import prato from './img/prato.png'
import logo from './img/logo.png'
import pao from './img/pao.png'
import './LoginPage.css'

export function LoginPage() {

    const navigate = useNavigate()

    const validationPost = yup.object().shape({
        email: yup.string().required("Preencha o campo de Email").max(255, "O Email deve ter até 255 caracteres").email("Email inválido"),
        senha: yup.string().required("Preencha o campo de Senha").max(150, "A senha precisa ter até 150 caracteres").min(8, "A senha tem que ter mais de 8 caracteres")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationPost)
    })

    const addPost = data => axios.post('https://save-eats.cyclic.cloud/v1/saveeats/restaurante/login/autenticar', data)
        .then(() => {
            navigate("/home")
            console.log(data);
            console.log("DEU CERTO")
        })
        .catch(() => {

            console.log(data);
            console.log("Deu errado")
        })

    return (

        <div className="loginContent">
            <header>
                <img src={hamburger} alt="Hamburguer" className="hamburguer" />
                <img src={prato} alt="Prato feito" className="prato" />
            </header>
            <main className='main-login'>
                <div className="container-login">

                    <ContainerLeft></ContainerLeft>

                    <div className="container-rigth-login">
                        <img src={logo} alt="Logo" />
                        <h1>bem vindo</h1>
                        <h2>Entre em sua conta</h2>

                        <form className="inputs-login">

                            <span className="span-input">Email</span>
                            <input type="email" name="email" {...register("email")} />
                            <p className="error">{errors.email?.message}</p>

                            <span className="span-input">Senha</span>
                            <input type="password" name="senha" {...register("senha")} />
                            <p className="error">{errors.senha?.message}</p>

                            <span className="esqueceu-senha">Esqueceu sua senha?</span>

                        </form>

                        <button className='btnLogin' onClick={handleSubmit(addPost)}>Entrar</button>

                        <div className="cadastra-se">
                            <span className="nao-possui-conta">Não possui uma conta?</span>
                            <Link className='cadastrar' to='./cadastro'> Cadastre-se</Link>
                        </div>
                    </div>
                </div>

            </main>
            <footer>
                <img src={pao} alt="Pão" className="pao" />
            </footer>

        </div>

    )
}