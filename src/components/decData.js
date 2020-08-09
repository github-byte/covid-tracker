import React from 'react'

export const decData=
(data)=> {
    const decData=[...data]

    decData.sort((a,b)=>a.cases>b.cases?1:-1)

return decData
}

export default decData
