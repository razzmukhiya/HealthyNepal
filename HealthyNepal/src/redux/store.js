// import { configureStore } from "@reduxjs/toolkit";
// import { userReducer } from "./reducers/user";

// const Store = configureStore({
//     reducer: {
//         user:userReducer,

//     }
// });

// export default Store;

import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { productReducer } from "./reducers/product";

const Store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export default Store;