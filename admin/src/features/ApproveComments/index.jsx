import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AppLoader from "../../components/AppLoader";
import { getListCommentByStatus } from "./CommentAPI";
import CommentItem from "./CommentItem";
import s from "./styles.module.scss";
const ApproveComments = () => {
  const [loading, setLoading] = useState(false);
  const [listComment, setListComment] = useState([]);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getListCommentByStatus(page, "PENDING").then((res) => {
      console.log(res);
      if (res.status === 200) {
        setListComment(res.data);
      }
    });
  }, [page, reload]);

  return (
    <>
      {loading && <AppLoader />}
      <div className={s.container}>
        <h1>Approve comments management</h1>
        <motion.div
          animate={{
            scale: [0.5, 1],
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            times: [0.1, 0.4],
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sx={{ pr: 2 }}>
              <Box
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                sx={{ p: 2 }}
              >
                <h3>Comments</h3>
                <CommentItem
                  comment={listComment}
                  commentItem={listComment.comments}
                  page={page}
                  setPage={setPage}
                  reload={reload}
                  setReload={setReload}
                />
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </div>
    </>
  );
};

export default ApproveComments;
