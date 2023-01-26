import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getOneData } from '../api';

interface ItemTopWrapProps {
  image: string;
}

const ListItem = ({ item }: { item: ItemType }) => {
  const { data, isLoading } = useQuery(
    ['getOneData', item.titleNum, item.careNum, item.cityNum],
    getOneData
  );
  if (isLoading) return <></>;
  return (
    <ItemContainer>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/Detail/${item.id}`}
        state={{
          title: item.title,
          name: item.name,
          image: data[0][0].image,
          date: data[0][0].date,
          gene: data[0][0].gene,
          position: data[0][0].position,
          long: item.long,
          leti: item.leti,
          content: data[0][0].content,
        }}
      >
        <ItemTopWrap image={data[0][0].image}>
          <NameGeneWarp>
            <TopGene>{data[0][0].gene}</TopGene>
            <TopName>{item.name}</TopName>
          </NameGeneWarp>
        </ItemTopWrap>
        <ContentBody>{data[0][0].content}</ContentBody>
      </Link>
      <div style={{ backgroundColor: '#000' }}></div>
    </ItemContainer>
  );
};

export default ListItem;

const ItemContainer = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  margin: 50px;
`;
const ItemTopWrap = styled.div<ItemTopWrapProps>`
  border-radius: 20px 20px 0 0;
  background-position: center;
  background-size: cover;
  height: 70%;
  width: 300px;
  background-image: ${(props) =>
    props.image !== ''
      ? `linear-gradient(#000000d1, #0000008b), url(${props.image})`
      : `linear-gradient(#000000d1, #0000008b), url("./image/no-image.png")`};
`;

const NameGeneWarp = styled.div`
  margin-right: 20px;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: right;
  color: white;
  height: 100%;
`;

const TopName = styled.div`
  writing-mode: vertical-rl;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  height: 90%;
`;
const TopGene = styled.div`
  writing-mode: vertical-rl;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10px;
  height: 90%;
`;

const ContentBody = styled.div`
  border-radius: 0 0 20px 20px;
  background-color: gray;
  color: white;
  font-size: 12px;
  height: 90px;
  padding: 20px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-decoration: none;
  overflow: scroll;
  /* text-overflow: inherit; */
`;
