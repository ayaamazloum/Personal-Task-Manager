import './style.css'
import Logout from "../../Components/Logout"
import BoardCard from "./Components/BoardCard"

const Home = ({ handleUserLogged }) => {
  return (
    <div className="page home center flex column center gap-50">
      <Logout handleUserLogged={handleUserLogged} />
      <h1>Boards</h1>
      <div className="flex row center wrap gap-30">
        <BoardCard />
        <BoardCard />
        <BoardCard />
      </div>
    </div>
  )
}

export default Home