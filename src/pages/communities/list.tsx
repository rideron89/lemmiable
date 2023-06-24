import { Checkbox, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import {
  DateField,
  List,
  useDataGrid
} from "@refinedev/mui";
import React from "react";

export const CommunityList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: translate("communities.fields.id"),
        type: "number",
        minWidth: 50,
      },
      {
        field: "name",
        flex: 1,
        headerName: translate("communities.fields.name"),
        minWidth: 200,
      },
      {
        field: "title",
        flex: 1,
        headerName: translate("communities.fields.title"),
        minWidth: 200,
      },
      {
        field: "description",
        flex: 1,
        headerName: translate("communities.fields.description"),
        minWidth: 200,
      },
      {
        field: "removed",
        headerName: translate("communities.fields.removed"),
        minWidth: 100,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: "published",
        flex: 1,
        headerName: translate("communities.fields.published"),
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "updated",
        flex: 1,
        headerName: translate("communities.fields.updated"),
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "deleted",
        headerName: translate("communities.fields.deleted"),
        minWidth: 100,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: "nsfw",
        headerName: translate("communities.fields.nsfw"),
        minWidth: 100,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: "local",
        headerName: translate("communities.fields.local"),
        minWidth: 100,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: "hidden",
        headerName: translate("communities.fields.hidden"),
        minWidth: 100,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: "posting_restricted_to_mods",
        headerName: translate(
          "communities.fields.posting_restricted_to_mods",
        ),
        minWidth: 100,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: "blocked",
        headerName: translate("communities.fields.blocked"),
        minWidth: 100,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: "subscribed",
        flex: 1,
        headerName: translate("communities.fields.subscribed"),
        minWidth: 200,
      },
    ],
    [translate],
  );

  return (
    <List>
      <TextField label="Search" />

      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
