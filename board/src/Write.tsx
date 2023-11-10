import React, { Component, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

interface IState {
  title: string;
  content: string;
  registerId: string;
}

class Write extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      title: "",
      content: "",
      registerId: "",
    };
  }

  // 게시글 작성 요청 처리
  write = () => {
    const { title, content, registerId } = this.state;

    // 유효성 검사: 필드 중 하나라도 빈 문자열인 경우
    if (
      title.trim() === "" ||
      content.trim() === "" ||
      registerId.trim() === ""
    ) {
      alert("제목, 내용, 작성자를 모두 입력해주세요.");
      return;
    }

    // 서버에 게시글 작성 요청
    Axios.post("http://localhost:8000/insert", {
      title: title,
      content: content,
      registerId: registerId,
    })
      .then((res) => {
        // 작성 완료 후, 입력 폼 초기화 및 리스트 페이지로 이동
        this.setState({
          title: "",
          content: "",
          registerId: "",
        });
        window.location.href = "/";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 입력 필드 값 변경 처리
  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    } as Pick<IState, keyof IState>);
  };

  render() {
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

    return (
      <div>
        <h3 style={{ textAlign: "center", marginTop: "50px" }}>
          게시판 글쓰기
        </h3>
        <Container style={style2}>
          <Form>
            {/* 제목 입력 폼 */}
            <Form.Group className="mb-3" style={style3}>
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="제목을 입력하세요"
              />
            </Form.Group>

            {/* 내용 입력 폼 */}
            <Form.Group className="mb-3" style={style3}>
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={this.state.content}
                onChange={this.handleChange}
                placeholder="내용을 입력하세요"
              />
            </Form.Group>

            {/* 작성자 입력 폼 */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2"
              style={style3}
            >
              <Form.Label>작성자</Form.Label>
              <Form.Control
                type="text"
                name="registerId"
                value={this.state.registerId}
                onChange={this.handleChange}
                placeholder="작성자를 입력하세요"
              />
            </Form.Group>
          </Form>

          {/* 작성완료 버튼과 취소 버튼 */}
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
            <Button variant="info" onClick={this.write}>
              작성완료
            </Button>{" "}
            <Link to="/">
              <Button variant="secondary">취소</Button>
            </Link>{" "}
          </div>
        </Container>
      </div>
    );
  }
}

export default Write;
