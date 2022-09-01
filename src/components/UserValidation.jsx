import * as yup from "yup"


export const userSchema = yup.object().shape({
    name: yup.string().required("Required"),
    // email:yup.string().email("Invalid email format").required("Required"),
}); 