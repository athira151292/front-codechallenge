import React, { FC, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, Modal, TextareaAutosize } from '@mui/base';
import { Article, addArticle } from "../api/mockApi";

interface AddArticleProps {
    open: boolean;
}

const AddArticle:FC<AddArticleProps> = ({open}) => {

    const [formData, setFormData] = useState<Article>({
        id: "",
        title: "",
        content: "",
        dateCreated: "",
        tags: [],
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const submitArticle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleDateString( "en-US", { year: 'numeric', month: 'long', day: 'numeric' });
        const newArticle = {
            ...formData,
            dateCreated: currentDate
        };
        await addArticle(newArticle);
        alert('Article added successfully');
        setFormData({
            id: "",
            title: "",
            content: "",
            dateCreated: "",
            tags: [],
        });
    }

    const handleClose = () => {

    }

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
                        name="content" 
                        minRows={3} 
                        onChange={handleInput} 
                        value={formData.content} />
                </div>
                <Button type="submit">Publish</Button>
            </form>
        </Modal>
    );
}

export default AddArticle;