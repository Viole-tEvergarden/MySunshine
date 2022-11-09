import { createStore } from "vuex";
import acount from "./module/acount";

const Store = createStore({
    modules: {
        acount
    }
})
export { Store };

