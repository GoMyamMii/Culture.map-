import axios from 'axios';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
//@ts-ignore <- 이거하면 밑에줄 코드(1줄) 자바스크립트로 인식함
import XMLParser from 'react-xml-parser';
import { dbService } from './firebase';

const BASE_URL = 'https://www.cha.go.kr/cha/SearchKindOpenapiList.do?';
const IMAGE_URL = 'http://www.cha.go.kr/cha/SearchKindOpenapiDt.do?';

export const getSearchData = async ({ queryKey }: any) => {
  const [_, cityValue, titleValue, pageNumber] = queryKey;
  let data;
  await axios
    .get(
      `${BASE_URL}ccbaCtcd=${cityValue}&ccbaKdcd=${titleValue}&pageIndex=${pageNumber}`
    )
    .then((response) => {
      const responseData = new XMLParser().parseFromString(
        response.data
      ).children;
      const itemData = responseData.slice(3);
      const pageData = responseData[0].value;

      const mappedItemData = itemData?.map((item: ItemType) => [
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
          lat: item.children[15].value,
        },
      ]);
      data = { pageData, mappedItemData };
    });
  return data;
};

export const getOneData = async ({ queryKey }: any) => {
  const [_, titleNum, careNum, cityNum] = queryKey;
  return await axios
    .get(
      `${IMAGE_URL}ccbaKdcd=${titleNum}&ccbaAsno=${careNum}&ccbaCtcd=${cityNum}`
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

export const createReview = async (item: reviewType) => {
  await addDoc(collection(dbService, 'reviews'), {
    cultureId: item.cultureId,
    createAt: Date.now(),
    name: item.name,
    password: item.password,
    body: item.body,
  });
};
export const readReview = async () => {
  let getReviewsData: reviewType[] = [];
  const q = query(
    collection(dbService, `reviews`),
    orderBy('createAt', 'desc')
  );
  const docs = await getDocs(q);
  docs.forEach((doc) => {
    const Data = {
      id: doc.id,
      ...doc.data(),
    };
    getReviewsData.push(Data);
  });
  return getReviewsData;
};

export const deleteReview = async (item: reviewType) => {
  deleteDoc(doc(dbService, `reviews/${item.id}`));
};
