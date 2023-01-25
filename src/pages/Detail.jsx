import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import noImg from '../image/no-image.png';
const { kakao } = window;
const Detail = () => {
  const location = useLocation();
  const detailData = location.state;
  const { title, name, long, leti, content, gene, date, position, image } =
    detailData;
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

  return (
    <div>
      {image ? (
        <img src={image} style={{ height: 400, width: 400 }} alt="img" />
      ) : (
        <img src={noImg} style={{ height: 400, width: 400 }} alt="img" />
      )}
      <div>종목 : {title === ('' || null) ? '없음' : title}</div>
      <div>이름 : {name === ('' || null) ? '없음' : name}</div>
      <div>시대 : {gene === '' ? '미상' : gene}</div>
      <div>등록일 : {date === undefined ? '미상' : date}</div>
      <div>소재지 : {position === '' ? '없음' : position}</div>
      <div>내용 : {content === '' ? '없음' : content}</div>
      {long !== 0 ? (
        <div id="map" style={{ height: 400, width: 400 }}></div>
      ) : null}
    </div>
  );
};

export default Detail;
