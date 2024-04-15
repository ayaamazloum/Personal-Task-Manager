const BoardCard = ({onClick, board}) => {
  return (
    <div onClick={onClick} className='primary-border small-card-padding rounded pointer primary-shadow'>
      {board.name}
    </div>
  )
}

export default BoardCard