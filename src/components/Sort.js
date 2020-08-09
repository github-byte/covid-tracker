import React from 'react'

export const sortedData=
(data)=> {
    const sortedData=[...data]

    sortedData.sort((a,b)=>a.cases<b.cases?1:-1)

return sortedData
}

console.log(sortedData)