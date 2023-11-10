import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import Button from "react-bootstrap/Button";

// 게시글 데이터 타입 정의
interface PostData {
  BOARD_TITLE: string;
  BOARD_CONTENT: string;
  UPDATER_ID: string;
  REGISTER_ID: string;
}

// Read 컴포넌트
const Read: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    // 게시물 데이터 가져오기
    Axios.get(`http://localhost:8000/getPost/${id}`)
      .then((res) => {
        const { data } = res;
        setPost(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

  // 스타일 설정
  const style2: React.CSSProperties = {
    backgroundColor: "#f7f7f7",
    paddingBottom: "30px",
    marginTop: "50px",
  };

  const style3: React.CSSProperties = {
    textAlign: "left",
    paddingTop: "30px",
    marginLeft: "20px",
    marginRight: "20px",
  };

  // 게시글 삭제 처리
  const handleDelete = () => {
    // 게시물 삭제
    Axios.post("http://localhost:8000/delete", {
      boardIdList: id,
    })
      .then(() => {
        // 게시물 삭제 후, 리스트 페이지로 이동
        window.location.href = "/";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>
        선택한 게시물 읽기
      </h3>
      {post && (
        <Container style={style2}>
          {/* 제목 입력 폼 */}
          <Form.Group className="mb-3" style={style3}>
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" value={post.BOARD_TITLE} readOnly />
          </Form.Group>

          {/* 내용 입력 폼 */}
          <Form.Group className="mb-3" style={style3}>
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" value={post.BOARD_CONTENT} readOnly />
          </Form.Group>

          {/* 작성자 표시 */}
          <Form.Group className="mb-3" style={style3}>
            <Form.Label>작성자</Form.Label>
            <Form.Control type="text" value={post.REGISTER_ID} readOnly />
          </Form.Group>

          {/* 수정하기 버튼과 삭제하기 버튼, 리스트 버튼 */}
          <div
            style={{
              textAlign: "right",
              paddingRight: "20px",
              paddingTop: "10px",
              background: "#f7f7f7",
              display: "block",
              width: "100%",
              height: "50px",
            }}
          >
            <Link to={`/modify/${id}`}>
              <Button variant="primary">수정하기</Button>
            </Link>{" "}
            <Button variant="danger" onClick={handleDelete}>
              삭제하기
            </Button>{" "}
            <Link to="/">
              <Button variant="secondary">리스트</Button>
            </Link>{" "}
          </div>
        </Container>
      )}
    </div>
  );
};

export default Read;
