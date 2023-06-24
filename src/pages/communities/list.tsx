import { Alert, AlertTitle, Backdrop, Stack, TextField } from "@mui/material";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import {
  List
} from "@refinedev/mui";
import React, { useState } from "react";
import { CommunityItem } from "../../components/community-item";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import { AppCommunity } from "../../models";

export const CommunityList: React.FC<IResourceComponentsProps> = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

  useDebouncedEffect(() => {
    setDebouncedSearchQuery(searchQuery)
  }, [searchQuery], 200)

  const { data, isLoading, isError } = useList<AppCommunity>({
    resource: "communities",
    meta: {
      query: debouncedSearchQuery,
    },
  })

  const communities = data?.data ?? [];

  const onSearchSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev?.preventDefault()
  }

  return (
    <List>
      <Backdrop open={isLoading} />

      <form onSubmit={(ev) => onSearchSubmit(ev)}>
        <TextField label="Search" value={searchQuery} onChange={(ev) => setSearchQuery(ev.target.value)} />
      </form>

      {isError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Data was not able to be loaded. Please try again later.
        </Alert>
      )}

      <Stack spacing={1}>
        {communities.map((c) => (
          <CommunityItem community={c} key={c.id} />
        ))}
      </Stack>
    </List>
  );
};
