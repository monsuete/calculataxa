import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            {/*Refatorar em casa! */}
            <Link to="/">
                <i className="fas fa-calculator" ></i> Calcular
            </Link>
            <Link to="/users">
                <i className="fas fa-folder" ></i> Cadastro
            </Link>
        </nav>
    </aside>