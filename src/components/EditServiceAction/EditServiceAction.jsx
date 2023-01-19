import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { doc, setDoc, getDoc } from "firebase/firestore/lite";
import { db } from '../../firebase'
import { useState } from "react";

export const EditServiceAction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState('')
    const [machine, setMachine] = useState('')
    const [problem, setProblem] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [duration, setDuration] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
        if (!id) {
            navigate('/')
        }
        const fetchServiceAction = async () => {
            const docRef = doc(db, "service", id);
            const docSnap = await getDoc(docRef);
            const { company, author, createdAt, duration, machine, problem } = docSnap.data()
            setCompany(company)
            setAuthor(author)
            setCreatedAt(createdAt)
            setDuration(duration)
            setMachine(machine)
            setProblem(problem)
        }
        fetchServiceAction()
    }, [])



    const submitForm = async (e) => {
        e.preventDefault()
        try {
            await setDoc(doc(db, "service", id), {
                company,
                machine,
                problem,
                createdAt,
                duration: Number(duration),
                author
            });
            navigate('/')
        } catch (_e) {
            alert('Wystąpił błąd')
        }
    }

    return (
        <Container>
            <Header>Edytuj akcje serwisową</Header>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={submitForm}
            >
                <TextInput id="standard-basic" label="Firma" variant="standard" onChange={(e) => setCompany(e.target.value)} type="text" value={company} />
                <TextInput id="standard-basic" label="Typ maszyny" variant="standard" onChange={(e) => setMachine(e.target.value)} type="text" value={machine} />
                <TextInput id="standard-basic" label="Problem" variant="standard" onChange={(e) => setProblem(e.target.value)} type="text" value={problem} />
                <TextInput id="standard-basic" label="Data utworzenia (dd-mm-rrrr)" variant="standard" onChange={(e) => setCreatedAt(e.target.value)} type="text" value={createdAt} />
                <TextInput id="standard-basic" label="Czas wykonania (dni)" type="number" variant="standard" onChange={(e) => setDuration(e.target.value)} value={duration} />
                <TextInput id="standard-basic" label="Autor" variant="standard" onChange={(e) => setAuthor(e.target.value)} type="text" value={author} />
                <FormButton variant="contained" type="submit">Edytuj</FormButton>
            </Box>
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

const TextInput = styled(TextField)`
width: 94% !important;
`

const FormButton = styled(Button)`
    margin-top: 24px!important;
`