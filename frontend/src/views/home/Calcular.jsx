import './Calcular.css'
import React, { useState, useEffect } from 'react'
import Main from '../template/Main'

import Taxs from '../../components/TaxTable'
import Calculator from '../../components/Calculator'
import Result  from '../../components/Result'



export default props => {
    const [withPlan, setWithState] = useState(null)
    const [withoutPlan, setWithoutPlan] = useState(null)
    const [plan, setPlan] = useState(null)
    const [tax, setTax] = useState({})
    const [taxs, setTaxs] = useState([])
    const [dds, setDds] = useState([])
    
    const getTaxs = async() => {
        const users = await fetch('http://localhost:3001/taxs')
        const data = await users.json();

        setTaxs(data);
    }

    const getDds = async() => {
        const dds = await fetch('http://localhost:3001/dds').then(r => r.json())

        setDds(dds);
    }

    useEffect( () => {
        getTaxs()
        getDds()
    }, [])

    
    

    const calculate = ({ source, target, time, plan}) => {
        const selectedTaX = taxs.find(tax => (
            tax.source === source && tax.target === target
        ))

        console.log(selectedTaX, { source, target, time, plan})
        
        if (selectedTaX && time && plan) {
            const excess = time > plan ? time - plan : 0 // 80 60 = 20 / 0
            const value = excess ? (excess * selectedTaX.amount) + (excess * selectedTaX.amount) * 0.1 : 0
            setWithState(value)
            setWithoutPlan(time * selectedTaX.amount)
            setPlan(plan)
        }
    }

    return <Main icon="calculator" title="Calcular"
        subtitle="Veja nossos valores e planos.">
        <div><h2 align="center">PLANO FALEMAIS</h2></div>
        <hr />
        <p align="center" className="mb-0">Compare os valores da tabela fixa, com as opções de Plano <strong>Falemais</strong>!</p>
        <hr />

        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4  order-1">
                    <Taxs taxs={taxs} selected={setTax} />
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3  order-3" >
                    <Calculator dds={dds} tax={tax} taxs={taxs} updated={calculate} />
                </div>
                
                <div align="center" className="col-xs-12 col-sm-6 col-md-5  order-2">
                    <div className="calculator">
                        <Result withPlan={withPlan} withoutPlan={withoutPlan} plan={plan} />    
                    </div>
                </div>
            </div>
        </div>
    </Main>
}