import "./style.css";
import Logout from "../../Components/Logout";
import Column from "./components/Column";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sendRequest from "../../core/tools/remote/request";
import { requestMehods } from "../../core/enums/requestMethods";
import { useParams } from "react-router-dom";
import { selectBoard, addBoard } from "../../Redux/boardSlice";

const Board = () => {
  const [creatingTask, setCreatingTask] = useState(false);
  const [addingTag, setAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const { boardId } = useParams();

  const dispatch = useDispatch();

  const boardState = useSelector((global) => global.board);
  const tagState = useSelector((global) => global.tag);
  const columnState = useSelector((global) => global.column);

  const currentBoard = boardState.currentSelected;

  const tags = tagState.tags.filter((tag) => tag.boardId === boardId);
  console.log(tags);
  
  const columns = columnState.columns.filter((column) => column.boardId === boardId);
  console.log(columns);
  
  const handleChange = (event) => {
    setSelectedTag(event.target.value);
  };

  useEffect(() => {
    const board = boardState.boards.find((board) => board.id === boardId);
    dispatch(selectBoard(board));
    console.log("dfdvdfecerce"+currentBoard);
  }, [boardState.boards]);
  
  return (
    <div className="flex column start-center mt-30 gap-40">
      <Logout />
      <h2>{currentBoard?.name}</h2>

      <div className="flex center gap-40 wrap">
        <div className="flex center gap-20">
          <select className="semi-rounded sm-text padding">
            <option value="">Board Tags</option>
            {tags.map((tag) => <option>{tag.name}</option>)}
          </select>
        </div>

        <button
          onClick={() => setAddingTag(true)}
          className="primary-bg white-text button-padding bold semi-rounded sm-text"
        >
          + Add Tag
        </button>
        
        <button
          onClick={() => setCreatingTask(true)}
          className="primary-bg white-text button-padding bold semi-rounded sm-text"
        >
          + Create Task
        </button>
      </div>

      <div className="flex row center gap-20 wrap">
        {columns.map((column, i) => <Column key={i} column={column} />)}
      </div>

      {addingTag && (
        <div className="popup flex center">
          <div className="popup-content semi-rounded">
            <div className="popup-header flex row space-between gap-20">
              <h3 className="popup-title bold">Add Tag</h3>
              <img
                onClick={() => {
                  setAddingTag(false);
                }}
                className="close-popup-icon pointer"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACPklEQVR4nO3bS0oDURCF4eMuxIEIugDfxq6gLs+Z23PiDnzF9DwSyAUJJm0Hu++pqvNDZiJVfl7TaVpAKaWUUkoppZRSSql8HSNvxyDrEUAL4AH5MgBfAJ4A7IEEY7F6ZUOxFUbZvzrKT4xsKLaGUR3lN4wsKLYBoxrKNozoKNaBMTrKCYD5HwZarL5uijhNe+6+/FmNUvPH35JIJ8XYd86EYl52zYBi3naMjGJed4uIYt53ioRiUXaJgGIBdgiDYo5nD4diDmcOi2KOZg2PYg5mTINixLOlQzHCmdKiGNEsyI5iBDNQVRPFhMGDYsLgQTFh8KCYMHhQTBg8KCYMHhQTBg+KCYMHxYTBg2LC4HpKcJ70aUrak7LQvSlfKG2GG4VeUFph8KC0wuBBaYUxbI1AeGr0J4unRm/qPDW67OWp0QdDnxhz3ToZtlsAs56XtgyPGIXsdgeMklCIMEpCqYRxv+V7CYUIoyQUIoySUHp2AeB9IIySUAbCuMPuCYUIoySUf8CYAZjg/xLKWucVMUpC+YHxVhmjlB6lD8bnwBjpURgx0p4UZox0KH0xbirOGh7lzBFGeBSPGGFRPGOEQ4mAEQYlEoZ7lCXGaw+Ma/ip8YZyGhjDHUoGDDcofTA+nGPQo/R5A1/ear9E3n9EnYwx1CGAl0QnY9eT8gzgACPVhbLEuELcmg6UUTG6UKJjdKFUwdiEkgVjE0pVjHWUbBjrKBQYpaPV1VfWJgD2aw+hlFJKKaWUUkoppRRG7Bvth+BAB0h1gQAAAABJRU5ErkJggg=="
              />
            </div>
            <div className="popup-body flex column mt-30 gap-30 center">
              <input
                onChange={(e) => setNewTagName(e.target.value)}
                className="border button-padding semi-rounded sm-text"
                type="text"
                placeholder="Name"
              />
              <button className="primary-bg white-text button-padding bold semi-rounded sm-text">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {creatingTask && (
        <div className="popup flex center">
          <div className="popup-content semi-rounded">
            <div className="popup-header flex row space-between gap-20">
              <h3 className="popup-title bold">Create Task</h3>
              <img
                onClick={() => {
                  setCreatingTask(false);
                }}
                className="close-popup-icon pointer"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACPklEQVR4nO3bS0oDURCF4eMuxIEIugDfxq6gLs+Z23PiDnzF9DwSyAUJJm0Hu++pqvNDZiJVfl7TaVpAKaWUUkoppZRSSql8HSNvxyDrEUAL4AH5MgBfAJ4A7IEEY7F6ZUOxFUbZvzrKT4xsKLaGUR3lN4wsKLYBoxrKNozoKNaBMTrKCYD5HwZarL5uijhNe+6+/FmNUvPH35JIJ8XYd86EYl52zYBi3naMjGJed4uIYt53ioRiUXaJgGIBdgiDYo5nD4diDmcOi2KOZg2PYg5mTINixLOlQzHCmdKiGNEsyI5iBDNQVRPFhMGDYsLgQTFh8KCYMHhQTBg8KCYMHhQTBg+KCYMHxYTBg2LC4HpKcJ70aUrak7LQvSlfKG2GG4VeUFph8KC0wuBBaYUxbI1AeGr0J4unRm/qPDW67OWp0QdDnxhz3ToZtlsAs56XtgyPGIXsdgeMklCIMEpCqYRxv+V7CYUIoyQUIoySUHp2AeB9IIySUAbCuMPuCYUIoySUf8CYAZjg/xLKWucVMUpC+YHxVhmjlB6lD8bnwBjpURgx0p4UZox0KH0xbirOGh7lzBFGeBSPGGFRPGOEQ4mAEQYlEoZ7lCXGaw+Ma/ip8YZyGhjDHUoGDDcofTA+nGPQo/R5A1/ear9E3n9EnYwx1CGAl0QnY9eT8gzgACPVhbLEuELcmg6UUTG6UKJjdKFUwdiEkgVjE0pVjHWUbBjrKBQYpaPV1VfWJgD2aw+hlFJKKaWUUkoppRRG7Bvth+BAB0h1gQAAAABJRU5ErkJggg=="
              />
            </div>
            <div className="popup-body flex column mt-30 gap-30 center">
              <input
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="border button-padding semi-rounded sm-text"
                type="text"
                placeholder="Title"
              />
              <textarea
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="border button-padding semi-rounded sm-text"
                type="text"
                placeholder="Description"
              />
              <div className="flex center gap-20">
                <label htmlFor="selectMenu">Choose a tag</label>
                <select
                  className="semi-rounded sm-text padding"
                  value={selectedTag}
                  onChange={handleChange}
                >
                  <option value="option1">Tag 1</option>
                  <option value="option2">Tag 2</option>
                  <option value="option3">Tag 3</option>
                </select>
              </div>
              <button className="primary-bg white-text button-padding bold semi-rounded sm-text">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
