import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { usersSelect } from '../../../app/model/selectors.ts'
import { Board, Person, usersActions } from '../../../app/model/slice.ts'
import { BoardBlock, BoardTitle, ContentBlock, Item } from '../../../app/ui/styled.ts'

export const Content = () => {
  const boards = useSelector(usersSelect)
  const dispatch = useDispatch()

  const [currentBoard, setCurrentBoard] = useState<Board | null>(null)
  const [currentItem, setCurrentItem] = useState<Person | null>(null)

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (e.currentTarget.className == 'item') {
      e.currentTarget.style.boxShadow = '0 4px 3px gray'
    }
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.style.boxShadow = 'none'
  }

  function dragStartHandler(board: Board, item: Person) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.style.boxShadow = 'none'
  }

  function dragDropHandler(e: React.DragEvent<HTMLDivElement>, board: Board, item: Person) {
    e.preventDefault()
    if (currentBoard && currentItem) {
      dispatch(
        usersActions.dragPersonToBoard({
          currentBoardId: currentBoard.id,
          currentItemId: currentItem.id,
          targetBoardId: board.id,
          targetItemId: item.id,
        })
      )
    }
    e.currentTarget.style.boxShadow = 'none'
  }

  function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: Board) {
    if (currentBoard && currentItem) {
      dispatch(
        usersActions.dropPersonOnBoard({
          currentBoardId: currentBoard.id,
          currentItemId: currentItem.id,
          targetBoardId: board.id,
        })
      )
    }

    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <ContentBlock>
      {boards.map(board => (
        <BoardBlock
          key={board.id}
          onDragOver={e => dragOverHandler(e)}
          onDrop={e => dropCardHandler(e, board)}
        >
          <BoardTitle>{board.title}</BoardTitle>
          {board.items.map(item => (
            <Item
              key={item.id}
              draggable={true}
              onDragOver={e => dragOverHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragStart={() => dragStartHandler(board, item)}
              onDragEnd={e => dragEndHandler(e)}
              onDrop={e => dragDropHandler(e, board, item)}
            >
              {item.name}
            </Item>
          ))}
        </BoardBlock>
      ))}
    </ContentBlock>
  )
}
