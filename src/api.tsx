import axios from 'axios';
//@ts-ignore <- 이거하면 밑에줄 코드(1줄) 자바스크립트로 인식함
import XMLParser from 'react-xml-parser';

const BASE_URL = 'https://www.cha.go.kr/cha/SearchKindOpenapiList.do?';
const IMAGE_URL = 'http://www.cha.go.kr/cha/SearchKindOpenapiDt.do?';

export const getSearchData = async (item: any) => {
  console.log('씨티밸류~', item.cityValue);
  console.log('타이틀밸류~', item.titleValue);
  if (item.cityValue && item.titleValue) {
    return await axios
      .get(
        `${BASE_URL}ccbaCtcd=${item.cityValue}&ccbaKdcd=${item.titleValue}&pageUnit=10`
      )
      .then((response) =>
        new XMLParser()
          .parseFromString(response.data)
          .children.slice(3)
          .map((item: ItemType) => [
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
  }
};

export const getOneData = async (item: any) => {
  console.log('애애ㅐ앵', item.titleNum);
  return await axios
    .get(
      `${IMAGE_URL}ccbaKdcd=${item.titleNum}&ccbaAsno=${item.careNum}&ccbaCtcd=${item.cityNum}`
    )
    .then((response) =>
      new XMLParser()
        .parseFromString(response.data)
        .children.slice(6)
        .map((item: ItemType) => [
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
