import './App.css'
import { useState } from 'react'

import { v1 } from 'uuid'

type Person = {
  id: string
  name: string
}

type Board = {
  id: string
  title: string
  items: Person[]
}

type Boards = Board[]

function App() {
  const [boards, setBoards] = useState<Boards>([
    {
      id: v1(),
      title: 'users',
      items: [
        {
          id: v1(),
          name: 'Valera',
        },
        {
          id: v1(),
          name: 'Serega',
        },
      ],
    },
    {
      id: v1(),
      title: 'mentors',
      items: [
        {
          id: v1(),
          name: 'Dimych',
        },
        {
          id: v1(),
          name: 'Sveta',
        },
      ],
    },
  ])

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

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, board: Board, item: Person) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.style.boxShadow = 'none'
  }

  function dragDropHandler(e: React.DragEvent<HTMLDivElement>, board: Board, item: Person) {
    e.preventDefault()
    if (currentBoard) {
      const currentIndex = currentBoard.items.indexOf(currentItem as Person)

      currentBoard.items.splice(currentIndex, 1)
      const dropIndex = board.items.indexOf(item)

      board.items.splice(dropIndex + 1, 0, currentItem as Person)
      setBoards(
        boards.map(b => {
          if (b.id === board.id) {
            return board
          }
          if (b.id === currentBoard.id) {
            return currentBoard
          }

          return b
        })
      )
    }
    e.currentTarget.style.boxShadow = 'none'
  }

  function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: Board) {
    board.items.push(currentItem as Person)
    if (currentBoard) {
      const currentIndex = currentBoard.items.indexOf(currentItem as Person)

      currentBoard.items.splice(currentIndex, 1)
      setBoards(
        boards.map(b => {
          if (b.id === board.id) {
            return board
          }
          if (b.id === currentBoard.id) {
            return currentBoard
          }

          return b
        })
      )
    }
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <div className={'app'}>
      {boards.map(board => (
        <div
          key={board.id}
          className={'board'}
          onDragOver={e => dragOverHandler(e)}
          onDrop={e => dropCardHandler(e, board)}
        >
          <div className={'board-title'}>{board.title}</div>
          {board.items.map(item => (
            <div
              key={item.id}
              className={'item'}
              draggable={true}
              onDragOver={e => dragOverHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragStart={e => dragStartHandler(e, board, item)}
              onDragEnd={e => dragEndHandler(e)}
              onDrop={e => dragDropHandler(e, board, item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
