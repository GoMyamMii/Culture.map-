import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
const { kakao } = window;
const Detail = () => {
  const location = useLocation();
  const detailData = location.state;
  const { title, name, long, leti, content, gene, date, position, image } =
    detailData;
  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(leti, long), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <div>
      <img src={image} style={{ height: 400, width: 400 }} />
      <div>종목 : {title}</div>
      <div>이름 : {name}</div>
      <div>시대 : {gene}</div>
      <div>등록일 : {date}</div>
      <div>소재지 : {position}</div>
      <div>내용 : {content}</div>
      <div id="map" style={{ height: 400, width: 400 }}></div>
    </div>
  );
};

export default Detail;
