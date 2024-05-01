import AdminList from '../components/AdminList'
import FormAdmin from '../components/FormAdmin'
import Navbar from '../components/Navbar'

function Admin() {
    return <div className="app">
        <Navbar />
        <div className="main main__col">
            <AdminList />
            <FormAdmin />
        </div>
    </div>
}

export default Admin