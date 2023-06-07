import './MyCheckBox.css'

const MyCheckBox = ({ text, onClick, checked }) => {
    const id = `checkbox-${Math.round(Math.random() * 9999999)}`;

    return (<>
        <input
            type='checkbox'
            defaultChecked={checked}
            onClick={(event) => onClick(event.target.checked)}
            id={id}
        ></input>
        <label htmlFor={id}>{text}</label>
    </>)
}

export default MyCheckBox;