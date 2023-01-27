import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
//@ts-ignore
import { Fade } from 'react-reveal';
import ReviewList from '../components/ReviewList';

import { useQuery } from 'react-query';
import { readReview } from '../api';

const Detail = () => {
  const { kakao } = window;
  const location = useLocation();
  const detailData = location.state;
  const { data: reviewData, isLoading: reviewLoading } = useQuery(
    'reviews',
    readReview
  );
  const { id, title, name, long, leti, content, gene, date, position, image } =
    detailData;

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!document.getElementById('map')) {
    } else {
      const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(leti, long), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    }
  }, []);

  // 38 ~ 43 -> 조건문이 없으면 undefined에 할당할 수 없다고 하기 때문에 reviewData가 undefined라면 빈 배열을 반환 함.
  let itemData: reviewType[];
  if (reviewData === undefined) {
    itemData = [];
  } else {
    itemData = reviewData?.filter((data: reviewType) => data.cultureId === id);
  }

  // const itemData = reviewData?.filter((data: reviewType) => data.cultureId === id);
  if (reviewLoading) {
    return <div>리뷰 로딩중...</div>;
  }
  return (
    <Container>
      <Acontainer>
        <Fade duration={1000} delay={200}>
          <A1container>
            {image ? (
              <img
                src={image}
                style={{
                  height: 400,
                  width: 400,
                  borderRadius: '20px',
                }}
                alt="img"
              />
            ) : (
              <img
                src={'../../image/no-image.png'}
                style={{ height: 400, width: 400 }}
                alt="img"
              />
            )}
          </A1container>
        </Fade>

        <A2container>
          <Fade duration={1000} delay={500}>
            <Name>{name === ('' || null) ? '없음' : name}</Name>
          </Fade>
          <Fade duration={1000} delay={800}>
            <SubName>종목 : {title === ('' || null) ? '없음' : title}</SubName>
            <SubName>등록일 : {date === undefined ? '미상' : date}</SubName>
            <SubName>시대 : {gene === '' ? '미상' : gene}</SubName>
            <SubName>소재지 : {position === '' ? '없음' : position}</SubName>
          </Fade>
        </A2container>
      </Acontainer>

      <Fade duration={1000} delay={1100}>
        <Bcontainer>내용 : {content === '' ? '없음' : content}</Bcontainer>
      </Fade>

      <Fade duration={1000} delay={1400}>
        <Ccontainer>
          {long !== '0' ? (
            <div
              id="map"
              style={{ height: 400, width: '100%', borderRadius: '20px' }}
            ></div>
          ) : null}
        </Ccontainer>
      </Fade>
      <ReviewListWrap>
        <Fade duration={1000} delay={1600}>
          <ReviewButton
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            {toggle ? '리뷰닫기' : '리뷰보기'}
          </ReviewButton>
          {toggle ? <ReviewList itemData={itemData} cultureId={id} /> : <></>}
        </Fade>
      </ReviewListWrap>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  margin-inline: 100px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Acontainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const A1container = styled.div``;

const A2container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
`;

const Name = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 50px;
`;
const SubName = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Bcontainer = styled.div`
  margin-top: 50px;
`;
const Ccontainer = styled.div`
  margin-top: 50px;
`;
const ReviewListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ReviewButton = styled.button`
  width: 100px;
  height: 30px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: black;
  transition: 0.7s;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    color: black;
    border: 1px solid black;
    transition: 0.7s;
  }
`;
