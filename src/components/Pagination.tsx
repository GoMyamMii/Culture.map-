import { useState } from 'react';
import styled from 'styled-components';

function Pagination(props: any) {
  const { total, limit, page, setPage } = props;
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;

  const numPages = Math.ceil(16736 / limit);
  // 16736은 전체페이지수이긴 하나, total로 가져오려고 하니 total이 빈배열로
  // 나와서 어쩔수 없이 16736으로 표기

  return (
    <>
      <Nav>
        <Button
          onClick={() => {
            setPage(page - 1);
            setCurrPage(page - 2);
          }}
          disabled={page === 1}
        >
          &lt;
        </Button>

        <Button
          // border="true"
          // 원래는 css를 깔끔하게 주기 위해 border를 사용하려했으나
          // Button컴포넌트에서 오버로드 오류가 나와서 제외했음
          onClick={() => setPage(firstNum)}
          aria-current={'page'}
          // aria-current={page === lastNum ? "page" : null}>
          // 원래는 현재 페이지를 가리키기위해 aria-current를 사용하려했으나
          // Button컴포넌트에서 오버로드 오류가 나와서 'page'로대체함
        >
          {firstNum}
        </Button>

        {Array.from({ length: 4 }, (_, i) => i + 1).map((_, i) => {
          if (i <= 2) {
            return (
              <Button
                // border="true"
                // 원래는 css를 깔끔하게 주기 위해 border를 사용하려했으나
                // Button컴포넌트에서 오버로드 오류가 나와서 제외했음
                key={i + 1}
                onClick={() => {
                  setPage(firstNum + 1 + i);
                }}
                aria-current={'page'}
                // aria-current={page === lastNum ? "page" : null}>
                // 원래는 현재 페이지를 가리키기위해 aria-current를 사용하려했으나
                // Button컴포넌트에서 오버로드 오류가 나와서 'page'로대체함
              >
                {firstNum + 1 + i}
              </Button>
            );
          } else if (i >= 3) {
            return (
              <Button
                // border="true"
                // 원래는 css를 깔끔하게 주기 위해 border를 사용하려했으나
                // Button컴포넌트에서 오버로드 오류가 나와서 제외했음
                key={i + 1}
                onClick={() => setPage(lastNum)}
                aria-current={'page'}
                // aria-current={page === lastNum ? "page" : null}>
                // 원래는 현재 페이지를 가리키기위해 aria-current를 사용하려했으나
                // Button컴포넌트에서 오버로드 오류가 나와서 'page'로대체함
              >
                {lastNum}
              </Button>
            );
          }
        })}

        <Button
          onClick={() => {
            setPage(page + 1);
            setCurrPage(page);
          }}
          disabled={page === numPages}
        >
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    margin: 0 4px;
  }
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
