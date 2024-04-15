import './style.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import sendRequest from "../../core/tools/remote/request";
import { requestMehods } from "../../core/enums/requestMethods";
import { loadUser } from "../../Redux/userSlice";

const Logout = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userState = useSelector((global) => global.user);

    const logout = async () => {
        localStorage.removeItem('token');
        navigate("/auth");
    }

    useEffect(() => {
        const getUser = async () => {
          const { data } = await sendRequest(requestMehods.GET, "/user");
    
          const { firstName, lastName, username } = data.user;
          dispatch(loadUser({ firstName, lastName, username }));
        };
    
        getUser();
    }, []);
    
    return (
        <div className="user-logout flex row center gap-10">
            <p className="sm-text bold">{userState.username}</p>
            <img
                className='pointer'
                onClick={logout}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABw0lEQVR4nO2ZTUoDQRCFe5VjqPizT0AvkERvMAdIvdczB1Bx4VrxBFFP4A08iwmS+LONaFRwE4g0TKAJSEKsnslAP2hmV1VfTVdNUWNMVFRU1Fory7ItkrcAXklOSE4VziS3dyMim8GCF5Ejkp9KQf91xtbadqjMhw5+OoNI03RDFcBdm5kDAAOSzSRJahq2nR0RaQEYej6ujabyOzrLUNMEkIi0PIBnVeN+wWplfl5JktRI/uR+vlWN+3fUBBSACwBf7llJgGCKAEsqTdMdETkBsGsqWgO93M+biDQqB0DywfOlB1EUgIg0XODqEEUWMck6yZHn891ae1CpNkptiDLaKDUhFgG49gfgmOSZ5gFwNzeprlYTiwAAPBY0ak8B9KsO0FMH6HQ62wDOAVwpn/s5AFcTdXWAoopYRPYr20Zl1eDX4UMm/wm+5FFitNKdL3Ea7asHXzDAQD34IgGyLNsjeer2UKqGy2ijqooAS4rkZai1SuUXWy+hV4vW2rbn40nVuNvde9Pg0DnTXO4COPSXuyS7RlPux4Nbexc0Ln+or9e9VzwOHbyItEwoucy41+vW38q/mJy9bpDMR0VFRZmi9Atf1r+svzuKNgAAAABJRU5ErkJggg==" />
        </div>
    )
}

export default Logout