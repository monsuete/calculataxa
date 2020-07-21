import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'folder-open',
    title: 'Cadastro',
    subtitle: 'Cadastro de Planos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/taxs'
const initialState = {
    taxs: { source: '', target: '', amount: '' },
    list: []
}

export default class TaxsCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ taxs: initialState.taxs })
    }

    save() {
        const taxs = this.state.taxs
        const method = taxs.id ? 'put' : 'post'
        const url = taxs.id ? `${baseUrl}/${taxs.id}` : baseUrl
        axios[method](url, taxs)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ taxs: initialState.taxs, list })
            })
    }

    getUpdatedList(taxs, add = true) {
        const list = this.state.list.filter(u => u.id !== taxs.id)
        if(add) list.unshift(taxs)
        return list
    }

    updateField(event) {
        const taxs = { ...this.state.taxs }
        taxs[event.target.name] = event.target.value
        this.setState({ taxs })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Origem</label>
                            <input type="text" className="form-control"
                                name="source"
                                value={this.state.taxs.source}
                                onChange={e => this.updateField(e)}
                                placeholder="Digine o DDD de Origem..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Destino</label>
                            <input type="texts" className="form-control"
                                name="target"
                                value={this.state.taxs.target}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o DDD de destino" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Valor por Minutos</label>
                            <input type="text" className="form-control"
                                name="amount"
                                value={this.state.taxs.amount}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o valor por minuto..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(taxs) {
        this.setState({ taxs })
    }

    remove(taxs) {
        axios.delete(`${baseUrl}/${taxs.id}`).then(resp => {
            const list = this.getUpdatedList(taxs, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Valor por Minutos</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(taxs => {
            return (
                <tr key={taxs.id}>
                    <td>{taxs.id}</td>
                    <td>{taxs.source}</td>
                    <td>{taxs.target}</td>
                    <td>{taxs.amount}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(taxs)}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(taxs)}>
                            <i className="far fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}