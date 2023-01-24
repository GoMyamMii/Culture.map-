import { useQuery } from 'react-query';
import { getSearchData } from '../api';
import { useState } from 'react';
import ListItem from '../components/ListItem';
import MainCarousel from '../components/MainCarousel';

const Main = () => {
  const [cityValue, setCityValue] = useState('');
  const [titleValue, setTitleValue] = useState('');

  const { data: selectData, isLoading: selectLoading } = useQuery(
    ['cityData', cityValue, titleValue],
    getSearchData
  );

  const selectCity = (event) => {
    setCityValue(event.target.value);
  };
  const selectTitle = (event) => {
    setTitleValue(event.target.value);
  };

  if (selectLoading) {
    <div>로딩중입니다.</div>;
  }

  return (
    <div>
      <MainCarousel />
      <select onChange={selectCity}>
        <option value="ZZ">지역</option>
        <option value="11">서울</option>
        <option value="21">부산</option>
        <option value="22">대구</option>
        <option value="23">인천</option>
        <option value="24">광주</option>
        <option value="25">대전</option>
        <option value="26">울산</option>
        <option value="45">세종</option>
        <option value="31">경기</option>
        <option value="32">강원</option>
        <option value="33">충북</option>
        <option value="34">충남</option>
        <option value="35">전북</option>
        <option value="36">전남</option>
        <option value="37">경북</option>
        <option value="38">경남</option>
        <option value="50">제주</option>
      </select>
      <select onChange={selectTitle}>
        <option value="0">문화재종목</option>
        <option value="11">국보</option>
        <option value="12">보물</option>
        <option value="13">사적</option>
        <option value="15">명승</option>
        <option value="16">천연기념물</option>
        <option value="17">국가무형문화재</option>
        <option value="18">국가민속문화재</option>
        <option value="21">시도유형문화재</option>
        <option value="22">시도무형문화재</option>
        <option value="23">시도기념물</option>
        <option value="24">시도민속문화재</option>
        <option value="25">시도등록문화재</option>
        <option value="31">문화재자료</option>
        <option value="79">국가등록문화재</option>
      </select>
      {/* <button onClick={submitCategoty}>검색</button> */}
      {selectData?.flat().map((item) => (
        <ListItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Main;
