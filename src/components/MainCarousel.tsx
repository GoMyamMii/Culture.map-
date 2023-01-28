//@ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import CarouselImg from './CarouselImg';
import { nanoid } from 'nanoid';

const MainCarousel = () => {
  const mainImg01 = './image/mainVisual/mainVisual01.jpg';
  const mainImg02 = './image/mainVisual/mainVisual02.jpg';
  const mainImg03 = './image/mainVisual/mainVisual03.jpg';

  const mainImgArr = [mainImg01, mainImg02, mainImg03];

  return (
    <Wrapper>
      <StyledSlider {...settings}>
        {mainImgArr?.map((item: string) => (
          <CarouselImg item={item} key={nanoid()} />
        ))}
      </StyledSlider>
    </Wrapper>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2500,
  slideToShow: 1,
  slidesToScroll: 1,
  centerPadding: '0px',
  centerMode: true,
  arrows: false,
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  max-width: 1920px;
  height: 550px;
  .slick-dots {
    bottom: 20px;
  }
  .slick-dots li button::before {
    color: white;
  }
`;

export default MainCarousel;
