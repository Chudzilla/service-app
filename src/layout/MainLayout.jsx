import {useState} from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';

export const MainLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const navigate = useNavigate();

    const toggleDrawer = () => setDrawerOpen(prevState => !prevState)

    const navigateToList = () => {
        navigate('/')
        toggleDrawer()
    }

    const navigateToAddElement = () => {
        navigate('/add')
        toggleDrawer()
    }



    return (
        <Layout>
            <Header>
                <p>Aplikacja servisowa v.2137</p>
                <MenuIcon fontSize="large" onClick={toggleDrawer}/>
            </Header>
            <Content>
                <Outlet />
            </Content>
            {drawerOpen && <SideDrawer>
                <SideDrawerHeader>
                    <CloseIconWrapper fontSize="large" onClick={toggleDrawer}/>
                </SideDrawerHeader>
                <ButtonsWrapper>
                    <ButtonWrapper variant="text" size="large" onClick={navigateToList}>
                        <ViewListIcon size="large" />
                        <Span>Lista serwisowa</Span>
                    </ButtonWrapper>
                    <ButtonWrapper variant="text" size="large" onClick={navigateToAddElement}>
                        <AddIcon size="large" />
                        <Span>Dodaj</Span>
                    </ButtonWrapper>
                </ButtonsWrapper>
            </SideDrawer>}
        </Layout>
    )
}

const SideDrawer = styled.div`
    height: 100%;
    position: absolute;
    width: 75%;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 20;
    background-color: #0276aa;
    box-shadow: 0px 0px 24px -12px rgba(66, 68, 90, 1);
    padding: 16px;
`

const SideDrawerHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    margin-top: 36px;
`

const ButtonWrapper = styled(Button)`
    color: #fff!important;
    display: flex;
    align-items: center;
`

const Span = styled.span`
margin-left: 10px;
`

const CloseIconWrapper = styled(CloseIcon)`
    color: #fff!important;
`

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
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
`


const Content = styled.div`
    width: 100%;
    height: 92vh;
    overflow-y: auto;
`