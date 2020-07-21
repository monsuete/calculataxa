import React from 'react'
import './index.css'


export default (props) => {

    return (
        <div className="container">
            <div className="row mt-5">
                {props.plan ? (
                    <div className="col text-center">
                        <h2>Fale mais {props.plan}</h2>
                        <p>Como fica melhor para você?</p>
                    </div>
                ) : (
                    <div className="alert alert-primary" role="alert">
                        <strong>Preencha os campos do formulário com os valores da Tabela (Você também pode clikar em uma das linhas)!</strong>
                        <p>Vamos calcular tudo para você</p>
                    </div>
                    )}
            </div>
            {props.withPlan !== null && props.withoutPlan !== null ? (
                <div className="row text-center">
                    <div className="col">
                        <div className="counter">
                            <i className="fas fa-calculator fa-2x"></i>
                            <h2 className="timer count-title count-number">
                                ${props.withPlan.toFixed(2)}
                            </h2>
                            <p className="count-text ">Com plano</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="counter">
                            <i className="fas fa-calculator fa-2x"></i>
                            <h2 className="timer count-title count-number">
                                ${props.withoutPlan.toFixed(2)}
                            </h2>
                            <p className="count-text ">Sem plano</p>
                        </div>
                    </div>
                </div>)
                : (
                    <p>..</p>
                )}
        </div>
    )
}