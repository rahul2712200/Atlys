import AuthPopup from "./Authpopup"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleAuthSuccess = () => {

        console.log('logined')
        navigate("/");
    }

   const toggleAuthPopup = () => {
    //  do nothing
    }
    return (
        <AuthPopup
        toShowCrossIcon={false}
        onSuccess={handleAuthSuccess}
        onClose={() => toggleAuthPopup()}
                        />
    )
}