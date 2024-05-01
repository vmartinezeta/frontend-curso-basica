
function TaskBar({onNuevo, onEliminar, estaEn2doPlano, children }) {

 
    if (!estaEn2doPlano) {
        return <ul className="taskbar">
            <li className="taskbar__item"><a className="taskbar__link" href="#" onClick={onNuevo}>Nuevo</a></li>
        </ul>
    }
    return <ul className="taskbar">
        <li className="taskbar__item"><a className="taskbar__link" href="#" onClick={onNuevo}>Nuevo</a></li>
        <li className="taskbar__item"><a className="taskbar__link" href="#" onClick={onEliminar}>Eliminar</a></li>
        {children}
    </ul>
}

export default TaskBar