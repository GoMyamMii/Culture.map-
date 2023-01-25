import axios from 'axios';
//@ts-ignore <- 이거하면 밑에줄 코드(1줄) 자바스크립트로 인식함
import XMLParser from 'react-xml-parser';

const BASE_URL = 'https://www.cha.go.kr/cha/SearchKindOpenapiList.do?';
const IMAGE_URL = 'http://www.cha.go.kr/cha/SearchKindOpenapiDt.do?';

export const getSearchData = async ({ queryKey }: any) => {
  const [_, cityValue, careValue] = queryKey;
  return await axios
    .get(`${BASE_URL}ccbaCtcd=${cityValue}&ccbaKdcd=${careValue}&pageUnit=10`)
    .then((response) =>
      new XMLParser()
        .parseFromString(response.data)
        .children.slice(3)
        .map((item: any) => [
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
            leti: item.children[15].value,
          },
        ])
    );
};

export const getOneData = async ({ queryKey }: any) => {
  const [_, titleNum, cityNum, careNum] = queryKey;
  return await axios
    .get(
      `${IMAGE_URL}ccbaKdcd=${titleNum}&ccbaAsno=${careNum}&ccbaCtcd=${cityNum}`
    )
    .then((response) =>
      new XMLParser()
        .parseFromString(response.data)
        .children.slice(6)
        .map((item: any) => [
          {
            title: item.children[0].value,
            id: item.children[1].value,
            name: item.children[2].value.replaceAll('>', '').trim(),
            data: item.children[9].value.replaceAll('>', '').trim(),
            city: item.children[10].value.replaceAll('>', '').trim(),
            position: item.children[11].value.replaceAll('>', '').trim(),
            gene: item.children[13].value.replaceAll('>', '').trim(),
            image: item.children[18].value,
            content: item.children[19].value.replaceAll('>', '').trim(),
          },
        ])
    );
};
