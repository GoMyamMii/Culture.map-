import styled from 'styled-components';

interface ImgProps {
  image: string;
}

const CarouselImg = ({ item }: { item: string }) => {
  return (
    <CarouselBox>
      <Img image={item} />
    </CarouselBox>
  );
};

const CarouselBox = styled.div`
  width: 100%;
  display: flex;
`;

const Img = styled.div<ImgProps>`
  width: 100%;
  height: 550px;
  margin: 0 auto;
  background-image: url(${(props) => props.image});
  background-position: center;
`;

export default CarouselImg;
