import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
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

import { ProductCard, CustomButton } from "components";

const AllProperties = () => {
    const navigate = useNavigate();
    var path= window.location.pathname.split('/');
    const category_name = path[4];
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
            gender:
            logicalFilters.find((item) => item.field === "gender")?.value ||
            "",
        };
    }, [filters]);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error...</Typography>;

    return (
        <Box>
            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
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
                            <CustomButton
                                title={`Sort price ${
                                    currentPrice === "asc" ? "↑" : "↓"
                                }`}
                                handleClick={() => toggleSort("product_cost")}
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                            />
                            
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                value={currentFilterValues.gender}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "gender",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace",
                                    );
                                }}
                            >
                                <MenuItem value="">Select Gender</MenuItem>
                                {[
                                   "Male",
                                   "Female"
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
                    <ProductCard
                        key={data.prdt_id}
                        c_name = {category_name}
                        p_id={data.prdt_id}
                        p_name={data.product_name}
                        p_details={data.product_details}
                        p_cost={data.product_cost}
                        photo = "#"
                    />
                ))}
            </Box>

          
        </Box>
    );
};

export default AllProperties;
