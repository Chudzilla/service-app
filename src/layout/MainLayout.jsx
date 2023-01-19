import { Outlet, useNavigate } from "react-router-dom"
import styled from "styled-components"
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';

export const MainLayout = () => {
    const navigate = useNavigate();

    const navigateToList = () => {
        navigate('/')
    }

    const navigateToAddElement = () => {
        navigate('/add')
    }
    return (
        <Layout>
            <Header>
                <p>Aplikacja servisowa v.2137</p>
            </Header>
            <Outlet />
            <BottomMenu>
                <ListIcon fontSize="large" onClick={navigateToList} />
                <AddServiceIcon fontSize="large" onClick={navigateToAddElement} />
            </BottomMenu>
        </Layout>
    )
}

const Layout = styled.div`
    height: 100vh;
    width: 100%;
    position: relative;
`

const Header = styled.div`
    background-color: #0276aa;
    color: #fff;
    padding: 16px;
    font-size: 24px;

`

const BottomMenu = styled.div`
    background-color: #0276aa;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
`

const ListIcon = styled(ListAltIcon)`
    color: #fff;
`

const AddServiceIcon = styled(AddIcon)`
    color: #fff
`