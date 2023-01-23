import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getOneData } from '../api';

const ListItem = ({ item }) => {
  const { data, isLoading } = useQuery(
    ['imageData', item.titleNum, item.cityNum, item.careNum],
    getOneData
  );

  if (isLoading) return;
  return (
    <div>
      <Link
        to={`/Detail/${item.id}`}
        state={{
          title: item.title,
          name: item.name,
          image: data[0][0].image,
          date: data[0][0].data,
          gene: data[0][0].gene,
          position: data[0][0].position,
          long: item.long,
          leti: item.leti,
          content: data[0][0].content,
        }}
      >
        <img src={data[0][0].image} alt="img" height={100} />
        <div>id : {item.id}</div>
        <div>title : {item.title}</div>
        <div>name : {item.name}</div>
        <div>city : {item.city}</div>
        <div>careNum : {item.careNum}</div>
      </Link>
    </div>
  );
};

export default ListItem;
