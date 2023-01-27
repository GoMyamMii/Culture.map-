import { useQuery } from 'react-query';
import { getOneData } from '../api';
import styled from 'styled-components';

const CarouselImg = ({ item }: { item: ItemType }) => {
  const { data, isLoading } = useQuery(
    ['imageData', item.titleNum, item.careNum, item.cityNum],
    getOneData
  );

  if (isLoading) return <></>;

  return (
    <CarouselBox>
      <Img src={data[0][0].image} alt="img" />
    </CarouselBox>
  );
};

const CarouselBox = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Img = styled.img`
  width: auto;
  height: 550px;
  margin: auto;
  display: block;
`;

export default CarouselImg;
