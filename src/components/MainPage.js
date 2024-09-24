import { useEffect } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../slices/AuthSlice";

export default function MainPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkLogin())
    }, [dispatch])

    const {user} = useSelector((state) => state.auth)
}