import { useState } from "react"

const Task = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="flex column gap-10 primary-shadow white-bg padding sm-text full-width semi-rounded">
            <div className="flex space-between">
                <p>Title</p>
                <svg onClick={()=>setIsEditing(true)} className="edit-icon pointer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"></path>
                </svg>
            </div>
            <p className="xsm-text light-text">Description</p>

            {isEditing && 
                <div className="popup flex center">
                    <div className="popup-content semi-rounded">
                        <div className="popup-header flex row space-between gap-20">
                        <h3 className="popup-title bold">Edit Task</h3>
                        <img
                            onClick={() => {
                            setIsEditing(false);
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
                            value={title}
                        />
                        <textarea
                            onChange={(e)=>setDescription(e.target.value)}
                            className="border button-padding semi-rounded sm-text"
                            type="text"
                            value={description}
                        />
                        <button className="primary-bg white-text button-padding bold semi-rounded sm-text">Save</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Task