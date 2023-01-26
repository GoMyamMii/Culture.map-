import React, { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { createReview } from '../api';
import ReviewItem from './ReviewItem';

function ReviewList() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [body, setBody] = useState('');
  const { isLoading: createLoading, mutate: createMutate } =
    useMutation(createReview);
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onPasswordName = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onBodyName = (event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };
  const submitReview = () => {
    createMutate(
      { name, password, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('reviews');
        },
      }
    );
    if (!createLoading) {
      setName('');
      setPassword('');
      setBody('');
    }
  };
  return (
    <div>
      <div>
        <NameInput onChange={onChangeName} placeholder="닉네임" />
        <PasswordInput onChange={onPasswordName} placeholder="비밀번호" />
      </div>
      <div>
        <BodyInput onChange={onBodyName} placeholder="내용" />
      </div>
      <div>
        <button onClick={submitReview}>작성</button>
      </div>
      <ReviewItem />
    </div>
  );
}

export default ReviewList;

const NameInput = styled.input`
  width: 100px;
`;

const PasswordInput = styled.input`
  width: 100px;
`;

const BodyInput = styled.input`
  width: 200px;
`;
