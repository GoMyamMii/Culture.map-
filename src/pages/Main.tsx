import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getSearchData, todayCounter, todayVisit } from '../api';
import React, { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import MainCarousel from '../components/MainCarousel';
import styled from 'styled-components';
import { Fade } from 'react-reveal';

const Main = () => {
  const [cityValue, setCityValue] = useState('11');
  const [titleValue, setTitleValue] = useState('11');
  const [submitCity, setSubmitCity] = useState('11');
  const [submitTitle, setSubmitTitle] = useState('11');
  const [pageNumber, setPageNumber] = useState('1');

  const queryClient = useQueryClient();

  const { data: selectData, isLoading: selectLoading } = useQuery<any>(
    ['searchData', submitCity, submitTitle, pageNumber],
    getSearchData
  );
  const { isLoading: editLoading, mutate: countMutate } = useMutation(
    todayCounter,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('visitData');
      },
    }
  );
  const { data: visitData, isLoading: visitLoading } = useQuery(
    'visitData',
    todayVisit
  );

  const itemListData = selectData?.mappedItemData;
  const pageIndexData = selectData?.pageData;
  const page: number = Math.ceil(pageIndexData / 10);

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

  const clickPageNumber = (event: React.MouseEvent) => {
    setPageNumber((event.target as HTMLInputElement).value);
  };
  const pages = [];
  for (let i = 1; i < page + 1; i++) {
    pages.push(i);
  }

  useEffect(() => {
    countMutate();
  }, []);

  if (selectLoading) {
    return <div>로딩중입니다.</div>;
  }

  return (
    <MainContainer>
      {selectLoading ? null : (
        <>
          <MainCarousel />

          <SelectWrap>
            <Select onChange={selectCity}>
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
            <div>{itemListData[0][0].city}</div>
            <div>{itemListData[0][0].title}</div>
          </SelectWrap>
          <MainContents>
            <Fade bottom>
              <ListBox>
                <List>
                  {itemListData?.flat().map((item: ItemType) => (
                    <ListItem item={item} key={item.id} />
                  ))}
                </List>

                {pages.map((item) => (
                  <button onClick={clickPageNumber} value={item}>
                    {item}
                  </button>
                ))}
              </ListBox>
            </Fade>
          </MainContents>
        </>
      )}
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  max-width: 100%;
`;
const MainContents = styled.div`
  display: flex;
  justify-content: center;

  max-width: 1440px;
`;

const SelectWrap = styled.div`
  background-color: red;
  display: flex;
  width: 1440px;
  margin: 0 auto;
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

const ListBox = styled.div`
  width: 1440px;
  justify-content: center;
  margin: 0 auto;
  overflow: cover;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 1440px;
  height: auto;
`;
