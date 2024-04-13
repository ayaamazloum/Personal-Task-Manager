import './style.css'
import Logout from "../../Components/Logout"

const Board = ({ handleUserLogged }) => {
    return (
        <div>
            <Logout handleUserLogged={handleUserLogged} />
        </div>
    )
}

export default Board