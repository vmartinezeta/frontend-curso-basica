import { useEffect } from "react"
import { useAulaStore } from "../store/useAula"
import { usePageStore } from "../store/usePage"
import TaskBar from "./TaskBar"
import { useAuthStore } from "../store/auth"

function AdminList() {
    const {user} = useAuthStore()
    const { setLoadPage, toggleForm, activarForm, isLoadPage } = usePageStore()
    const { deleteAdmin, setAdminSelected, loadAdmins, admins, adminSelected } = useAulaStore()

    useEffect(() => {
        if (!isLoadPage) {
            return
        }
        loadAdmins()
    }, [isLoadPage])


    const activarRowSelected = (id) => {
        if (adminSelected !== null && id === adminSelected.id) {
            return "table__row table__row__body table__row__body--activo"
        }
        return "table__row table__row__body"
    }

    const onSelected = (admin) => {
        setAdminSelected(admin)
        activarForm(false)
    }

    const onNuevo = () => {
        if (adminSelected !== null) {
            setAdminSelected(null)
            activarForm(true)
        } else {
            toggleForm()
        }
    }


    const onEliminar = async () => {
        setLoadPage(false)
        if (!confirm("¿Está seguro de eliminar?")) {
            return
        }
        if (adminSelected.username !== user.username) {
            await deleteAdmin(adminSelected.id)
        }

        setLoadPage(true)
    }

    return <div className="main__col main__col--izq">
        <div className="table">
            <TaskBar estaEn2doPlano={adminSelected !== null} onNuevo={onNuevo} onEliminar={onEliminar} />
            <div className="table__row table__row__header">
                <div className="table__col table__col--2x">Username</div>
                <div className="table__col table__col--1x"></div>
            </div>
            {
                admins.map(admin => {
                    return <div key={admin.id} className={activarRowSelected(admin.id)} onClick={() => onSelected(admin)}>
                        <div className="table__col table__col--2x">{admin.username}</div>
                        <div className="table__col table__col--1x"><span className={`circulo ${user.username===admin.username ? "circulo--activo" : undefined}`}>{user.username === admin.username?"Online":"Offline"}</span></div>
                    </div>
                })
            }
        </div>
    </div>
}

export default AdminList