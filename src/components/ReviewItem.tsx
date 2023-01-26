import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { deleteReview } from '../api';

function ReviewItem({ item }: { item: reviewType }) {
  const queryClient = useQueryClient();

  const { isLoading: deleteLoading, mutate: deleteMutate } =
    useMutation(deleteReview);

  const removeReview = () => {
    const promptPW = prompt('리뷰의 비밀번호를 입력해주세요.');
    if (promptPW === item.password) {
      deleteMutate(item, {
        onSuccess: () => {
          queryClient.invalidateQueries('reviews');
        },
      });
    } else if (promptPW === null) {
      alert('취소하셨습니다.');
    } else {
      alert('비밀번호가 맞지 않습니다.');
    }
  };
  if (deleteLoading) {
    return <div>리뷰 로딩중...</div>;
  }
  return (
    <Wrap>
      <NameDiv>닉네임 : {item?.name}</NameDiv>
      <BodyDiv>내용 : {item?.body}</BodyDiv>
      <button onClick={removeReview}>삭제</button>
    </Wrap>
  );
}

export default ReviewItem;

const Wrap = styled.div`
  width: 300px;
  margin: 20px;
`;
const NameDiv = styled.div``;
const BodyDiv = styled.div``;
