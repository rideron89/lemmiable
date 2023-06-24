import { Box, Card, CardContent, Chip, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import React from "react";
import { AppPost } from "../../models";
import { pluralize } from "../../utility/index";

const Wrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
}))

export const PostItem: React.FC<{ post: AppPost }> = ({ post }) => {
  const commentCountText = `${post.counts.comments.toLocaleString() ?? 0} ${pluralize(post.counts.comments, "comment", "comments")}`
  const scoreText = post.counts.score ?? 0
  const relativePublished = dayjs().to(dayjs.tz(post.post.published, "UTC").tz("America/Toronto"))

  return (
    <Wrapper>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{
            alignItems: "center",
            display: "flex",
            mb: 1
          }}>
            <Tooltip title="Score">
              <Chip label={scoreText} size="small" sx={{ mr: 1.0 }} />
            </Tooltip>

            <Typography variant="h5">
              {post.post.name}
            </Typography>
          </Box>

          <Typography gutterBottom>{post.post.body}</Typography>

          <Box sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
          }}>
            <Typography sx={{ fontSize: 14 }}>Posted by {post.creator.name} in {post.community.name}</Typography>

            <Chip label={relativePublished} variant="outlined" sx={{ ml: 1 }} />

            <Chip label={commentCountText} sx={{ ml: 1 }} />
          </Box>
        </CardContent>
      </Card>
    </Wrapper>
  )
}
