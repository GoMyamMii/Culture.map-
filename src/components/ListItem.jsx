import React from 'react';
import { useQuery } from 'react-query';
import { getImage } from '../api';

const ListItem = ({ item }) => {
  const { data, isLoading } = useQuery(
    ['imageData', item.titleNum, item.cityNum, item.careNum],
    getImage
  );

  return (
    <div>
      <img src={data} alt="img" height={100} />
      <div>id : {item.id}</div>
      <div>title : {item.title}</div>
      <div>name : {item.name}</div>
      <div>city : {item.city}</div>
      <div>careNum : {item.careNum}</div>
    </div>
  );
};

export default ListItem;
