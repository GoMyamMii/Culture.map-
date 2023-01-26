import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { createReview } from '../api';
import ReviewItem from './ReviewItem';

const ReviewList = ({
  itemData,
  cultureId,
}: {
  itemData: reviewType[];
  cultureId: string;
}) => {
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
  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMutate(
      { cultureId, name, password, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('reviews');
        },
      }
    );
    setName('');
    setPassword('');
    setBody('');
  };

  if (createLoading) {
    return <div> 리뷰를 작성중입니다.</div>;
  }

  return (
    <div>
      <Form onSubmit={submitReview}>
        <div>
          <NameInput
            maxLength={10}
            onChange={onChangeName}
            value={name}
            placeholder="닉네임"
            required
          />
          <PasswordInput
            maxLength={4}
            onChange={onPasswordName}
            value={password}
            placeholder="비밀번호"
            required
          />
        </div>
        <div>
          <BodyInput
            maxLength={48}
            onChange={onBodyName}
            value={body}
            placeholder="내용"
            required
          />
        </div>
        <div>
          <button>작성</button>
        </div>
      </Form>
      {itemData?.map((item: reviewType) => (
        <ReviewItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ReviewList;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NameInput = styled.input`
  width: 80px;
  height: 20px;
  margin: 5px;
  padding-left: 10px;
  background-color: #cdcdcd;
  color: white;
  border: none;
  border-radius: 15px;
`;

const PasswordInput = styled.input`
  width: 80px;
  height: 20px;
  margin: 5px;
  padding-left: 10px;
  background-color: #cdcdcd;
  color: white;
  border: none;
  border-radius: 15px;
`;

const BodyInput = styled.input`
  width: 200px;
  height: 20px;
  margin: 5px;
  padding-left: 10px;
  background-color: #cdcdcd;
  color: white;
  border: none;
  border-radius: 15px;
`;

const SubmitButton = styled.button``;
