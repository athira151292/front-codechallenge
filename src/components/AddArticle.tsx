import React, { FC, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, Modal, TextareaAutosize } from '@mui/base';
import { FormData } from "../types";

interface AddArticleProps {
    open: boolean;
    edit?: boolean;
    formDataEdit?: FormData;
    articleAdded: (formData: FormData) => void;
}

const AddArticle:FC<AddArticleProps> = ({open, edit, formDataEdit, articleAdded}) => {

    const [formData, setFormData] = useState<FormData>({
        title: "",
        desc: "",
        dateCreated: ""
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const submitArticle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleDateString( "en-US", { year: 'numeric', month: 'long', day: 'numeric' });
        articleAdded({
            ...formData,
            dateCreated: currentDate
        });
        setFormData({
            title: "",
            desc: "",
            dateCreated: ""
        });
    }

    const handleClose = () => {

    }

    useEffect(() => {
        if (edit && formDataEdit) {
            setFormData({...formDataEdit});
        }
    },[]);

    return (
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
        >
            <form onSubmit={submitArticle}>
                <div>
                    <label>Title</label>
                    <TextField 
                        variant="outlined" 
                        name="title" 
                        onChange={handleInput} 
                        value={formData.title} />
                </div>
                <div>
                    <label>Description</label>
                    <TextareaAutosize 
                        name="desc" 
                        minRows={3} 
                        onChange={handleInput} 
                        value={formData.desc} />
                </div>
                <Button type="submit">Publish</Button>
            </form>
        </Modal>
    );
}

export default AddArticle;