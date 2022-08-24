import GetAppIcon from "@material-ui/icons/GetApp";

import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaperList } from "../app/thunk-async";
import { downloadPaper } from "../service/paper.service";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
const Widget = () => {
  const [search, setSearch] = useState("");
  const [filterPaperList, setFilterPaperList] = useState([]);

  const dispatch = useDispatch();

  const paperlist = useSelector((state) => state.paper.paperData);

  const downloadPaperFunction = async (id, name) => {
    await downloadPaper(id)
      .then((res) => {
        console.log(res);
        const blob = new Blob([res], { type: "application/pdf" });
        saveAs(blob, name);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (search) {
      let filterpaper = paperlist?.data?.filter(
        (item) =>
          item?.paperName &&
          item?.paperName?.toLowerCase()?.includes(search.toLowerCase())
      );
      setFilterPaperList(filterpaper);
    } else {
      setFilterPaperList(paperlist?.data);
    }
  }, [search]);

  useEffect(() => {
    dispatch(fetchPaperList());
  }, []);

  useEffect(() => {
    setFilterPaperList(paperlist?.data);
  }, [paperlist]);

  return (
    <>
      <Container>
        <Row>
          <Col className="w-100 d-flex justify-content-center flex-column">
            <input
              type="text"
              value={search}
              placeholder="Search Papers"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Table striped>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>PaperName</th>
                  <th>Download</th>
                  {/* <a
                    href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    download
                  >
                    Click to{" "}
                  </a> */}
                </tr>
              </thead>
              <tbody>
                {filterPaperList?.map((post, index) => (
                  <>
                    <tr key={index + post?.paperName}>
                      <td>{index + 1}</td>
                      <td>{post?.paperName}</td>
                      <td>
                        {/* <Link to="route"  onClick={(event) => { event.preventDefault(); window.open(`./../../src/uploads/papers/${post?.pdfPath}`); }}> */}
                        <GetAppIcon
                          onClick={() => {
                            downloadPaperFunction(post?._id, post?.paperName);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        {/* </Link> */}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Widget;
