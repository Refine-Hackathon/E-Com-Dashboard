import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import {
    Box,
    Stack,
    Typography,
    TextField,
    Select,
    MenuItem,
    ShowButton,
    Table,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo } from "react";
import Pagination from "components/common/Pagination";
import { ProductCard, CustomButton } from "components";

const AllProperties = () => {
    const navigate = useNavigate();
    var path = window.location.pathname.split('/');
    const category_name = path[4];
    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        pageSize,
        setCurrent,
        setPageSize,
        pageCount,
        sorter,
        setSorter,
        filters,
        setFilters,
    } = useTable();

    const allProducts = data?.data ?? [];

    const currentPrice = sorter.find((item) => item.field === "product_cost")?.order;

    const toggleSort = (field: string) => {
        setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
    };

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : [],
        );

        return {
            type:
                logicalFilters.find((item) => item.field === "type")?.value ||
                "",
        };
    }, [filters]);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error...</Typography>;

    return (
       
            <Box sx={{margin:3}}>
           
                <Box mt="20px"
                
                sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    <Stack direction="column" width="100%">
                        <Typography fontSize={25} fontWeight={700} color="#11142d">
                            {!allProducts.length
                                ? "There are no products"
                                : "All Products"}
                        </Typography>
                        <Box
                            mb={2}
                            mt={3}
                            display="flex"
                            width="84%"
                            justifyContent="space-between"
                            flexWrap="wrap"
                        >
                            <Box
                                display="flex"
                                gap={2}
                                flexWrap="wrap"
                                mb={{ xs: "20px", sm: 0 }}
                            >
                                <button
                                onClick ={() => toggleSort("product_cost")}
                                >{`Sort price ${currentPrice === "asc" ? "↑" : "↓"}`}</button>
                                <Select
                                    variant="outlined"
                                    color="info"
                                    displayEmpty
                                    required
                                    inputProps={{ "aria-label": "Without label" }}
                                    defaultValue=""
                                    value={currentFilterValues.type}
                                    onChange={(e) => {
                                        setFilters(
                                            [
                                                {
                                                    field: "type",
                                                    operator: "eq",
                                                    value: e.target.value,
                                                },
                                            ],
                                            "replace",
                                        );
                                    }}
                                >
                                <MenuItem value="">Select Category</MenuItem>
                                    {[
                                        "TShirt",
                                        "Jacket",
                                        "Jeans"
                                    ].map((type) => (
                                        <MenuItem
                                            key={type}
                                            value={type}
                                        >
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Box>
                    </Stack>
                </Box>



                <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    {allProducts?.map((data) => (
                        <>
                            <ProductCard
                                key={data.prdt_id}
                                c_name={category_name}
                                p_id={data.prdt_id}
                                p_name={data.product_name}
                                p_details={data.product_details}
                                p_cost={data.product_cost}
                                photo="#"
                            />
                
                        </>
                    ))}
                </Box>
                <Pagination current={current} pageSize={pageSize} pageCount ={pageCount} setPageSize={setPageSize} setCurrent = {setCurrent}/>
            </Box >
            
        
    );
};

export default AllProperties;
