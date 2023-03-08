import React, { useState } from 'react';

// 1
const formFields = {
    name: {
        type: 'text',
        label: "What is your name?",
        placeholder: "John Doe"
    },
    email: {
        type: 'email',
        label: "What is your email?",
        placeholder: "John@gmail.com"
    },
    password: {
        type: 'password',
        label: "What is your password?",
        placeholder: "password"
    },
    age: {
        type: 'number',
        label: "What is your age?",
        placeholder: "20"
    },
    color: {
        type: 'color',
        label: "What is your color?",
        placeholder: "color"
    }
}

// 2
const mapObjToArray = (obj) => {
    return Object.keys(obj).map(key => ({ name: key, ...obj[key] }))
}


const transformObj = (obj) => {
    return Object.keys(obj).reduce((acc, curr) => {
        acc[curr] = {
            ...obj[curr],
            value: ''
        }
        return acc;
    }, {})
}

function DynamicForm() {
    const [formState, setFormState] = useState(transformObj(formFields));

    // 3. formData using Form UI Dynamic design
    const formData = mapObjToArray(formState);


    const handleSubmit = (e) => {
        e.preventDefault();
        const values = Object.keys(formState).reduce((acc, cur) => {
            acc[cur] = formState[cur].value
            return acc;
        }, {})
        console.log(values);
    }

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: {
                ...formState[e.target.name],
                value: e.target.value,
            }
        })
    }

    // console.log(formState);

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Dynamic Form JSON TO JSX</h2>
            <form onSubmit={handleSubmit}>

                {formData.map((item, index) => (
                    <div key={index} style={{
                        margin: '0.7rem 0',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <label>{item.label}</label>
                        <input
                            style={{ height: '25px'}}
                            type={item.type}
                            name={item.name}
                            placeholder={item.placeholder}
                            value={item.value}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                <div>
                    <button type="submit">submit</button>
                </div>
            </form>
        </>
    );
}

export default DynamicForm;