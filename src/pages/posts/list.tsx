import { Alert, AlertTitle, Backdrop, List, Stack } from "@mui/material";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import React from "react";
import { PostItem } from "../../components/post-item";
import { AppPost } from "../../models";

export const PostList: React.FC<IResourceComponentsProps> = () => {
  const { data, isLoading, isError } = useList<AppPost>({
    resource: "posts",
  })

  const posts = data?.data ?? [];

  return (
    <List>
      <Backdrop open={isLoading} />

      {isError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Data was not able to be loaded. Please try again later.
        </Alert>
      )}

      <Stack spacing={1}>
        {posts.map((p) => (
          <PostItem post={p} key={p.post.id} />
        ))}
      </Stack>
    </List>
  )
};
