import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore/lite"
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../../firebase'

export const ServiceList = () => {
    const [serviceActions, setServiceActions] = useState()
    const navigate = useNavigate();

    const fetchServiceActions = async () => {
        try {
            const documents = []
            const querySnapshot = await getDocs(collection(db, "service"));
            querySnapshot.forEach((doc) => {
                documents.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            setServiceActions(documents)
        } catch(_e) {
            alert('Wystąpił błąd podczas pobierania danych')
        }

    }

    useEffect(() => {
        fetchServiceActions()
    }, [])


    const deleteServiceAction = async(actionId) => {
        try {
            await deleteDoc(doc(db, "service", actionId));
            fetchServiceActions()
        } catch(_e) {
            alert('Wystapił błąd podczas usuwania')
        }

    }

    return (
        <Container>
            <Header>Lista akcji serwisowych</Header>
            {serviceActions && <List dense={false}>
                {serviceActions && serviceActions.length === 0 && (
                    <Text>Brak akcji serwisowych</Text>
                )}
                {serviceActions.map(({ id, data: { author, company, createdAt, duration, machine, problem } }, index) => (
                    <CardContainer key={id} index={index} serviceActions={serviceActions}>
                        <CardRow>
                            <p><Bold>Autor:</Bold> {author}</p>
                            <SecondItemInRow><Bold>Company:</Bold> {company}</SecondItemInRow>
                        </CardRow>
                        <CardRow>
                            <p><Bold>Data utworzenia:</Bold> {createdAt}</p>

                        </CardRow>
                        <CardRow>
                            <p><Bold>Cas wykonania:</Bold> {duration}</p>
                        </CardRow>
                        <CardRow>
                            <p><Bold>Maszyna:</Bold> {machine}</p>
                            <SecondItemInRow><Bold>Problem:</Bold> {problem}</SecondItemInRow>
                        </CardRow>
                        <ButtonsRow>
                            <Button color="secondary" variant="contained" onClick={() => navigate(`/edit/${id}`)}>Edit</Button>
                            <SecondButton variant="contained" color="error" onClick={() => deleteServiceAction(id)}>
                                Delete
                            </SecondButton>
                        </ButtonsRow>
                    </CardContainer>
                ))}
            </List>}
            {!serviceActions && (
                <LoaderContainer>
                    <CircularProgress size={80} />
                </LoaderContainer>
            )}

        </Container>
    )
}

const Container = styled.div`
    padding: 16px;
`

const Header = styled.h1`
    font-size: 28px;
    margin-bottom: 24px;
`

const Text = styled.p``

const CardContainer = styled.div`
    background-color: #35baf6;
    border-radius: 6px;
    padding: 16px;
    margin-bottom: ${({index, serviceActions}) => index === serviceActions.length -1 ? '64px' : '16px'};
`

const CardRow = styled.div`
    display: flex;
    margin-bottom: 10px;
`

const SecondItemInRow = styled.p`
    margin-left: 24px;
`

const Bold = styled.span`
    font-weight: 600;
`

const ButtonsRow = styled.div`
    margin-top: 24px;
    width: 100%;
`

const SecondButton = styled(Button)`
    margin-left: 16px!important;
`

const LoaderContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
`
