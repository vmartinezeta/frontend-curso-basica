import React from 'react'
import Navbar from '../components/Navbar'
import AsignacionList from '../components/AsignacionList'
import FormAsignacion from '../components/FormAsignacion'
import { useSelectedStore } from '../store/useSelected'

function Asignacion() {
    
    const {aulaSelected} = useSelectedStore()

    return <div className="app">
        <Navbar />
        {
            aulaSelected!== null && <div className="main main__col">
            <AsignacionList />
            <FormAsignacion />
        </div>
        }
    </div>
}

export default Asignacion