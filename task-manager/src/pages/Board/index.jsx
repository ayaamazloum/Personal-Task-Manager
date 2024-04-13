import "./style.css";
import Logout from "../../Components/Logout";
import Column from "./Components/Column";

const Board = ({ handleUserLogged }) => {
    return (
        <div className="flex column start-center mt-30 gap-40">
            <Logout handleUserLogged={handleUserLogged} />
            <h2>Board Title</h2>
            <button className="primary-bg white-text button-padding bold semi-rounded sm-text">+ Create Task</button>
            <div className="flex row center gap-20">
                <Column />
                <Column />
                <Column />
            </div>
        </div>
    );
};

export default Board;
