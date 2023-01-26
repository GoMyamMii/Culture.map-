import { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

function ReviewItem({ item }: { item: reviewType }) {
  const [deleteToggle, setDeleteToggle] = useState(false);

  const removeModal = () => {
    setDeleteToggle(true);
  };

  return (
    <div>
      {deleteToggle ? (
        <Modal item={item} setDeleteToggle={setDeleteToggle} />
      ) : (
        <div></div>
      )}
      <Wrap>
        <NameDiv>닉네임 : {item?.name}</NameDiv>
        <BodyDiv>내용 : {item?.body}</BodyDiv>
        <button onClick={removeModal}>삭제</button>
      </Wrap>
    </div>
  );
}

export default ReviewItem;

const Wrap = styled.div`
  width: 300px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NameDiv = styled.div``;
const BodyDiv = styled.div``;
