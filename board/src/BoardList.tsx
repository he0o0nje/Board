import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

// 게시판 아이템 타입 정의
interface BoardItem {
  BOARD_ID: number;
  BOARD_TITLE: string;
  BOARD_CONTENT: string;
  REGISTER_ID: string;
  REGISTER_DATE: string;
}

// 게시판 아이템을 출력하는 컴포넌트
const Board: React.FC<{
  id: number;
  title: string;
  content: string;
  registerId: string;
  registerDate: string;
}> = ({ id, title, content, registerId, registerDate }) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>
        <Link
          to={`/read/${id}`}
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "normal",
            display: "block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.fontWeight = "bold"; // 마우스가 올라갈 때 굵은 글씨로 변경
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.fontWeight = "normal"; // 마우스가 벗어날 때 기본 글씨로 변경
          }}
        >
          {title}
        </Link>
      </td>
      <td>{content}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

// 게시판 목록을 보여주는 컴포넌트
const BoardList: React.FC = () => {
  // 게시판 목록을 담는 상태
  const [boardList, setBoardList] = useState<BoardItem[]>([]);

  // 게시판 목록을 서버로부터 받아오는 함수
  const getList = useCallback(() => {
    Axios.get<BoardItem[]>("http://localhost:8000/list", {})
      .then((res) => {
        const { data } = res;
        setBoardList(data);
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // 컴포넌트가 마운트되면 게시판 목록을 받아옴
  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <div>
      <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((v) => (
              <Board
                id={v.BOARD_ID}
                title={v.BOARD_TITLE}
                content={v.BOARD_CONTENT}
                registerId={v.REGISTER_ID}
                registerDate={v.REGISTER_DATE}
                key={v.BOARD_ID}
              />
            ))}
          </tbody>
        </Table>

        {/* 글쓰기 버튼을 오른쪽 끝에 배치 */}
        <div style={{ float: "right" }}>
          <Link to="/write">
            <Button variant="primary">글쓰기</Button>
          </Link>{" "}
        </div>
      </Container>
    </div>
  );
};

export default BoardList;
