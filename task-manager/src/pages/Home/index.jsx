import "./style.css";
import Logout from "../../Components/Logout";
import BoardCard from "./Components/BoardCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sendRequest from "../../core/tools/remote/request";
import { requestMehods } from "../../core/enums/requestMethods";
import { addBoard } from "../../Redux/boardSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [newBoard, setNewBoard] = useState(false);
  const [title, setTitle] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boardState = useSelector((global) => global.board);

  const handleCreateBoard = async () => {
    const { data } = await sendRequest(requestMehods.POST, "/board", { title });

    const newBoard = {
      id: data.board._id,
      name: title,
    };
    dispatch(addBoard(newBoard));

    setNewBoard(false);
    setTitle('');
  }

  return (
    <div className="page home center flex column start-center gap-70 mt-30">
      <Logout />
      <h1>Boards</h1>
      <button
        onClick={() => setNewBoard(true)}
        className="primary-bg white-text button-padding sm-text semi-rounded"
      >
        + New Board
      </button>
      <div className="flex row center wrap gap-30 full-height">
        {boardState.boards.map((board) => {
          return <BoardCard key={board.id} onClick={()=>navigate(`/board/${board.id}`)} board={board} />
        })}
      </div>

      {newBoard && (
        <div className="popup flex center">
          <div className="popup-content semi-rounded">
            <div className="popup-header flex row space-between gap-20">
              <h3 className="popup-title bold">New Board</h3>
              <img
                onClick={() => {
                  setNewBoard(false);
                }}
                className="close-popup-icon pointer"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACPklEQVR4nO3bS0oDURCF4eMuxIEIugDfxq6gLs+Z23PiDnzF9DwSyAUJJm0Hu++pqvNDZiJVfl7TaVpAKaWUUkoppZRSSql8HSNvxyDrEUAL4AH5MgBfAJ4A7IEEY7F6ZUOxFUbZvzrKT4xsKLaGUR3lN4wsKLYBoxrKNozoKNaBMTrKCYD5HwZarL5uijhNe+6+/FmNUvPH35JIJ8XYd86EYl52zYBi3naMjGJed4uIYt53ioRiUXaJgGIBdgiDYo5nD4diDmcOi2KOZg2PYg5mTINixLOlQzHCmdKiGNEsyI5iBDNQVRPFhMGDYsLgQTFh8KCYMHhQTBg8KCYMHhQTBg+KCYMHxYTBg2LC4HpKcJ70aUrak7LQvSlfKG2GG4VeUFph8KC0wuBBaYUxbI1AeGr0J4unRm/qPDW67OWp0QdDnxhz3ToZtlsAs56XtgyPGIXsdgeMklCIMEpCqYRxv+V7CYUIoyQUIoySUHp2AeB9IIySUAbCuMPuCYUIoySUf8CYAZjg/xLKWucVMUpC+YHxVhmjlB6lD8bnwBjpURgx0p4UZox0KH0xbirOGh7lzBFGeBSPGGFRPGOEQ4mAEQYlEoZ7lCXGaw+Ma/ip8YZyGhjDHUoGDDcofTA+nGPQo/R5A1/ear9E3n9EnYwx1CGAl0QnY9eT8gzgACPVhbLEuELcmg6UUTG6UKJjdKFUwdiEkgVjE0pVjHWUbBjrKBQYpaPV1VfWJgD2aw+hlFJKKaWUUkoppRRG7Bvth+BAB0h1gQAAAABJRU5ErkJggg=="
              />
            </div>
            <div className="popup-body flex column mt-30 gap-30 center">
              <input
                onChange={(e)=>setTitle(e.target.value)}
                className="border button-padding semi-rounded sm-text"
                type="text"
                placeholder="Board title"
              />
              {title.length > 0 &&
                <button
                  onClick={handleCreateBoard}
                  className="primary-bg white-text button-padding bold semi-rounded sm-text">Create</button>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
