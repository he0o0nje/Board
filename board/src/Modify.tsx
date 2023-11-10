import React, { FC, useEffect, useState, ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import Button from "react-bootstrap/Button";

// 게시글 정보 타입 정의
interface PostData {
  BOARD_TITLE: string;
  BOARD_CONTENT: string;
  UPDATER_ID: string;
  REGISTER_ID: string;
}

const Modify: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedRegisterId, setEditedRegisterId] = useState("");

  // 게시글 정보 로드
  useEffect(() => {
    Axios.get(`http://localhost:8000/getPost/${id}`)
      .then((res) => {
        const { data } = res;
        setPost(data);
        setEditedTitle(data.BOARD_TITLE);
        setEditedContent(data.BOARD_CONTENT);
        setEditedRegisterId(data.REGISTER_ID);
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

  // 게시글 수정 처리
  const handleUpdate = () => {
    // 유효성 검사
    if (editedTitle.trim() === "" || editedContent.trim() === "") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    // 수정 요청 보내기
    Axios.post("http://localhost:8000/update", {
      id,
      title: editedTitle,
      content: editedContent,
      updaterId: post?.UPDATER_ID,
      registerId: editedRegisterId,
    })
      .then(() => {
        alert("게시물이 수정되었습니다.");
        // 수정 후, 게시물 다시 불러오기
        Axios.get(`http://localhost:8000/getPost/${id}`)
          .then((res) => {
            const { data } = res;
            setPost(data);
            setEditedTitle(data.BOARD_TITLE);
            setEditedContent(data.BOARD_CONTENT);
            setEditedRegisterId(data.REGISTER_ID);
            window.location.href = "/";
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((error) => {
        console.error(error);
        alert("게시물 수정 중 오류가 발생했습니다.");
      });
  };

  // 게시글 삭제 처리
  const handleDelete = () => {
    // 삭제 요청 보내기
    Axios.post("http://localhost:8000/delete", {
      boardIdList: id,
    })
      .then(() => {
        // 삭제 성공 시 리스트 페이지로 이동
        window.location.href = "/";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>
        게시물 수정하기
      </h3>
      {post && (
        <Container style={style2}>
          {/* 제목 입력 폼 */}
          <Form.Group className="mb-3" style={style3}>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              value={editedTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditedTitle(e.target.value)
              }
            />
          </Form.Group>

          {/* 내용 입력 폼 */}
          <Form.Group className="mb-3" style={style3}>
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              value={editedContent}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setEditedContent(e.target.value)
              }
            />
          </Form.Group>

          {/* 작성자 표시 */}
          <Form.Group className="mb-3" style={style3}>
            <Form.Label>작성자</Form.Label>
            <Form.Control
              type="text"
              value={editedRegisterId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditedRegisterId(e.target.value)
              }
              readOnly
            />
          </Form.Group>

          {/* 수정완료, 삭제하기, 리스트 버튼 */}
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
            <Button variant="success" onClick={handleUpdate}>
              수정완료
            </Button>{" "}
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

export default Modify;
