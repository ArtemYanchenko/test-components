import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Input from "./Input";
import Button from "./Button";

type PropsType = {
    callback: (title: string) => void
}

const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean | string>(false)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addGoodsOnClickHandler = () => {
        if (title.trim() !== '') {
            if(title.split('').length<15){
                props.callback(title.trim())
            }else {
                setError('More than 15 symbols !')

            }
        } else {
                       setError('Title is required!')
        }
        setTitle('')
    }

    const addGoodsOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            if (title.trim() !== '') {
                props.callback(title)
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }
    }

    return (
        <div>
            <Input title={title} callBack={onChangeInputHandler} onKeyDown={addGoodsOnKeyDownHandler}/>
            {/*<button*/}
            {/*    onClick={addGoodsOnClickHandler}*/}
            {/*    disabled={title.trim() === '' || title.length > 15}>*/}
            {/*    add*/}
            {/*</button>*/}
            <Button callBack={addGoodsOnClickHandler} title={'add'}/>
            {error && <div className={'error-message'}>{error}</div>}
            {title.length > 15 && <div>
                The length is more than 15 letters.<br/>
                Current length - <strong>{title.length}</strong>
            </div>}
        </div>
    );
};

export default AddItemForm;

