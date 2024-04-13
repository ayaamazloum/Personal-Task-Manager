import Logout from "../../Components/Logout"

const Home = ({ handleUserLogged }) => {
  return (
    <div>
      <Logout handleUserLogged={handleUserLogged} />
    </div>
  )
}

export default Home