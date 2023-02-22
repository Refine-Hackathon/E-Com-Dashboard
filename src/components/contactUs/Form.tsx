import {
    Box,
    Typography,
    FormControl,
    FormHelperText,
    TextField,
    TextareaAutosize,
    Stack,
    Select,
    MenuItem,
    Button,
    minWidth,
} from "@pankod/refine-mui";
import { UseFormHandleSubmit, useForm } from "@pankod/refine-react-hook-form";
import CustomButton from "components/common/CustomButton";
import { FormEventHandler, useState } from "react";

import {useEffect} from 'react';

const Form = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,

        handleSubmit,
    } = useForm();
    const [formData, setFormData] = useState({ title: "", describe: "" ,email:""});

    const onSubmit = (e) => {
        e.preventDefault();
        onFinish(formData);
    };
   
    const handleOnChangeTitle = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({
            ...formData,
            title: e.target.value,
        });
    };
    const handleOnChangeDescriptiom = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({
            ...formData,
            describe: e.target.value,
        });
    };
    useEffect(() => {
        setFormData({
            ...formData,
            email: localStorage.getItem('email'),
        });
      
    },[])
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Contact Us
            </Typography>
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
                <form
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                    onSubmit={onSubmit}
                >
                    <Stack direction="row" gap={4} sx={{ flex: 1 }}
                    >

                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Message Title
                            </FormHelperText>
                            <TextField
                                placeholder="Write title"
                                fullWidth
                                required
                                id="outlined-basic"
                                color="info"
                                variant="outlined"
                                onChange={handleOnChangeTitle}

                            />
                        </FormControl>
                    </Stack>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Description
                        </FormHelperText>
                        <TextareaAutosize
                            minRows={5}
                            required
                            placeholder="Write description"
                            onChange={handleOnChangeDescriptiom}

                            color="info"
                            style={{
                                width: "100%",
                                background: "transparent",
                                fontSize: "16px",
                                borderColor: "rgba(0,0,0,0.23)",
                                borderRadius: 6,
                                padding: 10,
                                color: "#919191",
                            }}
                            
                        />
                    </FormControl>
                    <CustomButton
                        type="submit"
                        title={formLoading ? "Submitting..." : "Submit"}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                    />
                </form>
            </Box>
        </Box>
    );
};

export default Form;
