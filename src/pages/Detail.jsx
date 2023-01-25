import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import noImg from '../image/no-image.png';
import { Fade } from 'react-reveal';
import '../scroll.css';

const { kakao } = window;
const Detail = () => {
  const location = useLocation();
  const detailData = location.state;
  const { title, name, long, leti, content, gene, date, position, image } =
    detailData;

  // const containerRef = useRef();
  // const AcontainerRef = useRef();
  // const BcontainerRef = useRef();
  // const CcontainerRef = useRef();

  useEffect(() => {
    if (!document.getElementById('map')) {
      console.log('무야호');
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

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.style.opacity = 1;
  //         entry.target.style.transition = 'opacity 1s';
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   });

  //   observer.observe(containerRef.current);
  //   observer.observe(AcontainerRef.current);
  //   observer.observe(BcontainerRef.current);
  //   observer.observe(CcontainerRef.current);
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <Container>
      <Acontainer>
        <Fade duration={2000} delay={500}>
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
              <img src={noImg} style={{ height: 400, width: 400 }} alt="img" />
            )}
          </A1container>
        </Fade>

        <A2container>
          <Fade duration={4000} delay={1000}>
            <Name>{name === ('' || null) ? '없음' : name}</Name>
          </Fade>
          <Fade duration={6000} delay={2000}>
            <SubName>종목 : {title === ('' || null) ? '없음' : title}</SubName>
            <SubName>등록일 : {date === undefined ? '미상' : date}</SubName>
            <SubName>시대 : {gene === '' ? '미상' : gene}</SubName>
            <SubName>소재지 : {position === '' ? '없음' : position}</SubName>
          </Fade>
        </A2container>
      </Acontainer>

      <Fade duration={8000} delay={4000}>
        <Bcontainer>내용 : {content === '' ? '없음' : content}</Bcontainer>
      </Fade>

      <Fade duration={10000} delay={8000}>
        <Ccontainer>
          {long !== 0 ? (
            <div
              id="map"
              style={{ height: 400, width: '100%', borderRadius: '20px' }}
            ></div>
          ) : null}
        </Ccontainer>
      </Fade>
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
