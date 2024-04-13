import Task from "./Task"

const Column = () => {
    return (
        <div className="board-column flex column gap-20 center light-bg rounded padding">
            <p className="bold">Todo</p>
            <div className="flex column gap-10 full-width">
                <Task />
                <Task />
                <Task />
                <Task />
            </div>
        </div>
    )
}

export default Column