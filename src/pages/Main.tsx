import { useInfiniteQuery, useQuery } from 'react-query';
import { getSearchData } from '../api';
import React, { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import MainCarousel from '../components/MainCarousel';
import styled from 'styled-components';

const Main = () => {
  const [cityValue, setCityValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [submitCity, setSubmitCity] = useState('11');
  const [submitTitle, setSubmitTitle] = useState('11');

  const { data: selectData, isLoading: selectLoading } = useInfiniteQuery(
    ['searchData', submitCity, submitTitle],

    getSearchData
  );

  //console.log('data: ', selectData?.pages[0]);

  // const datas: any = selectData;
  // console.log(datas);

  const {
    data: datas,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['searchData', submitCity, submitTitle],
    getSearchData,
    // ({ pageParam = 1 }) => getSearchData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    }
  );

  const handleSearchBtnClick = (cityValue: string, titleValue: string) => {
    setSubmitCity(cityValue);
    setSubmitTitle(titleValue);
  };

  const selectCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCityValue(event.target.value);
  };
  const selectTitle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTitleValue(event.target.value);
  };

  useEffect(() => {
    let fetching = false;

    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  if (selectLoading) {
    return <div>로딩중입니다.</div>;
  }
  return (
    <div>
      {selectLoading ? null : (
        <div>
          <MainCarousel />
          <SelectWrap>
            <Select onChange={selectCity}>
              <option value="11">지역</option>
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
            </Select>
            <Select onChange={selectTitle}>
              <option value="11">문화재종목</option>
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
            </Select>
            <SearchBtn
              onClick={() => {
                handleSearchBtnClick(cityValue, titleValue);
              }}
            >
              검색
            </SearchBtn>
          </SelectWrap>
          <List>
            {datas?.pages[0].flat().map((item: ItemType) => (
              <ListItem item={item} key={item.id} />
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default Main;

const SelectWrap = styled.div`
  margin-left: 50px;
  display: flex;
`;
const Select = styled.select`
  margin-right: 5px;
  padding-left: 5px;
  width: 100px;
  height: 20px;
  border-radius: 20px;
  border: none;
  background-color: #b5b5b5;
`;

const SearchBtn = styled.button`
  width: 100px;
  height: 20px;
  border-radius: 20px;
  border: none;
  background-color: #666;
  color: white;
  padding-left: 5px;
  cursor: pointer;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
