import React from 'react'
import dataProvider from '@pankod/refine-simple-rest';
import { GetServerSideProps } from 'next';
import { host } from 'utils/api';
import { useEffect } from 'react';
import { useTable } from "@pankod/refine-core";

var path= window.location.pathname.split('/');
const c_name = path[4];
const p_id = path[6];

export default function productShow() {
//   const {
//     tableQueryResult: { data, isLoading, isError },
//     current,
//     setCurrent,
//     setPageSize,
//     pageCount,
//     sorter,
//     setSorter,
//     filters,
//     setFilters,
// } = useTable();

// const allProducts = data?.data ?? [];


  return (
    <div>hiiiiiiiiiiiiiiiiiiiiiiiiiiii</div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
  

//   try {
//     console.log('ssr')
//       const { data: productData } = await dataProvider(host).getOne({
//           resource: `prdt/${c_name}`,
//           id: p_id as string,
//       });
//       console.log(productData);
//       return {
//           props: { product: productData },
//       };
//   } catch (error) {
//     console.log('ssr')
//       console.log(error);
//   }
// };