import styled from 'styled-components'

export const ContentBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 90vh;
`
export const BoardBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 300px;
  min-height: 400px;
  margin: 10px;
  padding: 20px 10px;

  border: 5px solid lightblue;
  border-radius: 12px;
`
export const BoardTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`
export const Item = styled.div`
  cursor: grab;

  width: 100%;
  margin: 5px 0;
  padding: 10px;

  background-color: #e7fdd8;
  border: 2px solid lightpink;
  border-radius: 6px;
`
