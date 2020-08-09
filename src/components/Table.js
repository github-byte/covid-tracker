import React from 'react'
import  "./Table.css"



function Table({countries}) {
    
    return (
       
        <div className="Table">
           {countries.map(({name,cases})=>(
          
               <tr>
                    <td>{name}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
               
            ))}

        </div>
        )
    
}

export default Table
