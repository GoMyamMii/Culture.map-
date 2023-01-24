import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const MainSlide = () => {
  return (
    <Wrapper>
      <StyledSlider {...settings}>
        <CarouselBox>
          <CarouselImg src="http://www.cha.go.kr/unisearch/images/national_treasure/2685609.jpg" />
        </CarouselBox>
        <CarouselBox>
          <CarouselImg src="http://www.cha.go.kr/unisearch/images/national_treasure/1611449.jpg" />
        </CarouselBox>
        <CarouselBox>
          <CarouselImg src="http://www.cha.go.kr/unisearch/images/national_treasure/1611458.jpg" />
        </CarouselBox>
        <CarouselBox>
          <CarouselImg src="http://www.cha.go.kr/unisearch/images/national_treasure/1612029.jpg" />
        </CarouselBox>
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
  arrows: true,
};

const Wrapper = styled.div`
  margin: 20px;
`;

const StyledSlider = styled(Slider)`
  background-color: gray;
`;

const CarouselBox = styled.div`
  /* width: 100%;
  background-color: lightgrey; */
`;

const CarouselImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export default MainSlide;
