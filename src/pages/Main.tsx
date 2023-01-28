import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getSearchData, todayCounter, totalVisit } from '../api';
import React, { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import MainCarousel from '../components/MainCarousel';
import styled from 'styled-components';
import { Fade } from 'react-reveal';
import { nanoid } from 'nanoid';
import Pagination from '../components/Pagination';

const Main = () => {
  const [cityValue, setCityValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [submitCity, setSubmitCity] = useState('');
  const [submitTitle, setSubmitTitle] = useState('');
  const [pageNumber, setPageNumber] = useState('1');
  const [limit, setLimit] = useState(16);

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

  const itemListData = selectData?.mappedItemData;
  const pageIndexData = selectData?.pageData;
  const page: number = Math.ceil(pageIndexData / 16);

  const handleSearchBtnClick = (cityValue: string, titleValue: string) => {
    setPageNumber('1');
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

  return (
    <MainContainer>
      <MainCarousel />
      {selectLoading ? (
        <LoadingWrap>로딩중입니다.</LoadingWrap>
      ) : (
        <>
          <SelectWrap>
            <Select onChange={selectCity}>
              <option value="">지역 전체</option>
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
              <option value="">종목 전체</option>
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
            <SelectTextContainer>
              <SelectTextBox>
                {submitCity ? itemListData[0][0].city : '전체 지역'}
                /&nbsp;
              </SelectTextBox>
              <SelectTextBox>
                {submitTitle ? itemListData[0][0].title : '전체 종목'}
              </SelectTextBox>
            </SelectTextContainer>
          </SelectWrap>
          <MainContents>
            <Fade bottom>
              <ListBox>
                <List>
                  {itemListData?.flat().map((item: ItemType) => (
                    <ListItem item={item} key={item.id} />
                  ))}
                </List>
                <CurrentTotalPage>
                  {pageNumber}/{pages.slice(-1)}
                </CurrentTotalPage>

                {/* 페이지네이션 컴포넌트 */}
                <Pagination
                  limit={limit} // 현재 한페이지에 표시되는 글개수
                  total={pages} // 현재 모든페이지 수(그러나 빈배열로나옴)
                  page={pageNumber} // 페이지번호
                  setPage={setPageNumber}
                />
                {/* {pages.map((item) => (
                    <button
                      onClick={clickPageNumber}
                      value={item}
                      key={nanoid()}
                    >
                      {item}
                    </button>
                  ))} */}
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  max-width: 100%;
`;
const LoadingWrap = styled.div`
  width: 100vh;
  height: 500px;
  text-align: center;
  padding-top: 30px;
`;
const MainContents = styled.div`
  display: flex;
  justify-content: center;

  max-width: 1440px;
`;

const SelectWrap = styled.div`
  display: flex;
  width: 1440px;
  margin: 20px 0;
`;
const Select = styled.select`
  margin-right: 10px;
  padding: 10px;
  width: 200px;
  height: 40px;

  text-align: center;
  font-size: 18px;
  font-weight: 600;

  border-radius: 10px;
  border: 1px solid black;
`;

const SearchBtn = styled.button`
  width: 200px;
  height: 40px;

  text-align: center;
  font-size: 18px;
  font-weight: 600;

  border-radius: 10px;
  border: none;
  background-color: #242c44;
  color: white;
  cursor: pointer;
`;

const SelectTextContainer = styled.div`
  display: flex;
  margin-left: 20px;
`;

const SelectTextBox = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
`;

const ListBox = styled.div`
  width: 1440px;
  justify-content: center;
  margin: 0 auto;
  overflow: cover;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
`;
const CurrentTotalPage = styled.div`
  text-align: center;
`;
