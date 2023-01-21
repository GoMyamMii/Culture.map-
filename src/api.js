import axios from 'axios';
import XMLParser from 'react-xml-parser';

const BASE_URL = 'https://www.cha.go.kr/cha/SearchKindOpenapiList.do?';
const IMAGE_URL = 'http://www.cha.go.kr/cha/SearchKindOpenapiDt.do?';

export const getSearchData = async ({ queryKey }) => {
  const [_, cityValue, careValue] = queryKey;
  return await axios
    .get(`${BASE_URL}ccbaCtcd=${cityValue}&ccbaKdcd=${careValue}&pageUnit=10`)
    .then((response) =>
      new XMLParser()
        .parseFromString(response.data)
        .children.slice(3)
        .map((item) => [
          {
            total: item.children[0].value,
            id: item.children[1].value,
            title: item.children[2].value.replaceAll('>', '').trim(),
            name: item.children[4].value.replaceAll('>', '').trim(),
            city: item.children[6].value.replaceAll('>', '').trim(),
            titleNum: item.children[9].value,
            cityNum: item.children[10].value,
            careNum: item.children[11].value,
            long: item.children[14].value,
            let: item.children[15].value,
          },
        ])
    );
};

// [1].value : 종목
// [2].value] : 고유번호
// [3].value]: 이름
// [9].value : 지정일
// [10].value : 위치(ex. 서울특별시)
// [13].value : 시대
// [18].value : 이미지url
// [19].value : 내용
export const getOneData = async ({ queryKey }) => {
  const [_, titleNum, cityNum, careNum] = queryKey;
  return await axios
    .get(
      `${IMAGE_URL}ccbaKdcd=${titleNum}&ccbaAsno=${careNum}&ccbaCtcd=${cityNum}`
    )
    .then(
      (response) =>
        new XMLParser().parseFromString(response.data).children.slice(6)[0]
          .children
    );
};
