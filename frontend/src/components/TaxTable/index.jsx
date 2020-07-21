import React from 'react'

export default (props) => {
   

    return (<table align="center">
        <thead>
            <tr>
                <th>Origem</th>
                <th>Destino</th>
                <th>$/min</th>
            </tr>
        </thead>
        <tbody>
            {props.taxs.map((tax, i) => (
                
                    <tr key={i} onClick={() => props.selected && props.selected(tax)}>
                        <td>{ tax.source}</td>
                        <td>{ tax.target}</td>
                        <td>$ { parseFloat(tax.amount).toFixed(2)}</td>                      
                    </tr>
                
            ))}
        </tbody>
    </table>
    )

}