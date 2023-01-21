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
export const getImage = async ({ queryKey }) => {
  const [_, titleNum, cityNum, careNum] = queryKey;
  return await axios
    .get(
      `${IMAGE_URL}ccbaKdcd=${titleNum}&ccbaAsno=${careNum}&ccbaCtcd=${cityNum}`
    )
    .then(
      (response) =>
        new XMLParser().parseFromString(response.data).children.slice(6)[0]
          .children[18].value
    );
};

// export const getCultureData = () => {
//   return axios.get(`https://www.cha.go.kr/cha/SearchKindOpenapiList.do?`).data;
// };
