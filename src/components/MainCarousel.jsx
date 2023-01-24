import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import CarouselImg from './CarouselImg';
import { getSearchData } from '../api';
import { useQuery } from 'react-query';

const MainCarousel = () => {
  const [cityValue, setCityValue] = useState('');
  const [titleValue, setTitleValue] = useState('');

  const { data: selectData, isLoading: selectLoading } = useQuery(
    ['cityData', cityValue, titleValue],
    getSearchData
  );

  if (selectLoading) {
    <div>로딩중입니다.</div>;
  }

  return (
    <Wrapper>
      <StyledSlider {...settings}>
        {selectData?.flat().map((item) => (
          <CarouselImg item={item} key={item.id} />
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
  arrows: true,
};

const Wrapper = styled.div`
  margin: 20px;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 800px;
`;

export default MainCarousel;
