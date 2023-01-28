import { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { BiUser } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';

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
        <NameDiv>
          <BiUser />
          &nbsp; {item?.name}
        </NameDiv>
        <BodyDiv>{item?.body}</BodyDiv>
        <DeleteBtn onClick={removeModal}>
          <FiTrash2 size="15" />
        </DeleteBtn>
      </Wrap>
    </div>
  );
}

export default ReviewItem;

const Wrap = styled.div`
  width: 700px;
  margin: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #efefef84;
`;
const NameDiv = styled.div`
  margin: 10px;
`;

const BodyDiv = styled.div`
  margin: 10px;
`;

const DeleteBtn = styled.button`
  margin: 10px;
  border: none;
  background-color: #efefef84;
  &:hover {
    transform: scale(1.2);
  }
`;
