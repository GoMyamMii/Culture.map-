import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { deleteReview } from '../api';

export default function Modal({
  item,
  setDeleteToggle,
}: {
  item: reviewType;
  setDeleteToggle: Dispatch<SetStateAction<boolean>>;
}) {
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();
  const { isLoading: deleteLoading, mutate: deleteMutate } =
    useMutation(deleteReview);

  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const removeReview = () => {
    if (password === item.password) {
      deleteMutate(item, {
        onSuccess: () => {
          queryClient.invalidateQueries('reviews');
        },
      });
    } else {
      alert('비밀번호가 맞지 않습니다.');
      setDeleteToggle(false);
    }
  };
  return (
    <Wrap>
      <Box>
        <TitleText>정말 삭제하시겠습니까?</TitleText>
        <Text>리뷰 비밀번호를 입력 후 엔터를 눌러주세요.</Text>
        <form onSubmit={removeReview}>
          <Input
            maxLength={8}
            onChange={changePassword}
            placeholder="비밀번호"
          />
        </form>
        <Button type="button" onClick={() => setDeleteToggle(false)}>
          삭제 취소
        </Button>
      </Box>
    </Wrap>
  );
}
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: #000000a2;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 200px;
  background-color: #242c44;
  border-radius: 20px;
`;
const TitleText = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  color: white;
`;
const Text = styled.div`
  margin: 10px;
  color: white;
`;
const Input = styled.input`
  color: white;
  text-align: center;
  height: 20px;
  margin: 10px;
  background-color: inherit;
  border: none;
  border: 1px solid white;
  border-radius: 15px;
`;
const Button = styled.button`
  border: none;
  border: 1px solid white;
  border-radius: 10px;
  transition: 0.7s;
  &:hover {
    background-color: black;
    color: white;
    cursor: pointer;
    transition: 0.7s;
  }
`;
