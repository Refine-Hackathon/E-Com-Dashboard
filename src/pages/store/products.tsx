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
       
            <Box>
            <button onClick={() => {
                console.log("pageSize"+pageSize);
                 setCurrent((prev) => prev - 1)
            }
            }
            >
                {"<"}
            </button>
            <span> page: {current} {pageCount} </span>
            <button onClick={() => {
                console.log("pageSize" + pageSize);

                setCurrent((prev) => prev + 1)}}>
                {">"}
            </button>
            <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
            >
                {[5, 10, 20].map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
            <h1>{current}</h1>
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
                                    title={`Sort price ${currentPrice === "asc" ? "↑" : "↓"
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
                                c_name={data.category}
                                p_id={data.prdt_id}
                                p_name={data.product_name}
                                p_details={data.product_details}
                                p_cost={data.product_cost}
                                photo={data.img_path}
                            />
                            <ShowButton hideText recordItemId={data.prdt_id} />
                        </>
                    ))}
                </Box>
            {(
                <Box display="flex" gap={2} mt={3} flexWrap="wrap">
                    <CustomButton
                        title="Previous"
                        handleClick={() => setCurrent((prev) => prev - 1)}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        disabled={!(current > 1)}
                    />
                    <Box
                        display={{ xs: "hidden", sm: "flex" }}
                        alignItems="center"
                        gap="5px"
                    >
                        Page{" "}
                        <strong>
                            {current} of {pageCount}
                        </strong>
                    </Box>
                    <CustomButton
                        title="Next"
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        disabled={current === pageCount}
                    />
                    <Select
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={10}
                        onChange={(e) =>
                            setPageSize(
                                e.target.value ? Number(e.target.value) : 10,
                            )
                        }
                    >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <MenuItem key={size} value={size}>
                                Show {size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            )}

            </Box >
            
        
    );
};

export default AllProperties;
