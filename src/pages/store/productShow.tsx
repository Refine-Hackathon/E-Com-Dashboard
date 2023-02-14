import React from 'react'
import { Add } from "@mui/icons-material";
import { GetServerSideProps } from "next";
import { useTable } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import { host } from 'utils/api';
import {
    Box,
    Stack,
    Typography,
    TextField,
    Select,
    MenuItem,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo } from "react";

export default function ProductShow() {
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
} = useTable();

const Product = data?.data ?? [];


if (isLoading) return <Typography>Loading...</Typography>;
if (isError) return <Typography>Error...</Typography>;
  return (
  <div>Show product</div>
  )
}
