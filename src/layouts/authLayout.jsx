import { Outlet } from 'react-router';

const authLayout = () => {
    return (
        <div>
            auth
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default authLayout;