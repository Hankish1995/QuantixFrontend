

import * as Yup from "yup";
// signup validation
export const signupSchema = Yup.object().shape({
    userName: Yup.string().required("This field is required"),
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    
  });

  
// login validation
  export const loginSchema =Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
      .required("This field is required")
  });

  // forgot password validation
  export const forgotPasswordSchema =Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
  });
  

  // reset Password Schema
  export const resetPasswordSchema =Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
    .required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
    .matches(/\d/, "Password should contain at least one number")
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),

    confirmPassword: Yup.string()
    .when("password", (password, schema) => {
      return password
        ? schema.required("Please confirm your password")
               .oneOf([Yup.ref("password")], "Passwords must match")
        : schema.notRequired();
    }),

  });

  // add plan validation 

  export const addPlanSchema =Yup.object().shape({
    planName: Yup.string().required("This field is required"),
    planAddress: Yup.string().required("This field is required"),
  });

  // change password 

  export const ChangePasswordSchema=Yup.object().shape({
    password:Yup.string().required("This field is required"),
    newPassword:Yup.string().required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
    .matches(/\d/, "Password should contain at least one number")
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    confirmPassword: Yup.string().required("This field is required")
      .when("newPassword", (password, schema) => {
        return password
          ? schema.required("Please confirm your password")
                 .oneOf([Yup.ref("newPassword")], "Passwords must match")
          : schema.notRequired();
      })
  })